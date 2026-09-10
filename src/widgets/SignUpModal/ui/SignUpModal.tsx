import { Doctor } from '@/entities/Doctor/types';
import { Service } from '@/entities/Service/types';
import { Step } from '@/features/SignUpForm/types/form';
import { SignUpForm, } from '@/features/SignUpForm/ui'
import { useDevice, } from '@/shared/hooks/useDevice';
import { Modal, ModalProps, } from '@/shared/ui/Modal'
import { useState } from 'react';

type SignUpModalProps = Omit<ModalProps, 'children'> & {
    appointmentData?: Service;
    specialistData?: Doctor;
};

export const SignUpModal = (props: SignUpModalProps) => {
    const { appointmentData, specialistData, } = props
    const { isMobile, } = useDevice()
    const [step, setStep] = useState<Step>('contactInfo')

    const handleBackButtonClick = () => {
        if (step === 'appointmentInfo') {
            setStep('contactInfo')
        }
    }

    const getModalTitle = () => {
        switch (step) {
            case 'contactInfo':
                return 'Контактная информация'
            case 'appointmentInfo':
                return 'Информация о записи'
            case 'result':
                return ''
            default:
                break;
        }
    }

    const handleCloseModal = () => {
        setStep('contactInfo')
        props.onClose();
    }

    return (
        <Modal
            isOpen={props.isOpen}
            onClose={handleCloseModal}
            onBackButtonClick={step === 'appointmentInfo' ? handleBackButtonClick : undefined}
            title={getModalTitle()}
            size={isMobile ? 'sm' : 'lg'}
        >
            <SignUpForm key={props.isOpen ? 'open' : 'closed'} step={step} setStep={setStep} appointmentData={appointmentData} specialistData={specialistData} />
        </Modal>
    )
}