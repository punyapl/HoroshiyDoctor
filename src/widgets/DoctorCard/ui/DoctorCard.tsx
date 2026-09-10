import { Doctor, } from '@/entities/Doctor/types';
import { useDevice } from '@/shared/hooks/useDevice';
import { Button } from '@/shared/ui/Button';
import Calendar from '@/shared/assets/icons/Calendar.svg'

type DoctorCardProps = {
    data: Doctor;
    onButtonClick?: () => void;
    className?: string
}

export const DoctorCard = (props: DoctorCardProps) => {
    const {
        data,
        onButtonClick,
        className
    } = props
    const { isMobile, } = useDevice()

    return (
        <div
            className={`bg-background border-2 border-border flex flex-col justify-between rounded-[20px] 
                p-2.5 max-md:p-1.5 max-w-[305px] min-w-[263px] max-xl:max-w-[342px] max-md:max-w-[300px] max-md:min-w-[212px] 
                min-h-[490px] max-md:min-h-[390px] ${className}`}
        >
            <div className='flex flex-col gap-3 max-md:gap-2'>
                <img src={data.photo} alt="Doctor image" className="w-full aspect-square rounded-[10px] " />
                <h6 className="font-h6 text-text-main line-clamp-3">{data.name}</h6>
                <div className="flex flex-row gap-3 max-md:gap-2 pb-1 flex-wrap w-full max-h-[88px] overflow-clip">
                    <div
                        className="px-3 py-2 w-full rounded-[10px] bg-primary-light text-text-primary 
                            font-p-md leading-tight line-clamp-2 text-ellipsis text-center"
                    >
                        {data.speciality[0]}
                    </div>
                </div>
            </div>
            <Button theme="blue" text="Записаться" icon={Calendar} iconType='both' size={isMobile ? 'small' : 'regular'} onClick={onButtonClick} />
        </div>
    )

}