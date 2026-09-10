import { useEffect, useState } from 'react'
import { ContactInfoForm } from '../ContactInfoForm/ContactInfoForm'
import { AppointmentInfoForm } from '../AppointmentInfoForm/AppointmentInfoForm'
import { ResultStep } from '../ResultStep/ResultStep'
import type { Patient, Appointment, } from '../../types'
import { createAppointment } from '@/shared/api'
import { CreateAppointmentRequest } from '@/shared/api/types'
import { Doctor } from '@/entities/Doctor/types'
import { Service } from '@/entities/Service/types'
import { Step } from '../../types/form'

type SignUpFormProps = {
    appointmentData?: Service;
    specialistData?: Doctor;
    step: Step;
    setStep: React.Dispatch<React.SetStateAction<Step>>;
}

export const SignUpForm = (props: SignUpFormProps) => {
    const {
        appointmentData: providedAppointmentData,
        specialistData: providedSpecialistData,
        step,
        setStep,
    } = props

    
    const [patientData, setPatientData] = useState<Patient | null>(null)
    const [appointmentData, setAppointmentData] = useState<Appointment>({
        serviceId: '',
        doctorId: '',
        date: '',
        timeStart: '',
        comment: ''
    })
    const [resultType, setResultType] = useState<'success' | 'error'>('error')

    const handleContactInfoSubmit = (data: Patient) => {
        setPatientData(data)
        setStep('appointmentInfo')
    }

    const handleAppointmentSubmit = async (
        appointmentData: Appointment,
        patientData: Patient | null
    ) => {
        if (!patientData) {
            console.error('Данные пациента отсутствуют')
            return
        }

        const requestData: CreateAppointmentRequest = {
            event: {
                event_type: parseInt(appointmentData.serviceId),
                specialist: parseInt(appointmentData.doctorId),
                date: appointmentData.date,
                time_start: appointmentData.timeStart,
            },
            client: {
                id: patientData.id,
                phone: patientData.phone,
                lastname: patientData.lastname,
                firstname: patientData.firstname,
                middlename: patientData.middlename,
                birthday: patientData.birthday,
            },
            comment: appointmentData.comment
        }

        await createAppointment(requestData)
            .then((res) => {
                setResultType('success')
            })
            .catch((err) => {
                console.error('Ошибка при создании записи:', err)
                setResultType('error')
            })
            .finally(() => {
                setStep('result')
            })
    }

    const stepRenderer = () => {
        switch (step) {
            case 'contactInfo':
                return (
                    <ContactInfoForm
                        onSubmit={handleContactInfoSubmit}
                        initialData={patientData}
                    />
                )
            case 'appointmentInfo':
                return (
                    <AppointmentInfoForm
                        onSubmit={handleAppointmentSubmit}
                        patientData={patientData}
                        appointmentData={appointmentData}
                        onAppointmentDataChange={setAppointmentData}
                        isAppointmentDataProvided={!!providedAppointmentData}
                        isSpecialistDataProvided={!!providedSpecialistData}
                    />
                )
            case 'result':
                return (
                    <ResultStep result={resultType} appointmentData={appointmentData} />
                )
            default:
                break
        }
    }

    useEffect(() => {
        if (providedAppointmentData) {
            setAppointmentData({
                ...appointmentData,
                serviceId: String(providedAppointmentData.id)
            })
        }
    }, [providedAppointmentData,])

    useEffect(() => {
        if (providedSpecialistData) {
            setAppointmentData({
                ...appointmentData,
                doctorId: String(providedSpecialistData.id)
            })
        }
    }, [providedSpecialistData,])

    return (
        <div className="signup-form-container" role="main" aria-label="Форма записи на прием">
            {stepRenderer()}
        </div>
    )
}