import { useEffect, useState, useMemo, } from 'react'
import { FilterOptions, Filters, } from '@/entities/Filter/types'
import AdjustmentsHorizontal from '@/shared/assets/icons/AdjustmentsHorizontal.svg'
import { useDevice, } from '@/shared/hooks/useDevice'
import { Button, } from '@/shared/ui/Button'
import { Dropdown, } from '@/shared/ui/Dropdown'
import { FilterList, } from '@/shared/ui/FilterList'
import { FilterModal, } from '@/shared/ui/FilterModal'
import { Section, } from '@/shared/ui/Section'
import { TextInput, } from '@/shared/ui/TextInput'
import { DoctorCard, } from '@/widgets/DoctorCard'
import { getDoctors } from '@/shared/api'
import { Doctor } from '@/entities/Doctor/types'
import { doctorsList } from '@/shared/mocks/doctors'
import { useModal } from '@/shared/hooks/useModal'
import { SignUpModal } from '@/widgets/SignUpModal'
import { useFilteredList } from '@/shared/hooks/useFilteredList'
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll'

export const DoctorList = () => {
    const { isMobile } = useDevice();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        department: {
            label: 'Специальность',
            options: [],
        },
    });
    const formModal = useModal<Doctor>();

    // Функция фильтрации для врачей
    const doctorFilterFunction = (doctor: Doctor, search: string, filters: Filters) => {
        const matchesSearch = search
            ? doctor.name.toLowerCase().includes(search.toLowerCase()) ||
            doctor.speciality.join(', ').toLowerCase().includes(search.toLowerCase())
            : true;

        const matchesDepartment =
            filters.department.length > 0
                ? filters.department.some((dept) => doctor.speciality.includes(dept))
                : true;

        return matchesSearch && matchesDepartment;
    };

    // Используем универсальный хук
    const {
        filters,
        search,
        filteredItems: rawFilteredDoctors,
        isLoading,
        error,
        hasMoreItems,
        hasActiveFilters,
        currentPage,
        setSearch,
        updateFilters,
        removeFilter,
        removeAllFilters,
        loadMore,
    } = useFilteredList<Doctor>({
        fetchFunction: getDoctors,
        filterFunction: doctorFilterFunction,
    });

    const doctorsToHide = ["лабораторные исследования", "врач функциональной диагностики"]

    const filteredDoctors = useMemo(() => {
        return rawFilteredDoctors.filter(doctor =>
            doctorsToHide.includes(doctor.name.trim().toLowerCase()) === false
        );
    }, [rawFilteredDoctors]);

    // Infinite scroll
    const lastDoctorRef = useInfiniteScroll(
        loadMore,
        hasMoreItems && !hasActiveFilters,
        isLoading
    );

    const handleClose = () => setIsModalOpen(false);

    // Загружаем список специальностей для фильтра
    useEffect(() => {
        getDoctors({ page: 1, limit: 500 })
            .then((res) => {
                if (res.status === 'success' && res.data) {
                    const uniqueSpecialities = Array.from(
                        new Set(res.data.list.map((d) => d.speciality?.[0]).filter(Boolean))
                    );
                    setFilterOptions({
                        department: {
                            label: 'Специальность',
                            options: uniqueSpecialities,
                        },
                    });
                }
            })
            .catch((err) => {
                console.error('Ошибка загрузки специальностей:', err);
            });
    }, []);

    // Управление скроллом для мобильной версии
    useEffect(() => {
        if (isMobile) {
            document.body.style.overflow = isModalOpen ? 'hidden' : '';
            if (isModalOpen) window.scrollTo(0, 0);
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isModalOpen, isMobile]);

    useEffect(() => {
        getDoctors({ page: 1, limit: 500 })
            .then((res) => {
                if (res.status === 'success') {
                    const excludeSpecialities = ['Лаборант', 'Врач Функциональной Диагностики']

                    const uniqueSpecialities = Array.from(new Set(
                        res.data.list.map(d => d.speciality?.[0]).filter(Boolean)
                    )).filter(spec => !excludeSpecialities.includes(spec));
                    setFilterOptions({
                        department: {
                            label: 'Специальность',
                            options: uniqueSpecialities,
                        }
                    });
                }
            })
            .catch((err) => {
                console.error(err)
            })
    }, []);

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
            aria-label="Список врачей"
        >
            <div className="flex flex-col gap-[25px]">
                <div className="relative flex gap-5 max-xl:gap-2.5">
                    <TextInput
                        label="Поиск по ФИО врача"
                        placeholder="Найти"
                        className="w-full"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onRemoveButtonClick={() => setSearch('')}
                        aria-label="Поиск врачей по ФИО"
                    />
                    <div className="flex max-xl:hidden gap-5 w-full">
                        <Dropdown
                            value={filters.department}
                            onChange={(values) => updateFilters('department', values)}
                            options={filterOptions.department.options}
                            multiple
                            label={filterOptions.department.label}
                            aria-label="Фильтр по отделениям"
                        />
                    </div>
                    <Button
                        theme="light-blue"
                        icon={AdjustmentsHorizontal}
                        className="xl:hidden self-end"
                        onClick={() => setIsModalOpen(!isModalOpen)}
                        aria-label="Открыть фильтры"
                        aria-expanded={isModalOpen}
                    />
                    {!isMobile && isModalOpen && (
                        <FilterModal
                            filterOptions={filterOptions}
                            currentFilters={filters}
                            onFilterChange={updateFilters}
                            onClose={handleClose}
                            onReset={removeAllFilters}
                        />
                    )}
                </div>
                {filters.department.length > 0 && (
                    <FilterList
                        filters={filters}
                        onRemove={removeFilter}
                        onRemoveAll={removeAllFilters}
                        aria-label="Активные фильтры"
                    />
                )}
            </div>

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
                className="grid grid-cols-4 max-[1125px]:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-5 items-start"
                role="list"
                aria-label="Список врачей"
            >
                {filteredDoctors.map((doctor, index) => {
                    const isLastItem = index === filteredDoctors.length - 1;

                    return (
                        <div
                            key={doctor.id || index}
                            ref={isLastItem ? lastDoctorRef : null}
                            className="flex justify-center items-center"
                            role="listitem"
                        >
                            <DoctorCard
                                data={doctor}
                                className="w-full"
                                onButtonClick={() => formModal.open(doctor)}
                            />
                        </div>
                    );
                })}
            </div>

            {filteredDoctors.length === 0 && !isLoading && !error && (
                <div className="text-center py-10" role="status" aria-live="polite">
                    <p className="text-gray-500 text-lg">По вашему запросу врачей не найдено</p>
                </div>
            )}

            {isMobile && isModalOpen && (
                <FilterModal
                    filterOptions={filterOptions}
                    currentFilters={filters}
                    onFilterChange={updateFilters}
                    onClose={handleClose}
                    onReset={removeAllFilters}
                />
            )}
            <SignUpModal isOpen={formModal.show} onClose={formModal.close} specialistData={formModal.item} />
        </Section>
    )
}