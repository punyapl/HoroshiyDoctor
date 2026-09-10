import { useState, useEffect, InputHTMLAttributes, forwardRef } from 'react';
import MagnigyingGlass from '@/shared/assets/icons/MagnifyingGlass.svg'
import XMark from '@/shared/assets/icons/XMark.svg'
import { Button } from '../Button';

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label?: string;
    required?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    error?: string;
    className?: string;
    searchButton?: boolean;
    onSearchButtonClick?: () => void;
    onRemoveButtonClick?: () => void;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
    const {
        label,
        required,
        onChange,
        error,
        className,
        searchButton,
        onRemoveButtonClick,
        onSearchButtonClick,
        value,
        defaultValue,
        ...inputProps // Все остальные стандартные пропсы input
    } = props;

    const [text, setText] = useState<string>(value?.toString() ?? defaultValue?.toString() ?? '');

    useEffect(() => {
        if (value !== undefined) {
            setText(value.toString());
        }
    }, [value]);

    const hasText = text.length > 0;

    return (
        <div className={`flex flex-col gap-2.5 ${className}`}>
            {label && (
                <label htmlFor={inputProps.id}>
                    {label}{required && ' *'}
                </label>
            )}
            <div className="flex grow gap-2.5">
                <input
                    ref={ref}
                    className="min-h-[40px] grow min-w-0 shrink px-5 text-base border 
                        border-border rounded-[10px] bg-background 
                        placeholder:text-text-secondary"
                    value={value}
                    defaultValue={defaultValue}
                    onChange={e => {
                        const v = e.target.value;
                        setText(v);
                        onChange?.(e);
                    }}
                    {...inputProps} // Все стандартные HTML атрибуты
                />
                {searchButton && (
                    <Button
                        theme="blue"
                        icon={MagnigyingGlass}
                        onClick={onSearchButtonClick}
                    />
                )}
            </div>
            {error && <span className="error">{error}</span>}
        </div>
    );
});