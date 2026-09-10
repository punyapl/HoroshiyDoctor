import { useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { TextInput } from '@/shared/ui/TextInput'
import { getPatient, } from '@/shared/api'
import type { Patient } from '../../types'
import { PhoneInput } from '@/shared/ui/PhoneInput'
import { Checkbox } from '@/shared/ui/Checkbox'

interface ContactInfoFormProps {
    onSubmit: (data: Patient) => void
    initialData: Patient | null
}

type PatientStatus = 'unknown' | 'existing' | 'new' | 'not-found'

export const ContactInfoForm = (props: ContactInfoFormProps) => {
    const { onSubmit, initialData } = props

    const [patientStatus, setPatientStatus] = useState<PatientStatus>('unknown')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState<Patient>(
        initialData || {
            phone: '',
            lastname: '',
            firstname: '',
            middlename: '',
            birthday: '',
        }
    )
    const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false)

    const handleInputChange = (field: keyof Patient) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }))
    }

    const handlePhoneChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            phone: value
        }))
    }

    const handlePatientStatusChange = (status: 'existing' | 'new') => {
        setPatientStatus(status)
        setError(null)
    }

    const handlePhoneSubmit = async () => {
        setLoading(true)
        setError(null)

        await getPatient({ phone: formData.phone })
            .then((res) => {
                if ('data' in res) {
                    if ('message' in res.data) {
                        setPatientStatus('not-found')
                        setError('Данные не найдены. Пожалуйста, введите свои данные')
                    } else {
                        const patientResponse = res.data;
                        onSubmit({
                            id: patientResponse.id,
                            phone: formData.phone,
                            lastname: patientResponse.lastname,
                            firstname: patientResponse.firstname,
                            middlename: patientResponse.middlename,
                            birthday: patientResponse.birthday,
                        })
                    }
                }
            })
            .catch((err) => {
                setPatientStatus('not-found')
                setError('Данные не найдены. Пожалуйста, введите свои данные')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleNewPatientSubmit = () => {
        onSubmit(formData)
    }

    return (
        <div className="flex flex-col gap-5" role="form" aria-label="Контактная информация клиента">
            <div className="flex flex-col items-center gap-5" role="group" aria-labelledby="patient-status-question">
                <p id="patient-status-question" className='font-p-lg text-text-main'>Вы уже были в нашей клинике?</p>
                <div className="flex gap-5" role="radiogroup" aria-labelledby="patient-status-question">
                    <Button
                        theme={patientStatus === 'existing' ? 'blue' : 'light-blue'}
                        onClick={() => handlePatientStatusChange('existing')}
                        text="Да"
                        role="radio"
                        aria-checked={patientStatus === 'existing'}
                        aria-label="Да, я уже был(а) в клинике"
                    />
                    <Button
                        theme={patientStatus === 'new' ? 'blue' : 'light-blue'}
                        onClick={() => handlePatientStatusChange('new')}
                        text="Нет"
                        role="radio"
                        aria-checked={patientStatus === 'new'}
                        aria-label="Нет, я новый пациент"
                    />
                </div>
            </div>
            {patientStatus === 'existing' && (
                <div className="flex flex-col gap-5" role="region" aria-labelledby="existing-patient-heading">
                    <h3 id="existing-patient-heading" className="sr-only">Информация для существующих пациентов</h3>
                    <PhoneInput
                        label="Телефон"
                        required
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        aria-required="true"
                    />
                    {error && (
                        <div className="text-red-500 font-p-md text-center" role="alert" aria-live="assertive">
                            {error}
                        </div>
                    )}
                    <Checkbox
                        label='Согласие с политикой конфиденциальности*'
                        required
                        aria-required="true"
                        checked={isCheckboxChecked}
                        onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                    />
                    <Button
                        theme="blue"
                        onClick={handlePhoneSubmit}
                        disabled={loading || !formData.phone || formData.phone.length < 11 || !isCheckboxChecked}
                        text={loading ? 'Поиск...' : 'Далее'}
                        aria-label={loading ? 'Поиск данных пациента' : 'Перейти к выбору времени приема'}
                    />
                </div>
            )}
            {(patientStatus === 'not-found' || patientStatus === 'new') && (
                <div className="flex flex-col gap-5" role="region" aria-labelledby="new-patient-heading">
                    <h3 id="new-patient-heading" className="sr-only">Информация для новых пациентов</h3>
                    {patientStatus === 'not-found' && (
                        <div className="text-red-500 font-p-md text-center" role="alert" aria-live="assertive">
                            {error}
                        </div>
                    )}
                    <TextInput
                        label="Фамилия"
                        required
                        value={formData.lastname}
                        onChange={handleInputChange('lastname')}
                        aria-required="true"
                    />
                    <TextInput
                        label="Имя"
                        required
                        value={formData.firstname}
                        onChange={handleInputChange('firstname')}
                        aria-required="true"
                    />
                    <PhoneInput
                        label="Телефон"
                        required
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        aria-required="true"
                    />
                    <Checkbox
                        label='Согласие с политикой конфиденциальности*'
                        required
                        aria-required="true"
                        checked={isCheckboxChecked}
                        onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                    />
                    <Button
                        theme="blue"
                        onClick={handleNewPatientSubmit}
                        disabled={!formData.lastname || !formData.firstname || !formData.phone || formData.phone.length < 11 || !isCheckboxChecked}
                        text="Далее"
                        aria-label="Перейти к выбору времени приема"
                    />
                </div>
            )}
        </div>
    )
}