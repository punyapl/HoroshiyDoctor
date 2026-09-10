import { Service, } from '@/entities/Service/types'
import Calendar from '@/shared/assets/icons/Calendar.svg'
import Clock from '@/shared/assets/icons/Clock.svg'
import { useDevice, } from '@/shared/hooks/useDevice'
import { Button, } from '@/shared/ui/Button'
import { Icon, } from '@/shared/ui/Icon'

type ServiceCardProps = {
    data: Service;
    variant?: 'lessInfo' | 'moreInfo';
    onButtonClick?: () => void;
}

export const ServiceCard = (props: ServiceCardProps) => {
    const {
        data,
        variant = 'lessInfo',
        onButtonClick,
    } = props
    const { isMobile, } = useDevice()

    const isButtonAvailable = !data.group.name.trim().toLowerCase().includes('лаборатория цлд');

    

    switch (variant) {
        case 'lessInfo':
            return (
                <div
                    className="flex flex-col justify-between bg-background border-2 border-border 
                    rounded-[20px] p-[15px] max-md:p-2.5 w-max min-w-[263px] max-w-[263px] 
                    min-h-[234px] max-md:min-w-[212px] max-md:max-w-[212px] max-md:min-h-[190px]"
                >
                    <div className="flex flex-col w-full gap-3">
                        <div className='flex flex-col w-full gap-2'>
                            <h6 className="font-h6 text-text-main text-wrap line-clamp-3" title={data.name}>{data.name}</h6>
                            <p className="text-text-secondary font-p-md line-clamp-2 text-wrap">{data.group.name}</p>
                        </div>
                        <p className="text-text-main font-p-lg">{data.price} ₽</p>
                    </div>
                    {
                        isButtonAvailable &&
                        <Button theme="blue" text="Записаться" icon={Calendar} iconType='both' size={isMobile ? 'small' : 'regular'} onClick={onButtonClick} />
                    }
                </div>
            )
        case 'moreInfo':
            return (
                <div
                    className="flex flex-col max-w-[410px] min-w-[280px] w-full
                min-h-[293px] max-md:min-h-[210px] justify-between
                bg-background border-2 border-border rounded-[20px] p-5 max-md:p-3"
                >
                    <div className="flex flex-col w-full gap-2.5">
                        <h6 className="font-h6 text-text-main text-wrap line-clamp-3" title={data.name}>{data.name}</h6>
                        <div className='bg-primary-light px-4 py-2 rounded-[10px] w-full'>
                            <p className="text-text-primary text-center font-p-md w-full text-wrap line-clamp-2">{data.group.name}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between">
                            <div className="font-p-lg max-md:text-sm text-text-main flex gap-1 items-center">
                                <Icon Svg={Clock} width={15} height={15} className="stroke-3 stroke-text-main" />
                                {data.duration} минут
                            </div>
                            <p className="font-p-xl max-md:text-base text-text-main font-normal">{data.price} ₽</p>
                        </div>
                        {
                            isButtonAvailable &&
                            <Button theme="blue" text="Записаться" icon={Calendar} iconType='both' size={isMobile ? 'small' : 'regular'} onClick={onButtonClick} />
                        }
                    </div>
                </div>
            )
        default:
            console.warn(`Unknown variant: ${variant}`);
            return null;
    }
}