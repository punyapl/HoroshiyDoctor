import { useState, useEffect, useCallback } from 'react';

interface SuccessResponse<T> {
    status: string;
    data: {
        list: T[];
        meta: {
            hasMore: boolean;
            limit: number;
            page: number;
            total: number;
        };
    };
}

interface ErrorResponse {
    status: 'error';
    error: {
        type: string;
        message: string;
    };
}

interface UseServerFilteredListProps<T> {
    fetchFunction: (params: any) => Promise<SuccessResponse<T> | ErrorResponse>;
    limit?: number;
}

export function useServerFilteredList<T>({
    fetchFunction,
    limit = 20,
}: UseServerFilteredListProps<T>) {
    const [items, setItems] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMoreItems, setHasMoreItems] = useState(true);
    const [totalItems, setTotalItems] = useState(0);

    // Параметры фильтрации
    const [searchInput, setSearchInput] = useState(''); // Значение в поле ввода
    const [search, setSearch] = useState(''); // Фактический поиск для запроса
    const [selectedGroupIds, setSelectedGroupIds] = useState<number[]>([]);
    const [sort, setSort] = useState<string>('asc');

    const fetchItems = useCallback(
        async (page: number, reset: boolean = false) => {
            if (isLoading) return;

            setIsLoading(true);
            setError(null);

            try {
                const params: any = {
                    page,
                    limit,
                };

                if (search.trim()) params.search = search.trim();

                // ИСПРАВЛЕНО - передаём все выбранные группы через запятую
                if (selectedGroupIds.length > 0) {
                    params.group = selectedGroupIds.join(',');
                }

                if (sort) params.sort = sort;

                const response = await fetchFunction(params);

                if (response.status === 'success' && 'data' in response) {
                    const newItems = response.data.list;

                    setItems(prev => reset ? newItems : [...prev, ...newItems]);
                    setHasMoreItems(response.data.meta.hasMore);
                    setTotalItems(response.data.meta.total);
                    setCurrentPage(page);
                } else if (response.status === 'error' && 'error' in response) {
                    setError(response.error.message);
                }
            } catch (err) {
                console.error('Ошибка загрузки данных:', err);
                setError('Не удалось загрузить данные');
            } finally {
                setIsLoading(false);
            }
        },
        [fetchFunction, limit, search, selectedGroupIds, sort, isLoading]
    );

    const applySearch = useCallback(() => {
        setSearch(searchInput);
    }, [searchInput]);

    // Перезагрузка при изменении фильтров
    useEffect(() => {
        setItems([]);
        setCurrentPage(1);
        setHasMoreItems(true);
        fetchItems(1, true);
    }, [search, selectedGroupIds, sort]);

    const loadMore = useCallback(() => {
        if (hasMoreItems && !isLoading) {
            fetchItems(currentPage + 1, false);
        }
    }, [currentPage, hasMoreItems, isLoading, fetchItems]);

    const resetFilters = useCallback(() => {
        setSearchInput('');
        setSearch('');
        setSelectedGroupIds([]);
        setSort('asc');
    }, []);

    const hasActiveFilters = search !== '' || selectedGroupIds.length > 0;

    return {
        items,
        isLoading,
        error,
        hasMoreItems,
        hasActiveFilters,
        currentPage,
        totalItems,
        searchInput, // Возвращаем значение для поля ввода
        search, // Возвращаем активный поиск
        selectedGroupIds,
        sort,
        setSearchInput, // Для изменения поля ввода
        applySearch, // Для применения поиска
        setSelectedGroupIds,
        setSort,
        resetFilters,
        loadMore,
    };
}