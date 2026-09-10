import { Link, } from 'react-router-dom'
import { getRouteServices, } from '@/shared/const/router'
import { useDevice, } from '@/shared/hooks/useDevice'
import { useModal, } from '@/shared/hooks/useModal'
import { Button, } from '@/shared/ui/Button'
import { Section, } from '@/shared/ui/Section'
import { Carousel, } from '@/shared/ui/Carousel'
import { TextBanner, } from '@/shared/ui/TextBanner'
import { ServiceCard, } from '@/widgets/ServiceCard'
import { SignUpModal, } from '@/widgets/SignUpModal'
import { JSX, useEffect, useState } from 'react'
import { getCachedServices } from '@/shared/api'
import { Service } from '@/entities/Service/types'

export const Services = () => {
    const { isMobile, } = useDevice()
    const formModal = useModal()

    const [renderList, setRenderList] = useState<JSX.Element[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>()
    const [selectedService, setSelectedService] = useState<Service| undefined>(undefined)

    const handleOpenModal = (service: Service) => {
        setSelectedService(service)
        formModal.open()
    }

    const getServicesInfo = async () => {
        setIsLoading(true)
        await getCachedServices({ page: 1, limit: 16, exclude: 'акция' })
            .then((res) => {
                if (res.status === 'success') {
                    setRenderList(res.data.list.map((service, index) => <ServiceCard key={index} data={service} onButtonClick={() => handleOpenModal(service)} />))
                }
            })
            .catch((err) => {
                setError(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getServicesInfo()
    }, [])

    return (
        <Section
            SectionClassName="py-12 max-xl:p-[34px] max-md:py-6 max-md:px-2.5"
            ContainerClassName="flex flex-col gap-8 max-md:gap-5"
            role="region"
            aria-labelledby="services-section-heading"
        >
            <TextBanner
                type="h2"
                variant="white"
                headerText="Услуги"
                subheaderText="Мы создали современную клинику, где каждый пациент получает качественную медицинскую помощь в комфортной атмосфере"
                id="services-section-heading"
            />
            {isLoading && (
                <div
                    className="text-center py-10"
                    role="status"
                    aria-live="polite"
                    aria-label="Загрузка списка услуг"
                >
                    <p className="text-gray-500 text-lg">Загрузка...</p>
                </div>
            )}
            {error && (
                <div
                    className="text-center py-10"
                    role="alert"
                    aria-live="assertive"
                    aria-label="Ошибка при загрузке услуг"
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
                    aria-label="Список услуг клиники"
                    role="region"
                />
            )}
            {renderList.length === 0 && !isLoading && !error && (
                <div
                    className="text-center py-10"
                    role="status"
                    aria-live="polite"
                    aria-label="Услуги не найдены"
                >
                    <p className="text-gray-500 text-lg">Услуги не найдены. Попробуйте позже</p>
                </div>
            )}
            <Link
                to={getRouteServices()}
                className="self-center"
                aria-label="Посмотреть все услуги клиники"
            >
                <Button
                    theme="blue"
                    text="Все услуги"
                    size={isMobile ? 'small' : 'large'}
                    className="self-center"
                />
            </Link>
            <SignUpModal isOpen={formModal.show} onClose={formModal.close} appointmentData={selectedService} />
        </Section>
    )
}