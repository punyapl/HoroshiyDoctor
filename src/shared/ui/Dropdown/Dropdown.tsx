import { useState, useRef, useEffect, ReactNode, MouseEvent, useMemo } from 'react';
import ChevronDown from '@/shared/assets/icons/ChevronDown.svg';
import XMark from '@/shared/assets/icons/XMark.svg';
import MagnifyingGlass from '@/shared/assets/icons/MagnifyingGlass.svg';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Icon } from '@/shared/ui/Icon';
import { TextInput } from '@/shared/ui/TextInput';

type DropdownOption = string | { value: string; label: ReactNode };

interface BaseDropdownProps {
    options: DropdownOption[];
    label: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    searchable?: boolean; // Новая опция для включения поиска
    searchPlaceholder?: string; // Плейсхолдер для поля поиска
}

interface SingleSelectProps extends BaseDropdownProps {
    multiple?: false;
    value: string;
    onChange: (value: string) => void;
}

interface MultiSelectProps extends BaseDropdownProps {
    multiple: true;
    value: string[];
    onChange: (value: string[]) => void;
}

type CustomDropdownProps = SingleSelectProps | MultiSelectProps;

const getOptionValue = (option: DropdownOption): string => {
    return typeof option === 'string' ? option : option.value;
};

const getOptionLabel = (option: DropdownOption): ReactNode => {
    return typeof option === 'string' ? option : option.label;
};

const getOptionText = (option: DropdownOption): string => {
    return typeof option === 'string' ? option : String(option.label);
};

export const Dropdown = (props: CustomDropdownProps) => {
    const {
        options,
        label,
        placeholder = 'Выбрать',
        required,
        disabled = false,
        className = '',
        multiple,
        searchable = false, // По умолчанию поиск отключен
        searchPlaceholder = 'Поиск...'
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    // Фильтрация опций по поисковому запросу
    const filteredOptions = useMemo(() => {
        if (!searchQuery.trim()) {
            return options;
        }

        const query = searchQuery.toLowerCase();
        return options.filter(option =>
            getOptionText(option).toLowerCase().includes(query)
        );
    }, [options, searchQuery]);

    const isOptionSelected = (optionValue: string) => {
        if (multiple) {
            return props.value.includes(optionValue);
        }
        return props.value === optionValue;
    };

    const getDisplayValue = () => {
        if (multiple) {
            const selectedOptions = options.filter(opt =>
                props.value.includes(getOptionValue(opt))
            );

            if (selectedOptions.length === 0) return placeholder;

            return selectedOptions.map(opt =>
                typeof opt === 'string' ? opt : opt.label
            ).join(', ');
        } else {
            const selectedOption = options.find(opt =>
                getOptionValue(opt) === props.value
            );
            return selectedOption ? getOptionLabel(selectedOption) : placeholder;
        }
    };

    useEffect(() => {
        setFocusedIndex(-1);
        setSearchQuery('');
    }, [options]);


    // Обработчик клика вне компонента
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside as any);
        return () => document.removeEventListener('mousedown', handleClickOutside as any);
    }, []);

    // Фокусировка на поле поиска при открытии
    useEffect(() => {
        if (isOpen && searchable && searchInputRef.current) {
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
        }
    }, [isOpen, searchable]);

    // Обработка клавиатурной навигации
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen || multiple) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setFocusedIndex(prev => Math.min(prev + 1, filteredOptions.length - 1));
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setFocusedIndex(prev => Math.max(prev - 1, 0));
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
                        handleSelect(filteredOptions[focusedIndex]);
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    if (searchQuery) {
                        setSearchQuery(''); // Сначала очищаем поиск
                    } else {
                        setIsOpen(false); // Затем закрываем dropdown
                    }
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, focusedIndex, filteredOptions, multiple, searchQuery]);

    const handleSelect = (option: DropdownOption) => {
        const optionValue = getOptionValue(option);

        if (multiple) {
            const currentValues = [...props.value];
            const newValues = currentValues.includes(optionValue)
                ? currentValues.filter(v => v !== optionValue)
                : [...currentValues, optionValue];

            props.onChange(newValues);
        } else {
            props.onChange(optionValue);
            setIsOpen(false);
            setFocusedIndex(-1);
            setSearchQuery(''); // Сбрасываем поиск при выборе
        }
    };

    const toggleDropdown = () => {
        if (disabled) return;
        setIsOpen(!isOpen);
        setFocusedIndex(-1);
        setSearchQuery(''); // Сбрасываем поиск при открытии/закрытии
    };

    const handleClear = (e: React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();
        if (multiple) {
            props.onChange([]);
        } else {
            props.onChange('');
        }
        setIsOpen(false);
        setSearchQuery(''); // Сбрасываем поиск при очистке
    };

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setFocusedIndex(-1); // Сбрасываем фокус при поиске
    };

    const displayValue = getDisplayValue();
    const hasSelection = multiple
        ? props.value.length > 0
        : props.value !== '';

    return (
        <div
            ref={dropdownRef}
            className={`relative w-full flex flex-col gap-2.5 ${className}`}
        >
            <label>
                {label}{required && ' *'}
            </label>

            {/* Триггер */}
            <button
                type="button"
                disabled={disabled}
                className={`
                    w-full min-h-[40px] flex grow justify-between items-center
                    px-5 text-base border border-border rounded-[10px] bg-background
                    transition-all duration-200
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                onClick={toggleDropdown}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-disabled={disabled}
            >
                <div className='flex-1 min-w-0 truncate text-left'>
                    <span className={`${!hasSelection ? 'text-text-secondary' : ''}`}>
                        {displayValue}
                    </span>
                </div>

                {hasSelection ? (
                    <Icon
                        Svg={XMark}
                        width={24}
                        height={24}
                        className="stroke-3 stroke-primary cursor-pointer shrink-0"
                        onClickCapture={handleClear}
                    />
                ) : (
                    <Icon
                        Svg={ChevronDown}
                        width={24}
                        height={24}
                        className={`stroke-3 stroke-primary transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                    />
                )}
            </button>

            {/* Выпадающий список */}
            {isOpen && (
                <div
                    className={`
                        absolute flex flex-col top-full mt-1 z-20 w-full
                        bg-white border border-gray-200 rounded-lg
                        shadow-lg overflow-hidden
                        max-h-65
                    `}
                    role="listbox"
                >
                    {/* Поле поиска */}
                    {searchable && (
                        <div className="relative">
                            <Icon
                                Svg={MagnifyingGlass}
                                width={20}
                                height={20}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 stroke-gray-400"
                            />
                            <TextInput
                                ref={searchInputRef}
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className="w-full pl-10 pr-3 py-2"
                                onMouseDown={(e) => e.stopPropagation()}
                            />
                        </div>
                    )}

                    <ul className="relative py-1 overflow-y-auto scrollbar-primary h-min">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option, index) => {
                                const optionValue = getOptionValue(option);
                                const isSelected = isOptionSelected(optionValue);
                                const isFocused = !multiple && index === focusedIndex;

                                return (
                                    <li
                                        key={index}
                                        id={`option-${index}`}
                                        className={`
                                            px-4 py-2 transition-colors duration-150
                                            ${!multiple ? 'cursor-pointer' : ''}
                                            ${isFocused ? 'bg-gray-100' : ''}
                                            ${isSelected ? 'bg-primary-light text-primary' : ''}
                                        `}
                                        onClick={!multiple ? () => handleSelect(option) : undefined}
                                        onMouseEnter={() => !multiple && setFocusedIndex(index)}
                                        role="option"
                                        aria-selected={isSelected}
                                    >
                                        {multiple ? (
                                            <Checkbox
                                                label={String(getOptionLabel(option))}
                                                checked={isSelected}
                                                onChange={() => handleSelect(option)}
                                                className="w-full"
                                            />
                                        ) : (
                                            <div className={isSelected ? 'text-primary font-medium' : ''}>
                                                {getOptionLabel(option)}
                                            </div>
                                        )}
                                    </li>
                                );
                            })
                        ) : (
                            <li className="px-4 py-3 text-center text-gray-500">
                                {searchQuery ? 'Ничего не найдено' : 'Нет доступных вариантов'}
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};