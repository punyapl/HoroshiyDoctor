import { InputHTMLAttributes, forwardRef, } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, className = '', ...props }, ref) => {
        return (
            <label className={`inline-flex gap-2.5 items-center cursor-pointer ${className}`}>
                <input
                    ref={ref}
                    type="checkbox"
                    className="sr-only"
                    {...props}
                />
                <div className={`
                    w-5 h-5 flex items-center justify-center
                    border-2 border-border rounded-[5px]
                    transition-colors duration-200 ease-in-out shrink-0
                    ${props.checked ? 'bg-primary' : 'bg-white'}
                    ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}>
                </div>

                {label && (
                    <span className={`font-p-lg ${props.disabled ? 'text-text-secondary' : 'text-text-main'}`}>
                        {label}
                    </span>
                )}
            </label>
        );
    }
);

Checkbox.displayName = 'Checkbox';