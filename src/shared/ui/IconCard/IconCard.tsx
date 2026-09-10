import { AriaRole, FC, type SVGProps, } from 'react'
import { useDevice, } from '@/shared/hooks/useDevice';
import { Icon, } from '../Icon'

type IconCardProps = {
    icon: FC<SVGProps<SVGSVGElement>>;
    titleText: string;
    paragraphText: string;
    role?: AriaRole;
}

export const IconCard = (props: IconCardProps) => {
    const { icon, titleText, paragraphText, } = props;
    const { isMobile, isTablet, } = useDevice()

    return (
        <div
            className="relative flex flex-col items-center gap-8 max-md:gap-5 p-5 
            bg-primary-light rounded-[20px] pt-12 w-[305px] max-xl:w-[330px] max-md:w-[300px]"
        >
            <div className='absolute -top-[30px] p-1.5 rounded-full bg-white'>
                <Icon
                Svg={icon}
                width={isMobile ? 40 : 48}
                height={isMobile ? 40 : 48}
                className=" fill-primary"
            />
            </div>
            
            <div className="flex flex-col gap-4 max-md:gap-2">
                <p className="font-h4 text-center text-text-main">{titleText}</p>
                <p className="font-p-md text-center text-text-main">{paragraphText}</p>
            </div>
        </div>
    )
}