import { useState, useEffect } from 'react'
import { useDevice } from '@/shared/hooks/useDevice'
import { Button } from '@/shared/ui/Button'
import { Dropdown } from '@/shared/ui/Dropdown'
import { TimeSlotPicker } from '@/shared/ui/TimeSlotPicker'
import { TextareaInput } from '@/shared/ui/TextareaInput'
import { getServices, getDoctors, getSchedule, TimeSlot } from '@/shared/api'
import type { Patient, Appointment } from '../../types'

interface AppointmentInfoFormProps {
    onSubmit: (appointmentData: Appointment, patientData: Patient | null) => Promise<void>
    patientData: Patient | null
    appointmentData: Appointment
    onAppointmentDataChange: (data: Appointment) => void
    isAppointmentDataProvided?: boolean
    isSpecialistDataProvided?: boolean
}

export const AppointmentInfoForm = (props: AppointmentInfoFormProps) => {
    const {
        onSubmit,
        patientData,
        appointmentData,
        onAppointmentDataChange,
        isAppointmentDataProvided,
        isSpecialistDataProvided
    } = props

    const { isMobile } = useDevice()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [services, setServices] = useState<any[]>([])
    const [doctors, setDoctors] = useState<any[]>([])
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])

    const loadServices = async (doctorId?: string) => {
        await getServices({ limit: 500, ...(doctorId && { specialist: Number(doctorId) }) })
            .then((res) => {
                if ('data' in res) {
                    let filteredServices = res.data.list.filter((service) =>
                        service.group.name.trim().toLowerCase() !== 'лаборатория цлд'
                    )
                    setServices(filteredServices)
                }
            })
            .catch((err) => {
                setError('Ошибка при загрузке услуг')
            })
    }

    const loadDoctors = async (serviceId: string) => {
        await getDoctors({ event_type: Number(serviceId) })
            .then((res) => {
                if ('data' in res) {
                    setDoctors(res.data.list)
                }
            })
            .catch((err) => {
                setError('Ошибка при загрузке врачей')
            })
    }

    const loadTimeSlots = async (serviceId: string, doctorId: string) => {
        await getSchedule({
            event_type: Number(serviceId),
            specialist: Number(doctorId)
        })
            .then((res) => {
                if ('data' in res) {
                    const slotsArray = Object.entries(res.data.list).flatMap(
                        ([date, slots]) => slots.map(slot => ({
                            date,
                            start: slot.start,
                            end: slot.end,
                            specialist: slot.specialist
                        }))
                    );

                    setTimeSlots(slotsArray);
                }
            })
            .catch((err) => {
                setError('Ошибка при загрузке доступного времени');
            })
    };

    const handleFieldChange = (field: keyof Appointment) => (value: string) => {
        onAppointmentDataChange({
            ...appointmentData,
            [field]: value
        })
    }

    const handleTimeSlotSelect = (date: string, timeStart: string) => {
        onAppointmentDataChange({
            ...appointmentData,
            date,
            timeStart,
        });
    }

    const handleSubmit = async () => {
        setLoading(true)
        setError(null)
        await onSubmit(appointmentData, patientData)
        setLoading(false)
    }

    useEffect(() => {
        if (!isAppointmentDataProvided) {
            loadServices(isSpecialistDataProvided ? appointmentData.doctorId : undefined);
        }
    }, []);

    useEffect(() => {
        if (appointmentData.serviceId || isAppointmentDataProvided) {
            loadDoctors(appointmentData.serviceId)
        }
    }, [appointmentData.serviceId, isAppointmentDataProvided])

    useEffect(() => {
        if ((appointmentData.serviceId || isAppointmentDataProvided) && appointmentData.doctorId) {
            loadTimeSlots(appointmentData.serviceId, appointmentData.doctorId)
        }
    }, [appointmentData.serviceId, isAppointmentDataProvided, appointmentData.doctorId])

    return (
        <div className="flex flex-col gap-5" role="form" aria-label="Информация о записи">
            {
                !isAppointmentDataProvided &&
                <Dropdown
                    options={services.map(s => ({ value: s.id.toString(), label: s.name }))}
                    value={appointmentData.serviceId}
                    onChange={handleFieldChange('serviceId')}
                    label="Услуга"
                    placeholder="Выберите услугу"
                    aria-required="true"
                    searchable
                />
            }
            {
                !isSpecialistDataProvided &&
                <Dropdown
                    options={doctors.map(d => ({ value: d.id.toString(), label: d.name }))}
                    value={appointmentData.doctorId}
                    onChange={handleFieldChange('doctorId')}
                    label="Врач"
                    placeholder="Выберите врача"
                    disabled={!appointmentData.serviceId}
                    aria-required="true"
                    searchable
                />
            }
            <TimeSlotPicker
                availableSlots={timeSlots}
                onSlotSelect={handleTimeSlotSelect}
                selectedDate={appointmentData.date}
                selectedTime={appointmentData.timeStart}
                disabled={!appointmentData.doctorId}
                aria-required="true"
            />
            <TextareaInput
                label="Комментарий"
                placeholder="Опишите ваш вопрос или пожелания..."
                value={appointmentData.comment}
                onChange={(e) => handleFieldChange('comment')(e.target.value)}
            />
            {error && (
                <div className="text-red-500 font-p-md text-center" role="alert" aria-live="assertive">
                    {error}
                </div>
            )}
            <Button
                theme="blue"
                size={isMobile ? 'small' : 'large'}
                onClick={handleSubmit}
                disabled={loading || !appointmentData.date || !appointmentData.timeStart}
                text={loading ? 'Создание записи...' : 'Записаться'}
                aria-label={loading ? 'Создание записи на прием' : 'Подтвердить запись на прием'}
            />
        </div>
    )
}