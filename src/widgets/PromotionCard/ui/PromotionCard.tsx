import { Promotion } from '@/entities/Promotion/types'
import { useDevice } from '@/shared/hooks/useDevice'
import { Button } from '@/shared/ui/Button'
import Calendar from '@/shared/assets/icons/Calendar.svg'

type PromotionCardProps = {
    data: Promotion;
    onButtonClick?: () => void;
}

export const PromotionCard = (props: PromotionCardProps) => {
    const { data, onButtonClick } = props
    const { isMobile, } = useDevice()

    return (
        <div
            className="flex flex-col justify-between bg-background border-2 border-border 
                rounded-[20px] p-[15px] max-md:p-2.5 w-max min-w-[546px] max-w-[546px] 
                max-md:min-w-[212px] max-md:max-w-[212px] min-h-[234px] max-md:min-h-[190px]"
        >
            <div className="flex flex-col w-full">
                <h5 className="font-h5 text-text-main text-wrap line-clamp-3" title={data.name}>{data.name}</h5>
                <p className="text-text-secondary font-p-md mt-2 line-clamp-2 text-wrap">{data.category}</p>
                <p className="text-text-main font-p-lg mt-3">{data.price} ₽</p>
            </div>
            <Button theme="blue" text="Записаться" icon={Calendar} iconType='both' size={isMobile ? 'small' : 'regular'} onClick={onButtonClick} />
        </div>
    )
}