import { Link, } from 'react-router-dom'
import { getRouteDoctors, } from '@/shared/const/router'
import { useDevice, } from '@/shared/hooks/useDevice'
import { Button, } from '@/shared/ui/Button'
import { Section, } from '@/shared/ui/Section'
import { Carousel, } from '@/shared/ui/Carousel'
import { TextBanner, } from '@/shared/ui/TextBanner'
import { DoctorCard, } from '@/widgets/DoctorCard'
import { JSX, useEffect, useState } from 'react'
import { getDoctors } from '@/shared/api'
import { useModal } from '@/shared/hooks/useModal'
import { SignUpModal } from '@/widgets/SignUpModal'
import { Doctor } from '@/entities/Doctor/types'

export const Doctors = () => {
    const { isMobile, } = useDevice()

    const [renderList, setRenderList] = useState<JSX.Element[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>()

    const doctorsToHide = ["лабораторные исследования", "врач функциональной диагностики"]

    const getDoctorsInfo = async () => {
        setIsLoading(true)
        await getDoctors({ page: 1, limit: 15 })
            .then((res) => {
                if (res.status === 'success') {
                    let filteredDoctors = res.data.list.filter(doctor =>
                        doctorsToHide.includes(doctor.name.trim().toLowerCase()) === false
                    );
                    setRenderList(filteredDoctors.map((doc, index) => <DoctorCard key={index} data={doc} onButtonClick={() => formModal.open(doc)} className='w-min min-h-[473px] max-md:min-h-[376px]' />))
                }
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const formModal = useModal<Doctor>();

    useEffect(() => {
        getDoctorsInfo()
    }, [])

    return (
        <Section
            SectionClassName="py-12 max-xl:p-[34px] max-md:py-6 max-md:px-2.5"
            ContainerClassName="flex flex-col gap-8 max-md:gap-5"
            role="region"
            aria-labelledby="doctors-section-heading"
        >
            <TextBanner
                type="h2"
                variant="light-blue"
                headerText="Врачи"
                subheaderText="Опытные специалисты с многолетней практикой"
                id="doctors-section-heading"
            />
            {isLoading && (
                <div
                    className="text-center py-10"
                    role="status"
                    aria-live="polite"
                    aria-label="Загрузка списка врачей"
                >
                    <p className="text-gray-500 text-lg">Загрузка...</p>
                </div>
            )}
            {error && (
                <div
                    className="text-center py-10"
                    role="alert"
                    aria-live="assertive"
                    aria-label="Ошибка при загрузке врачей"
                >
                    <p className="text-gray-500 text-lg">Ошибка при загрузке. Попробуйте позже</p>
                </div>
            )}
            {renderList.length > 0 && !isLoading && !error && (
                <Carousel
                    items={renderList}
                    desktopPageSize={4}
                    tabletPageSize={2}
                    mobilePageSize={1}
                    aria-label="Список врачей клиники"
                    role="region"
                    className='max-w-[1248px] w-full'
                />
            )}
            {renderList.length === 0 && !isLoading && !error && (
                <div
                    className="text-center py-10"
                    role="status"
                    aria-live="polite"
                    aria-label="Врачи не найдены"
                >
                    <p className="text-gray-500 text-lg">Врачи не найдены. Попробуйте позже</p>
                </div>
            )}
            <Link
                to={getRouteDoctors()}
                className="self-center"
                aria-label="Посмотреть всех врачей клиники"
            >
                <Button
                    theme="blue"
                    text="Все врачи"
                    size={isMobile ? 'small' : 'large'}
                />
            </Link>
            <SignUpModal isOpen={formModal.show} onClose={formModal.close} specialistData={formModal.item} />
        </Section>
    )
}