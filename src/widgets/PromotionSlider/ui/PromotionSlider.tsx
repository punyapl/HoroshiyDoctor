import { useState, useEffect, JSX } from 'react';
import { getCachedServices, } from '@/shared/api';
import { PromotionCard } from '@/widgets/PromotionCard/ui/PromotionCard';
import { Carousel } from '@/shared/ui/Carousel';
import { Service } from '@/entities/Service/types';
import { useModal } from '@/shared/hooks/useModal';
import { SignUpModal } from '@/widgets/SignUpModal';


export const PromotionSlider = () => {
    const formModal = useModal()
    
    const [promotions, setPromotions] = useState<JSX.Element[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedService, setSelectedService] = useState<Service| undefined>(undefined)

    const handleOpenModal = (service: Service) => {
        setSelectedService(service)
        formModal.open()
    }

    useEffect(() => {
        setIsLoading(true);
        getCachedServices({ page: 1, limit: 8, search: 'акция' })
            .then(res => {
                if (res.status === 'success') {
                    setPromotions(res.data.list.map((promo, index) => <PromotionCard data={promo} key={index} onButtonClick={() => handleOpenModal(promo)}/>));
                }
            })
            .catch(() => setError('Ошибка при загрузке. Попробуйте позже'))
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) return <div className="text-center py-10">Загрузка...</div>;
    if (error) return <div className="text-center py-10">{error}</div>;
    if (promotions.length === 0) return <div className="text-center py-10">Акции не найдены. Попробуйте позже</div>;

    return (
        <div>
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
            {promotions.length > 0 && !isLoading && !error && (
                <Carousel
                    items={promotions}
                    desktopPageSize={2}
                    tabletPageSize={1}
                    mobilePageSize={1}
                    aria-label="Список врачей клиники"
                    role="region"
                />
            )}
            {promotions.length === 0 && !isLoading && !error && (
                <div
                    className="text-center py-10"
                    role="status"
                    aria-live="polite"
                    aria-label="Врачи не найдены"
                >
                    <p className="text-gray-500 text-lg">Врачи не найдены. Попробуйте позже</p>
                </div>
            )}
            <SignUpModal isOpen={formModal.show} onClose={formModal.close} appointmentData={selectedService} />
        </div>
    );
};
