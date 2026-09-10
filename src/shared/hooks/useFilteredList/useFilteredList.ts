import { useState, useEffect, useMemo } from 'react';
import { Filters } from '@/entities/Filter/types';

const ITEMS_PER_PAGE = 6;

interface UseFilteredListConfig<T> {
    fetchFunction: (params: { page: number; limit: number, search?: string; }) => Promise<any>;
    filterFunction: (item: T, search: string, filters: Filters) => boolean;
    initialFilters?: Filters;
}

export const useFilteredList = <T,>({
    fetchFunction,
    filterFunction,
    initialFilters = { department: [] },
}: UseFilteredListConfig<T>) => {
    const [filters, setFilters] = useState<Filters>(initialFilters);
    const [search, setSearch] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [allItems, setAllItems] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [hasMoreItems, setHasMoreItems] = useState<boolean>(false);

    const hasActiveFilters = useMemo(() => {
        return search.length > 0 || filters.department.length > 0;
    }, [search, filters.department]);

    const requestParams = useMemo(() => {
        if (hasActiveFilters) {
            return { page: 1, limit: 500 };
        }
        return { page: currentPage, limit: ITEMS_PER_PAGE };
    }, [hasActiveFilters, currentPage]);

    const filteredItems = useMemo(() => {
        if (!hasActiveFilters) return allItems;
        if (allItems.length > 0) {
            return allItems.filter((item) => filterFunction(item, search, filters));
        }
        return [];
    }, [allItems, hasActiveFilters, search, filters, filterFunction]);

    const fetchItems = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetchFunction(requestParams);

            if (res.status === 'success' && res.data) {
                setAllItems((prev) => {
                    if (requestParams.page === 1) return res.data.list;
                    return [...prev, ...res.data.list];
                });
                setHasMoreItems(res.data.meta?.hasMore || false);
            } else {
                setError(res.message || 'Ошибка при загрузке данных');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка при загрузке данных');
        } finally {
            setIsLoading(false);
        }
    };

    const updateFilters = (key: keyof Filters, value: string[]) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    };

    const removeFilter = (key: string, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [key]: prev[key].filter((v) => v !== value),
        }));
        setCurrentPage(1);
    };

    const removeAllFilters = () => {
        setFilters({ department: [] });
        setSearch('');
        setCurrentPage(1);
    };

    const loadMore = () => {
        if (!hasActiveFilters) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [hasActiveFilters, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    return {
        filters,
        search,
        currentPage,
        allItems,
        filteredItems,
        isLoading,
        error,
        hasMoreItems,
        hasActiveFilters,
        setSearch,
        updateFilters,
        removeFilter,
        removeAllFilters,
        loadMore,
    };
};
