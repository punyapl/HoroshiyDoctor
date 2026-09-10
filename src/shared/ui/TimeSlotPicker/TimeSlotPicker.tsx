import { useEffect, useMemo, useState, } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import ChevronDown from '@/shared/assets/icons/ChevronDown.svg'
import { useDevice, } from '@/shared/hooks/useDevice';
import { formatDate, } from '@/shared/lib/dateFormatter';
import { Icon, } from '@/shared/ui/Icon'
import { TimeSlot } from '@/shared/api';

type TimeSlotPickerProps = {
    availableSlots: TimeSlot[];
    onSlotSelect?: (date: string, timeStart: string, timeEnd: string) => void;
    selectedDate?: string;
    selectedTime?: string;
    disabled?: boolean;
}

export const TimeSlotPicker = (props: TimeSlotPickerProps) => {
    const {
        availableSlots,
        onSlotSelect,
        selectedDate: externalSelectedDate,
        selectedTime: externalSelectedTime,
        disabled = false
    } = props;
    const { isMobile } = useDevice()

    const [internalSelectedDate, setInternalSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [internalSelectedTime, setInternalSelectedTime] = useState('');

    const selectedDate = externalSelectedDate || internalSelectedDate;
    const selectedTime = externalSelectedTime || internalSelectedTime;

    // Преобразуем слоты в полные даты-время, используя поле date из каждого слота
    const processedSlots = useMemo(() => {
        return availableSlots.map(slot => {
            // Используем date из слота для создания полной даты-времени
            const startDateTime = `${slot.date}T${slot.start}`;
            const endDateTime = `${slot.date}T${slot.end}`;
            
            return {
                ...slot,
                start: startDateTime,
                end: endDateTime
            };
        });
    }, [availableSlots]);

    const allDates = Array.from(
        new Set(processedSlots.map(slot => slot.date)) // Используем поле date напрямую
    ).sort();

    const slotsForSelectedDate = processedSlots.filter(
        slot => slot.date === selectedDate // Сравниваем по полю date
    );

    const currentDateIndex = allDates.findIndex(date => date === selectedDate);

    const handlePrevDate = () => {
        if (currentDateIndex > 0) {
            const newDate = allDates[currentDateIndex - 1];
            if (!newDate) return;
            if (externalSelectedDate) {
                onSlotSelect?.(newDate, '', '');
            } else {
                setInternalSelectedDate(newDate);
                setInternalSelectedTime('');
            }
        }
    };

    const handleNextDate = () => {
        if (currentDateIndex < allDates.length - 1) {
            const newDate = allDates[currentDateIndex + 1];
            if (!newDate) return;
            if (externalSelectedDate) {
                onSlotSelect?.(newDate, '', '');
            } else {
                setInternalSelectedDate(newDate);
                setInternalSelectedTime('');
            }
        }
    };

    const handleTimeSelect = (slot: TimeSlot) => {
        const date = slot.date;
        const timeStart = slot.start.split('T')[1]; // Берем только время из полной даты
        const timeEnd = slot.end.split('T')[1]; // Берем только время из полной даты
        if (!date) return;
        if (externalSelectedDate && externalSelectedTime) {
            onSlotSelect?.(date, timeStart, timeEnd);
        } else {
            setInternalSelectedDate(date);
            setInternalSelectedTime(timeStart);
            onSlotSelect?.(date, timeStart, timeEnd);
        }
    };
    
    useEffect(() => {
        if (externalSelectedDate && externalSelectedDate !== internalSelectedDate) {
            setInternalSelectedTime('');
        }
    }, [externalSelectedDate, internalSelectedDate]);

    if (allDates.length === 0) {
        return (
            <div className="flex flex-col gap-5">
                <p className="font-p-lg text-text-secondary text-center">
                    Нет доступного времени для записи
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="flex px-6 py-3 justify-between items-center border border-border rounded-[10px]">
                <Icon
                    Svg={ChevronDown}
                    width={isMobile ? 16 : 20}
                    height={isMobile ? 16 : 20}
                    className={`stroke-3 stroke-text-secondary rotate-90 ${currentDateIndex <= 0 || disabled ? 'opacity-30' : 'cursor-pointer'}`}
                    onClickCapture={currentDateIndex > 0 && !disabled ? handlePrevDate : undefined}
                />
                <p className="font-p-lg text-text-main">{formatDate(selectedDate, "D MMMM")}</p>
                <Icon
                    Svg={ChevronDown}
                    width={isMobile ? 16 : 20}
                    height={isMobile ? 16 : 20}
                    className={`stroke-3 stroke-text-primary -rotate-90 ${currentDateIndex >= allDates.length - 1 || disabled ? 'opacity-30' : 'cursor-pointer'}`}
                    onClickCapture={currentDateIndex < allDates.length - 1 && !disabled ? handleNextDate : undefined}
                />
            </div>
            <div className="flex flex-wrap gap-5">
                {slotsForSelectedDate.length > 0 ? (
                    slotsForSelectedDate.map((slot, index) => {
                        const timeStart = slot.start.split('T')[1]; // Берем только время
                        const timeEnd = slot.end.split('T')[1]; // Берем только время
                        const isSelected = selectedTime === timeStart && selectedDate === slot.date;

                        return (
                            <button
                                key={index}
                                disabled={disabled}
                                className={`
                                    flex items-center justify-center border font-p-regular leading-none
                                    ${isSelected
                                        ? 'bg-primary text-text-white border-primary'
                                        : 'bg-white text-text-main border-border'
                                    }
                                    ${isMobile ? 'py-2.5 px-5 rounded-[10px] text-sm' : 'py-3 px-4 rounded-xl'}
                                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                                    `}
                                onClick={() => handleTimeSelect(slot)}
                            >
                                {timeStart}
                            </button>
                        );
                    })
                ) : (
                    <p className="font-p-lg text-text-secondary text-center w-full">
                        Нет доступного времени на выбранную дату
                    </p>
                )}
            </div>
        </div>
    )
}