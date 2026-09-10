import { AriaRole, FC, type SVGProps, } from 'react'
import { Icon, } from '../Icon'

type ButtonProps = {
    text?: string;
    icon?: FC<SVGProps<SVGSVGElement>>;
    iconType?: 'stroke' | 'fill' | 'both' | 'none';
    theme: 'white' | 'light-blue' | 'blue' | 'white-blue';
    size?: 'large' | 'regular' | 'small';
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    role?: AriaRole;
}

export const Button = (props: ButtonProps) => {
    const {
        text,
        icon,
        iconType = 'stroke',
        theme,
        size = 'regular',
        onClick,
        className,
        disabled,
        role,
    } = props;

    const themeClass = () => {
        let result
        switch (theme) {
            case 'white':
                result = 'bg-white text-text-primary stroke-primary hover:shadow-white'
                break
            case 'light-blue':
                result = 'bg-primary-light text-text-primary stroke-primary hover:shadow-button-hvr hover:bg-button-hvr hover:text-text-white'
                break
            case 'blue':
                result = 'bg-primary text-text-white stroke-white hover:shadow-button-hvr hover:bg-button-hvr hover:text-text-white'
                break
            case 'white-blue':
                result = 'bg-white text-text-primary stroke-primary hover:shadow-button-hvr hover:bg-button-hvr hover:text-text-white'
                break
            default:
                break
        }
        return result
    }

    const sizeClass = () => {
        const iconOnly = icon && !text
        let result
        switch (size) {
            case 'large':
                result = (iconOnly ? 'p-3' : 'py-4 px-12') + ' font-btn-lg rounded-[16px]'
                break
            case 'regular':
                result = (iconOnly ? 'p-2' : 'py-3 px-8') + ' font-btn-md rounded-[10px]'
                break
            case 'small':
                result = (iconOnly ? 'p-2.25' : 'py-2.5 px-6') + ' font-btn-sm rounded-[8px]'
                break
            default:
                break
        }
        return result
    }

    const IconClass = () => {
        const iconOnly = icon && !text
        
        if (iconType === 'none') {
            let sizeResult;
            switch (size) {
                case 'large':
                    sizeResult = `${iconOnly ? 'h-8 w-8' : 'h-6 w-6'} stroke-0 fill-0`;
                    break;
                case 'regular':
                    sizeResult = `${iconOnly ? 'h-7 w-7' : 'h-5 w-5'} stroke-0 fill-0`;
                    break;
                case 'small':
                    sizeResult = `${iconOnly ? 'h-5 w-5' : 'h-4 w-4'} stroke-0 fill-0`;
                    break;
            }

            return sizeResult;
        }

        let themeResult;
        let sizeResult;

        switch (theme) {
            case 'white':
                themeResult =
                    iconType === 'stroke'
                        ? 'stroke-primary'
                        : iconType === 'fill'
                            ? 'fill-primary'
                            : 'stroke-primary fill-primary';
                break;

            case 'light-blue':
                themeResult =
                    iconType === 'stroke'
                        ? 'stroke-primary group-hover:stroke-text-white'
                        : iconType === 'fill'
                            ? 'fill-primary group-hover:fill-text-white'
                            : 'stroke-primary group-hover:stroke-text-white fill-primary group-hover:fill-text-white';
                break;

            case 'blue':
                themeResult =
                    iconType === 'stroke'
                        ? 'stroke-white'
                        : iconType === 'fill'
                            ? 'fill-white'
                            : 'stroke-white fill-white';
                break;

            case 'white-blue':
                themeResult =
                    iconType === 'stroke'
                        ? 'stroke-primary group-hover:stroke-text-white'
                        : iconType === 'fill'
                            ? 'fill-primary group-hover:fill-text-white'
                            : 'stroke-primary group-hover:stroke-text-white fill-primary group-hover:fill-text-white';
                break;
        }

        switch (size) {
            case 'large':
                sizeResult = `${iconType === 'stroke' || iconType === 'both' ? 'stroke-[2.5]' : ''} ${iconOnly ? 'h-8 w-8' : 'h-6 w-6'}`;
                break;
            case 'regular':
                sizeResult = `${iconType === 'stroke' || iconType === 'both' ? 'stroke-2' : ''} ${iconOnly ? 'h-7 w-7' : 'h-5 w-5'}`;
                break;
            case 'small':
                sizeResult = `${iconType === 'stroke' || iconType === 'both' ? 'stroke-3' : ''} ${iconOnly ? 'h-5 w-5' : 'h-4 w-4'}`;
                break;
        }

        return `${themeResult} ${sizeResult}`;
    };


    return (
        <button
            className={`
                flex items-center justify-center gap-2.5 border-0 cursor-pointer group hover:shadow transition duration-300
                ${themeClass()} ${sizeClass()} ${className} ${disabled && 'opacity-30 cursor-not-allowed'} 
            `}
            onClick={onClick}
            disabled={disabled}
            role={role}
        >
            {
                icon &&
                <Icon Svg={icon} className={`shrink-0 ${IconClass()}`} />
            }
            {text}
        </button>
    )
}