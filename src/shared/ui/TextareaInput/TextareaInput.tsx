import { useState, useEffect } from "react";

type TextareaInputProps = {
    label: string;
    required?: boolean;
    placeholder?: string;
    disabled?: boolean;
    name?: string;
    id?: string;
    value?: string;
    defaultValue?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    error?: string;
    className?: string;
    rows?: number;
}

export const TextareaInput = (props: TextareaInputProps) => {
    const {
        label,
        required,
        placeholder,
        disabled,
        name,
        id,
        value,
        defaultValue,
        onChange,
        error,
        className,
    } = props;

    const [text, setText,] = useState<string>(value ?? defaultValue ?? '');

    useEffect(() => {
        if (value !== undefined) {
            setText(value);
        }
    }, [value,]);

    return (
        <div className={`flex flex-col gap-2.5 ${className}`}>
            <label htmlFor={id}>
                {label}{required && ' *'}
            </label>
            <textarea
                className="resize-y py-2.5 min-h-[104px] grow min-w-0 px-5 text-base border
                    border-border rounded-[10px] bg-background 
                    placeholder:text-text-secondary"
                id={id}
                name={name}
                placeholder={placeholder}
                disabled={disabled}
                rows={props.rows}
                value={value}
                defaultValue={defaultValue}
                onChange={e => {
                    const v = e.target.value;
                    setText(v);
                    onChange?.(e);
                }}
            />
            {error && <span className="error">{error}</span>}
        </div>
    )
}