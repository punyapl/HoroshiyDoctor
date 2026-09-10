import { useState, useEffect, } from 'react'
import AdjustmentsHorizontal from '@/shared/assets/icons/AdjustmentsHorizontal.svg'
import { useDevice, } from '@/shared/hooks/useDevice'
import { useModal, } from '@/shared/hooks/useModal'
import { Button, } from '@/shared/ui/Button'
import { Dropdown, } from '@/shared/ui/Dropdown'
import { FilterList, } from '@/shared/ui/FilterList'
import { FilterModal, } from '@/shared/ui/FilterModal'
import { Section, } from '@/shared/ui/Section'
import { TextInput, } from '@/shared/ui/TextInput'
import { ServiceCard, } from '@/widgets/ServiceCard'
import { SignUpModal, } from '@/widgets/SignUpModal'
import { Service } from '@/entities/Service/types'
import { getCachedServices, } from '@/shared/api'
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll'
import { useServerFilteredList } from '@/shared/hooks/useServerFilteredList'
import { useServiceGroups } from '@/shared/hooks/useServiceGroups'
import { ServiceGroupAccordion } from '@/widgets/ServiceGroupAccordion'

export const ServiceList = () => {
    const { isMobile } = useDevice();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formModal = useModal<Service>();

    // Хук для режима группировки
    const {
        groups,
        openGroupIds,
        openSubgroupIds,
        groupServices,
        isLoadingGroups,
        error: groupsError,
        toggleGroup,
        toggleSubgroup,
        loadMoreGroupServices,
        loadMoreSubgroupServices,
        closeAllGroups,
    } = useServiceGroups();

    // Хук для режима плоского списка
    const {
        items: filteredServices,
        isLoading,
        error,
        hasMoreItems,
        currentPage,
        searchInput,
        search,
        selectedGroupIds,
        setSearchInput,
        applySearch,
        setSelectedGroupIds,
        resetFilters,
        loadMore,
    } = useServerFilteredList<Service>({
        fetchFunction: getCachedServices,
        limit: 20,
    });

    const lastServiceRef = useInfiniteScroll(
        loadMore,
        hasMoreItems,
        isLoading
    );

    // Определяем режим отображения
    const isGroupedMode = search === '' && selectedGroupIds.length === 0;

    // Закрываем все группы при переключении в плоский режим
    useEffect(() => {
        if (!isGroupedMode) {
            closeAllGroups();
        }
    }, [isGroupedMode, closeAllGroups]);

    const handleClose = () => setIsModalOpen(false);

    const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            applySearch();
        }
    };

    const handleFilterChange = (filterKey: string, selectedNames: string[]) => {
        if (filterKey === 'department') {
            const ids = groups
                .filter(g => selectedNames.includes(g.name))
                .map(g => g.id);
            setSelectedGroupIds(ids);
        }
    };

    const removeFilter = (filterKey: string, value: string) => {
        if (filterKey === 'department') {
            const selectedGroupNames = groups
                .filter(g => selectedGroupIds.includes(g.id))
                .map(g => g.name);
            const newNames = selectedGroupNames.filter(name => name !== value);
            handleFilterChange('department', newNames);
        }
    };

    const selectedGroupNames = groups
        .filter(g => selectedGroupIds.includes(g.id))
        .map(g => g.name);

    const filterOptions = {
        department: {
            label: 'Направление',
            options: groups.map(g => g.name),
        },
    };

    const currentFilters = {
        department: selectedGroupNames,
    };

    const hasActiveFilters = search !== '' || selectedGroupIds.length > 0;

    useEffect(() => {
        if (isMobile) {
            document.body.style.overflow = isModalOpen ? 'hidden' : '';
            if (isModalOpen) window.scrollTo(0, 0);
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isModalOpen, isMobile]);

    return (
        <Section
            SectionClassName="py-12 pt-0 max-xl:p-[34px] max-xl:pt-0 max-md:py-6 max-md:pt-0 max-md:px-2.5"
            ContainerClassName="flex flex-col gap-[25px] max-xl:gap-5 max-md:gap-3.5"
            role="region"
            aria-label="Список услуг"
        >
            {/* Панель поиска и фильтров */}
            <div className="flex flex-col gap-[25px]">
                <div className="relative flex gap-5 max-xl:gap-2.5 w-full">
                    <TextInput
                        label="Поиск по услугам"
                        placeholder="Найти"
                        className="w-full max-md:min-w-[220px]"
                        value={searchInput}
                        onKeyDown={handleSearchKeyPress}
                        onChange={(e) => setSearchInput(e.target.value)}
                        aria-label="Поиск услуг"
                        maxLength={100}
                        autoComplete="off"
                        searchButton
                        onSearchButtonClick={applySearch}
                    />
                    <div className="flex max-xl:hidden gap-5 w-full">
                        <Dropdown
                            value={selectedGroupNames}
                            onChange={(values) => handleFilterChange('department', values)}
                            options={filterOptions.department.options}
                            multiple
                            label={filterOptions.department.label}
                            aria-label="Фильтр по отделениям"
                        />
                    </div>
                    <Button
                        theme="light-blue"
                        icon={AdjustmentsHorizontal}
                        className="xl:hidden self-end shrink-0 w-max"
                        onClick={() => setIsModalOpen(!isModalOpen)}
                        aria-label="Открыть фильтры"
                        aria-expanded={isModalOpen}
                    />
                    {!isMobile && isModalOpen && (
                        <FilterModal
                            filterOptions={filterOptions}
                            currentFilters={currentFilters}
                            onFilterChange={handleFilterChange}
                            onClose={handleClose}
                            onReset={resetFilters}
                        />
                    )}
                </div>
                {hasActiveFilters && (
                    <FilterList
                        filters={currentFilters}
                        onRemove={removeFilter}
                        onRemoveAll={resetFilters}
                        aria-label="Активные фильтры"
                    />
                )}
            </div>

            {/* РЕЖИМ ГРУППИРОВКИ */}
            {isGroupedMode && (
                <>
                    {isLoadingGroups && (
                        <div className="text-center py-10" role="status" aria-live="polite">
                            <p className="text-gray-500 text-lg">Загрузка направлений...</p>
                        </div>
                    )}

                    {groupsError && (
                        <div className="text-center py-10" role="alert" aria-live="assertive">
                            <p className="text-gray-500 text-lg">{groupsError}</p>
                        </div>
                    )}

                    <div className="flex flex-col gap-5">
                        {groups.map((group) => (
                            <ServiceGroupAccordion
                                key={group.id}
                                group={group}
                                isOpen={openGroupIds.has(group.id)}
                                openSubgroupIds={openSubgroupIds}
                                services={groupServices[group.id]}
                                onToggle={() => toggleGroup(group.id)}
                                onToggleSubgroup={(subgroupId) => toggleSubgroup(group.id, subgroupId)}
                                onLoadMore={() => loadMoreGroupServices(group.id)}
                                onLoadMoreSubgroup={(subgroupId) => loadMoreSubgroupServices(group.id, subgroupId)}
                                onServiceClick={(service) => formModal.open(service)}
                            />
                        ))}
                    </div>
                </>
            )}

            {/* РЕЖИМ ПЛОСКОГО СПИСКА */}
            {!isGroupedMode && (
                <>
                    {isLoading && currentPage === 1 && (
                        <div className="text-center py-10" role="status" aria-live="polite">
                            <p className="text-gray-500 text-lg">Загрузка...</p>
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-10" role="alert" aria-live="assertive">
                            <p className="text-gray-500 text-lg">Ошибка при загрузке. Попробуйте позже</p>
                        </div>
                    )}

                    <div
                        className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-[25px] items-start"
                        role="list"
                        aria-label="Список услуг"
                    >
                        {filteredServices.map((service, index) => {
                            const isLastItem = index === filteredServices.length - 1;

                            return (
                                <div
                                    key={service.id || index}
                                    ref={isLastItem ? lastServiceRef : null}
                                    className="flex justify-center items-center"
                                    role="listitem"
                                >
                                    <ServiceCard
                                        data={service}
                                        variant="moreInfo"
                                        onButtonClick={() => formModal.open(service)}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {filteredServices.length === 0 && !isLoading && !error && (
                        <div className="text-center py-10" role="status" aria-live="polite">
                            <p className="text-gray-500 text-lg">По вашему запросу услуг не найдено</p>
                        </div>
                    )}
                </>
            )}

            {isMobile && isModalOpen && (
                <FilterModal
                    filterOptions={filterOptions}
                    currentFilters={currentFilters}
                    onFilterChange={handleFilterChange}
                    onClose={handleClose}
                    onReset={resetFilters}
                />
            )}

            <SignUpModal
                isOpen={formModal.show}
                onClose={formModal.close}
                appointmentData={formModal.item}
            />
        </Section>
    );
};
