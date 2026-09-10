import { FilterOptions, Filters, } from '@/entities/Filter/types'
import XMark from '@/shared/assets/icons/XMark.svg'
import { Button, } from '../Button'
import { Checkbox, } from '../Checkbox'
import { Icon, } from '../Icon'

type FilterModalProps = {
    filterOptions: FilterOptions;
    currentFilters: Filters;
    onFilterChange: (filterKey: string, values: string[]) => void;
    onClose: () => void;
    onReset: () => void;
}

export const FilterModal = (props: FilterModalProps) => {
    const {
        filterOptions,
        currentFilters,
        onFilterChange,
        onClose,
        onReset,
    } = props;

    const handleCheckboxChange = (filterKey: string, option: string) => {
        const currentValues = currentFilters[filterKey] || [];
        const newValues = currentValues.includes(option)
            ? currentValues.filter(v => v !== option)
            : [...currentValues, option,];

        onFilterChange(filterKey, newValues);
    };



    return (
        <div
            className="absolute mt-4 max-md:m-0 max-md:w-screen max-md:h-screen max-md:pt-[95px]
            top-full max-md:top-0 right-0 flex flex-col gap-[23px] max-md:gap-0 
            max-md:justify-between p-5 w-xs bg-white rounded-lg max-md:rounded-none shadow-xl"
        >
            <div className="flex flex-col gap-[23px]">
                <div className="flex justify-between items-center">
                    <h4 className="font-h4 text-text-primary">Фильтры</h4>
                    <Icon Svg={XMark} width={24} height={24} className="stroke-2 stroke-primary" onClickCapture={onClose} />
                </div>
                {
                    Object.entries(filterOptions).map(([filterKey, config,]) => (
                        <div key={filterKey} className="flex flex-col gap-4">
                            <p className="font-p-xl text-text-main">{config.label}</p>
                            {config.options.map((option) => {
                                const isChecked = currentFilters[filterKey]?.includes(option) || false;

                                return (
                                    <Checkbox
                                        key={`${filterKey}-${option}`}
                                        label={option}
                                        checked={isChecked}
                                        onChange={() => handleCheckboxChange(filterKey, option)}
                                        className="w-full"
                                    />
                                );
                            })}
                        </div>
                    ))
                }
            </div>

            <Button theme="light-blue" text="Сбросить" onClick={onReset} />
        </div>
    )
}