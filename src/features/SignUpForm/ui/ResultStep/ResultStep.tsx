import { Icon } from "@/shared/ui/Icon";
import XMark from '@/shared/assets/icons/XMark.svg'
import Heart from '@/shared/assets/icons/Heart.svg'
import { Appointment } from "../../types";
import { formatDate } from "@/shared/lib/dateFormatter";

type ResultStepProps = {
    result: 'success' | 'error'
    appointmentData: Appointment
}

export const ResultStep = (props: ResultStepProps) => {
    const { result, appointmentData } = props;
    return (
        <div className="flex flex-col gap-5" aria-label="Результат записи">
            {
                result === 'success' ? 
                <div className="flex flex-col gap-3 items-center">
                    <Icon Svg={Heart} width={74} height={74} className="fill-primary stroke-3 stroke-primary"/>
                    <h5 className="font-h5 text-center text-primary">Вы были успешно записаны!</h5>
                    <p className="font-p-md text-text-main">{`Вы были записаны на ${formatDate(appointmentData.date, "D MMMM")} в ${appointmentData.timeStart}`}</p>
                </div>
                :
                <div className="flex flex-col gap-3 items-center">
                    <Icon Svg={XMark} width={74} height={74} className="stroke-3 stroke-primary"/>
                    <h5 className="font-h5 text-center text-primary">Не удалось создать запись</h5>
                    <p className="font-p-md text-text-main">Пожалуйста, попробуйте позже</p>
                </div>
            }
        </div>
    )
}