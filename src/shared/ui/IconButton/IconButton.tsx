import { AriaRole, FC, type SVGProps } from "react";
import { Icon } from "../Icon";

type IconButtonProps = {
    text: string;
    icon: FC<SVGProps<SVGSVGElement>>;
    iconType?: 'stroke' | 'fill' | 'both';
    size?: 'regular' | 'small';
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    role?: AriaRole;
}

export const IconButton = (props: IconButtonProps) => {
    const {
        text,
        icon,
        iconType = 'stroke',
        size = 'regular',
        onClick,
        className,
        disabled,
        role,
    } = props;

    const sizeClass = () => {
        let result
        switch (size) {
            case 'regular':
                result = 'p-3 font-btn-lg max-w-[66px] h-[66px]'
                break
            case 'small':
                result = 'p-1.5 font-btn-sm max-w-[44px] h-[44px]'
                break
            default:
                break
        }
        return result
    }

    const IconSizeClass = () => {
        let sizeResult
        let themeResult = iconType === 'stroke' ?
            'stroke-white' :
            iconType === 'fill' ?
                'fill-white' :
                'stroke-white fill-white'

        switch (size) {
            case 'regular':
                sizeResult = iconType === 'stroke' || 'both' ? 'stroke-2' : null
                break
            case 'small':
                sizeResult = iconType === 'stroke' || 'both' ? 'stroke-3' : null
                break
            default:
                break
        }
        return `${themeResult} ${sizeResult}`
    }

    return (
        <button
            className={`
                        flex items-center overflow-hidden gap-3 rounded-full text-text-white cursor-pointer
                        bg-primary border-primary-light border-4 
                        transition-all duration-300 ease-in-out
                        group hover:shadow hover:max-w-[230px]
                        ${sizeClass()} ${className || ''} ${disabled && 'opacity-30 cursor-not-allowed'}
                    `}
            onClick={onClick}
            disabled={disabled}
            role={role}
        >
            {
                icon &&
                <Icon Svg={icon} height={size == 'regular'? 36 : 24} width={size == 'regular'? 36 : 24} className={`shrink-0 ${IconSizeClass()}`} />
            }
            {text}
        </button>
    )
}