import { useState, useEffect, useCallback } from 'react';
import { ServiceGroup, GroupServices, Service } from '@/entities/Service/types';
import { getGroupsStructure, getCachedServices } from '@/shared/api';

export function useServiceGroups() {
    const [groups, setGroups] = useState<ServiceGroup[]>([]);
    const [openGroupIds, setOpenGroupIds] = useState<Set<number>>(new Set());
    const [openSubgroupIds, setOpenSubgroupIds] = useState<Set<string>>(new Set());
    const [groupServices, setGroupServices] = useState<GroupServices>({});
    const [isLoadingGroups, setIsLoadingGroups] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Загрузка списка групп (теперь используем новый endpoint)
    useEffect(() => {
        loadGroups();
    }, []);

    const loadGroups = async () => {
        setIsLoadingGroups(true);
        setError(null);

        try {
            const response = await getGroupsStructure();
            if (response.status === 'success' && response.data) {
                setGroups(response.data.groups);
            }
        } catch (err) {
            console.error('Ошибка загрузки групп:', err);
            setError('Не удалось загрузить направления');
        } finally {
            setIsLoadingGroups(false);
        }
    };

    // Переключение состояния группы
    const toggleGroup = useCallback((groupId: number) => {
        setOpenGroupIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(groupId)) {
                newSet.delete(groupId);
            } else {
                newSet.add(groupId);

                const group = groups.find(g => g.id === groupId);

                // Если у группы НЕТ подгрупп - загружаем услуги сразу
                if (group && !group.hasSubgroups) {
                    if (!groupServices[groupId]) {
                        setGroupServices(prev => ({
                            ...prev,
                            [groupId]: {
                                items: [],
                                currentPage: 0,
                                hasMore: true,
                                isLoading: true,
                            }
                        }));
                        loadGroupServices(groupId, 1);
                    }
                }
                // Если есть подгруппы - просто открываем группу, не загружая данные
            }
            return newSet;
        });
    }, [groups, groupServices]);

    // Переключение состояния подгруппы
    const toggleSubgroup = useCallback((groupId: number, subgroupId: string) => {
        const key = `${groupId}-${subgroupId}`;
        const isCurrentlyOpen = openSubgroupIds.has(key);

        // Переключаем состояние
        setOpenSubgroupIds(prev => {
            const newSet = new Set(prev);
            if (isCurrentlyOpen) {
                newSet.delete(key);
            } else {
                newSet.add(key);
            }
            return newSet;
        });

        // Загружаем данные ТОЛЬКО если открываем И данных еще нет
        if (!isCurrentlyOpen && !groupServices[groupId]?.subgroups?.[subgroupId]) {
            setGroupServices(prev => ({
                ...prev,
                [groupId]: {
                    ...prev[groupId],
                    subgroups: {
                        ...prev[groupId]?.subgroups,
                        [subgroupId]: {
                            items: [],
                            currentPage: 0,
                            hasMore: true,
                            isLoading: true,
                        }
                    }
                }
            }));

            loadSubgroupServices(groupId, subgroupId, 1);
        }
    }, [groupServices, openSubgroupIds]);



    // Загрузка услуг для группы БЕЗ подгрупп
    const loadGroupServices = async (groupId: number, page: number) => {
        setGroupServices(prev => ({
            ...prev,
            [groupId]: {
                ...prev[groupId],
                isLoading: true,
            }
        }));

        try {
            const response = await getCachedServices({
                group: groupId,
                page,
                limit: 6,
            });

            if (response.status === 'success' && response.data) {
                setGroupServices(prev => ({
                    ...prev,
                    [groupId]: {
                        items: page === 1
                            ? response.data.list
                            : [...(prev[groupId]?.items || []), ...response.data.list],
                        currentPage: page,
                        hasMore: response.data.meta.hasMore,
                        isLoading: false,
                    }
                }));
            }
        } catch (err) {
            console.error(`Ошибка загрузки услуг группы ${groupId}:`, err);
            setGroupServices(prev => ({
                ...prev,
                [groupId]: {
                    ...prev[groupId],
                    isLoading: false,
                }
            }));
        }
    };

    // Загрузка услуг для подгруппы
    const loadSubgroupServices = async (groupId: number, subgroupId: string, page: number) => {
        setGroupServices(prev => {
            const currentSubgroup = prev[groupId]?.subgroups?.[subgroupId];

            return {
                ...prev,
                [groupId]: {
                    ...prev[groupId],
                    subgroups: {
                        ...prev[groupId]?.subgroups,
                        [subgroupId]: {
                            items: currentSubgroup?.items || [],
                            currentPage: currentSubgroup?.currentPage || 0,
                            hasMore: currentSubgroup?.hasMore ?? true,
                            isLoading: true,
                        }
                    }
                }
            };
        });

        try {
            const response = await getCachedServices({
                group: groupId,
                subgroup: subgroupId,
                page,
                limit: 6,
            });  

            if (response.status === 'success' && response.data) {
                setGroupServices(prev => {
                    const currentSubgroup = prev[groupId]?.subgroups?.[subgroupId];

                    return {
                        ...prev,
                        [groupId]: {
                            ...prev[groupId],
                            subgroups: {
                                ...prev[groupId]?.subgroups,
                                [subgroupId]: {
                                    items: page === 1
                                        ? response.data.list
                                        : [...(currentSubgroup?.items || []), ...response.data.list],
                                    currentPage: page,
                                    hasMore: response.data.meta.hasMore,
                                    isLoading: false,
                                }
                            }
                        }
                    };
                });
            }
        } catch (err) {
            console.error(`Ошибка загрузки услуг подгруппы ${groupId}/${subgroupId}:`, err);
            setGroupServices(prev => {
                const currentSubgroup = prev[groupId]?.subgroups?.[subgroupId];

                return {
                    ...prev,
                    [groupId]: {
                        ...prev[groupId],
                        subgroups: {
                            ...prev[groupId]?.subgroups,
                            [subgroupId]: {
                                items: currentSubgroup?.items || [],
                                currentPage: currentSubgroup?.currentPage || 0,
                                hasMore: currentSubgroup?.hasMore ?? false,
                                isLoading: false,
                            }
                        }
                    }
                };
            });
        }
    };

    // Загрузка следующей страницы для группы
    const loadMoreGroupServices = useCallback((groupId: number) => {
        const currentGroup = groupServices[groupId];
        if (currentGroup?.items && currentGroup.hasMore && !currentGroup.isLoading) {
            loadGroupServices(groupId, (currentGroup.currentPage || 0) + 1);
        }
    }, [groupServices]);

    // Загрузка следующей страницы для подгруппы
    const loadMoreSubgroupServices = useCallback((groupId: number, subgroupId: string) => {
        const currentSubgroup = groupServices[groupId]?.subgroups?.[subgroupId];
        if (currentSubgroup && currentSubgroup.hasMore && !currentSubgroup.isLoading) {
            loadSubgroupServices(groupId, subgroupId, currentSubgroup.currentPage + 1);
        }
    }, [groupServices]);

    // Сброс всех открытых групп и подгрупп
    const closeAllGroups = useCallback(() => {
        setOpenGroupIds(new Set());
        setOpenSubgroupIds(new Set());
    }, []);

    return {
        groups,
        openGroupIds,
        openSubgroupIds,
        groupServices,
        isLoadingGroups,
        error,
        toggleGroup,
        toggleSubgroup,
        loadMoreGroupServices,
        loadMoreSubgroupServices,
        closeAllGroups,
    };
}
