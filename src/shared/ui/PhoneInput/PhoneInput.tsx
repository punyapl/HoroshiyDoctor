import MaskedInput from 'react-text-mask';

type PhoneInputProps = {
    label: string;
    required?: boolean;
    disabled?: boolean;
    name?: string;
    id?: string;
    value?: string;
    onChange?: (value: string) => void;
    error?: string;
    className?: string;
}

export const PhoneInput = (props: PhoneInputProps) => {
    const {
        label,
        required,
        disabled,
        name,
        id,
        value,
        onChange,
        error,
        className,
    } = props;

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const raw = e.target.value.replace(/\D/g, '');
        if (raw.length === 0) {
            onChange?.('');
        } else {
            onChange?.('7' + raw);
        }
    };

    const displayValue = value && value.startsWith('7') ? value.slice(1) : value || '';

    return (
        <div className={`flex flex-col gap-2.5 ${className}`}>
            <label htmlFor={id}>
                {label}{required && ' *'}
            </label>
            <div className="flex grow">
                <div className="flex rounded-l-md border border-border w-[42px] h-[42px] items-center justify-center font-p-md text-text-secondary">
                    +7
                </div>
                <MaskedInput
                    minLength={10}
                    required={required}
                    disabled={disabled}
                    name={name}
                    mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/,]}
                    placeholder="(___) ___-__-__"
                    value={displayValue}
                    onChange={handleChange}
                    className="min-h-[40px] grow min-w-0 px-3 text-base border 
                        border-border rounded-r-[10px] bg-background 
                        placeholder:text-text-secondary"
                    inputMode='numeric'
                />
            </div>
            {error && <span className="error">{error}</span>}
        </div>
    )
}