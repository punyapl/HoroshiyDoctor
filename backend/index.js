import 'dotenv/config';
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs/promises';
import { mkdir } from 'fs/promises';
import cron from 'node-cron';

const DATA_FILE = './cache/service-cach.json';

await mkdir('./cache', { recursive: true });

//генератор slug
const generateSlug = (text) => {
    const translitMap = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
        'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
        'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
        'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
    };

    return text
        .toLowerCase()
        .split('')
        .map(char => translitMap[char] || char)
        .join('')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

//парсинг group.name. Возвращает структуру с группой и подгруппой
const parseGroupName = (groupName) => {
    if (!groupName) return { group: null, subgroup: null };

    const parts = groupName.split('/').map(part => part.trim());

    if (parts.length === 1) {
        // Нет подгруппы
        return {
            group: parts[0],
            subgroup: null
        };
    } else {
        // Есть подгруппа
        return {
            group: parts[0],
            subgroup: parts.slice(1).join('/') // на случай если "/" встречается больше одного раза
        };
    }
}

//Трансформирует services, разделяя группы и подгруппы
const transformServicesWithSubgroups = (services) => {
    return services.map(service => {
        if (!service.group?.name) return service;

        const parsed = parseGroupName(service.group.name);

        if (!parsed.subgroup) {
            // Обычная группа - оставляем как есть
            return service;
        } else {
            // Группа с подгруппой - расширяем структуру
            return {
                ...service,
                group: {
                    ...service.group,
                    name: parsed.group, // только имя группы без подгруппы
                    subgroup: {
                        id: generateSlug(parsed.subgroup),
                        name: parsed.subgroup
                    }
                }
            };
        }
    });
}

//Строит иерархию групп и подгрупп
function buildGroupsHierarchy(services) {
    const groupsMap = new Map();

    services.forEach(service => {
        if (!service.group) return;

        const groupId = service.group.id;
        const groupName = service.group.name;

        // Ключ для группировки - имя группы (для объединения подгрупп)
        const groupKey = groupName;

        if (!groupsMap.has(groupKey)) {
            groupsMap.set(groupKey, {
                ids: new Set([groupId]), // Собираем все ID этой группы
                name: groupName,
                hasSubgroups: false,
                subgroups: new Map(),
                servicesCount: 0
            });
        }

        const group = groupsMap.get(groupKey);
        group.ids.add(groupId); // Добавляем ID
        group.servicesCount++;

        // Если есть подгруппа
        if (service.group.subgroup) {
            group.hasSubgroups = true;
            const subgroupId = service.group.subgroup.id;
            const subgroupName = service.group.subgroup.name;

            if (!group.subgroups.has(subgroupId)) {
                group.subgroups.set(subgroupId, {
                    id: subgroupId,
                    name: subgroupName,
                    servicesCount: 0
                });
            }

            group.subgroups.get(subgroupId).servicesCount++;
        }
    });

    // Преобразуем Map в массив
    return Array.from(groupsMap.values()).map(group => {
        // Используем первый ID из набора как основной ID группы
        const primaryId = Array.from(group.ids)[0];

        return {
            id: primaryId,
            ids: Array.from(group.ids), // Массив всех ID этой группы
            name: group.name,
            hasSubgroups: group.hasSubgroups,
            servicesCount: group.servicesCount,
            subgroups: group.hasSubgroups
                ? Array.from(group.subgroups.values())
                : undefined
        };
    });
}

const app = express();
const PORT = process.env.PORT || 3000;
const API_BASE_URL = process.env.API_BASE_URL;
const API_TOKEN = process.env.API_TOKEN || '';

if (!API_BASE_URL) {
    console.error('ERROR: API_BASE_URL не задан в .env');
    process.exit(1);
}

// --- Middlewares ---
app.use(morgan('dev')); // logs
const originWhitelist = process.env.ORIGIN_WHITELIST
    ? process.env.ORIGIN_WHITELIST.split(',').map(s => s.trim())
    : null;

if (originWhitelist && originWhitelist.length) {
    app.use(cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            if (originWhitelist.includes(origin)) return callback(null, true);
            return callback(new Error('Not allowed by CORS'));
        }
    }));
} else {
    app.use(cors());
}

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// --- White list маршрутов ---
const WHITELIST_PATHS = [
    '/eventTypeList',
    '/getCachedServices',
    '/getGroupsStructure',
    '/eventTypeGroupList',
    '/searchPatient',
    '/specialists',
    '/schedule',
    '/create'
];

// helper: проверяем разрешён ли путь
function isPathAllowed(path) {
    if (!WHITELIST_PATHS || WHITELIST_PATHS.length === 0) return true;
    const normalized = path.replace(/\/+$/, '');
    for (const rule of WHITELIST_PATHS) {
        if (rule.endsWith('/*')) {
            const prefix = rule.slice(0, -2);
            if (normalized.startsWith(prefix)) return true;
        } else {
            if (normalized === rule) return true;
        }
    }
    return false;
}

// Фукнция на кэширование данных обращений
async function fetchAndCacheData() {
    const allData = [];
    let currentPage = 1;
    let hasMorePages = true;

    try {
        console.log('Fetching event data from API...');
        while (hasMorePages) {
            console.log(`Fetching page ${currentPage}...`);

            const response = await axios.get(`${API_BASE_URL}/eventTypeList`, {
                headers: { 'authorization': `Bearer ${API_TOKEN}` },
                params: {
                    limit: 500,
                    page: currentPage
                },
            });

            const { list, meta } = response.data.data;

            if (list && list.length > 0) {
                allData.push(...list);
                console.log(`Page ${currentPage}/${Math.ceil(meta.total / meta.limit)}: received ${list.length} items. Total: ${allData.length}/${meta.total}`);
            }

            hasMorePages = meta.hasMore;
            currentPage++;

            if (hasMorePages) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }

        const transformedData = transformServicesWithSubgroups(allData);
        const dataToCache = {
            eventTypes: transformedData,
            totalRecords: transformedData.length,
            lastUpdated: new Date().toISOString()
        };

        await fs.writeFile(DATA_FILE, JSON.stringify(dataToCache, null, 2));
        console.log(`✓ Successfully cached ${allData.length} records`);

    } catch (error) {
        console.error('Failed to fetch data:', error.message);
        throw error;
    }
}

app.get('/getGroupsStructure', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        const cached = JSON.parse(data);

        const hierarchy = buildGroupsHierarchy(cached.eventTypes);

        return res.json({
            status: 'success',
            data: {
                groups: hierarchy,
                lastUpdated: cached.lastUpdated
            }
        });
    } catch (error) {
        console.error('Error reading cached data:', error.message);
        return res.status(503).json({
            status: 'error',
            error: {
                type: 'cache_unavailable',
                message: 'Cached data is not available'
            }
        });
    }
});

app.get('/getCachedServices', async (req, res) => {
    try {
        // Читаем данные из кэша
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        const cached = JSON.parse(data);

        let services = [...cached.eventTypes]; // создаем копию для фильтрации

        // 1. Фильтр по ID (список через запятую)
        if (req.query.id) {
            const ids = req.query.id.split(',').map(id => id.trim());
            services = services.filter(s => ids.includes(String(s.id)));
        }

        // 2. // Фильтр по group.id (только если нет subgroup)
        if (req.query.group && !req.query.subgroup) {
            const groupParam = Array.isArray(req.query.group)
                ? req.query.group
                : [req.query.group];

            const groupIds = groupParam
                .flatMap(g => String(g).split(','))
                .map(id => parseInt(id.trim()))
                .filter(id => !isNaN(id));

            if (groupIds.length > 0) {
                services = services.filter(s => groupIds.includes(s.group?.id));
            }
        }

        // 2.5 Фильтр по subgroup (если указан group и subgroup)
        if (req.query.subgroup) {
            const subgroupId = req.query.subgroup.trim();
            services = services.filter(s => s.group?.subgroup?.id === subgroupId);
        }

        // 3. Поиск по name, category и group.name
        if (req.query.search) {
            const searchLower = req.query.search.toLowerCase();
            services = services.filter(s => {
                const matchName = s.name?.toLowerCase().includes(searchLower);
                const matchCategory = s.category?.toLowerCase().includes(searchLower);
                const matchGroupName = s.group?.name?.toLowerCase().includes(searchLower);
                return matchName || matchCategory || matchGroupName;
            });
        }

        // 4. Обратный поиск (exclude)
        if (req.query.exclude) {
            const excludeLower = req.query.exclude.toLowerCase();
            services = services.filter(s => {
                const matchName = s.name?.toLowerCase().includes(excludeLower);
                const matchCategory = s.category?.toLowerCase().includes(excludeLower);
                const matchGroupName = s.group?.name?.toLowerCase().includes(excludeLower);
                // Возвращаем только те, которые НЕ совпадают
                return !matchName && !matchCategory && !matchGroupName;
            });
        }

        // 5. Сортировка по позиции
        if (req.query.sort) {
            const sortOrder = req.query.sort.toLowerCase();
            if (sortOrder === 'asc') {
                services.sort((a, b) => (a.position || 0) - (b.position || 0));
            } else if (sortOrder === 'desc') {
                services.sort((a, b) => (b.position || 0) - (a.position || 0));
            }
        }

        // 6. Пагинация
        const total = services.length;
        const limit = parseInt(req.query.limit) || total;
        const page = parseInt(req.query.page) || 1;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedServices = services.slice(startIndex, endIndex);
        const hasMore = endIndex < total;

        return res.json({
            status: 'success',
            data: {
                list: paginatedServices,
                meta: {
                    hasMore: hasMore,
                    limit: limit,
                    page: page,
                    total: total
                }
            }
        });

    } catch (error) {
        console.error('Error reading cached data:', error.message);
        return res.status(503).json({
            status: 'error',
            error: {
                type: 'cache_unavailable',
                message: 'Cached data is not available'
            }
        });
    }
});

// --- прокси-роут ---
app.use(async (req, res, next) => {
    try {
        if (!isPathAllowed(req.path)) {
            return res.status(403).json({ status: 'error', message: 'Path blocked by proxy whitelist' });
        }

        const targetUrl = `${API_BASE_URL}${req.path}`;

        const outgoingHeaders = { ...req.headers };
        delete outgoingHeaders.host;
        delete outgoingHeaders['content-length'];
        delete outgoingHeaders.cookie;
        delete outgoingHeaders.origin;

        if (API_TOKEN) outgoingHeaders['authorization'] = `Bearer ${API_TOKEN}`;

        const axiosConfig = {
            method: req.method,
            url: targetUrl,
            params: req.query,
            data: req.body,
            headers: outgoingHeaders,
            validateStatus: () => true,
        };

        const upstreamRes = await axios(axiosConfig);

        const responseHeaders = { ...upstreamRes.headers };
        delete responseHeaders['transfer-encoding'];
        delete responseHeaders['content-length'];

        res.status(upstreamRes.status);
        res.set(responseHeaders);
        return res.send(upstreamRes.data);
    } catch (err) {
        console.error('Proxy error:', err?.message ?? err);
        return res.status(502).json({
            status: 'error',
            message: 'Proxy internal error',
            detail: err?.message ?? String(err),
        });
    }
});

// Начальная загрузка при старте
fetchAndCacheData()
    .then(() => console.log('✓ Initial cache loaded'))
    .catch(err => console.error('✗ Initial data fetch failed:', err.message));

// Планируем обновление
cron.schedule('0 * * * *', async () => {
    console.log('🔄 Running scheduled cache update...');
    try {
        await fetchAndCacheData();
        console.log('✓ Scheduled cache update completed');
    } catch (err) {
        console.error('✗ Scheduled cache update failed:', err.message);
    }
}, {
    timezone: "Asia/Novosibirsk"
});

console.log('📅 Cache update scheduled: every hour (Novosibirsk time)');

// --- Start ---
app.listen(PORT, () => {
    console.log(`Proxy (ESM) listening on http://localhost:${PORT}`);
});
