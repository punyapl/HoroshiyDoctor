import ChevronDown from '@/shared/assets/icons/ChevronDown.svg';
import { ServiceCard } from '@/widgets/ServiceCard';
import { Button } from '@/shared/ui/Button';
import { Service } from '@/entities/Service/types';
import { Icon } from '@/shared/ui/Icon';
import { useDevice } from '@/shared/hooks/useDevice';

interface ServiceSubgroupAccordionProps {
    subgroup: {
        id: string;
        name: string;
        servicesCount: number;
    };
    isOpen: boolean;
    services?: {
        items: Service[];
        hasMore: boolean;
        isLoading: boolean;
    };
    onToggle: () => void;
    onLoadMore: () => void;
    onServiceClick: (service: Service) => void;
}

export const ServiceSubgroupAccordion = ({
    subgroup,
    isOpen,
    services,
    onToggle,
    onLoadMore,
    onServiceClick,
}: ServiceSubgroupAccordionProps) => {
    const { isMobile } = useDevice();

    return (
        <div className="border border-border rounded-[10px] overflow-hidden bg-background-secondary ml-5 max-md:ml-2">
            {/* Заголовок подгруппы */}
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-3 max-md:px-2.5 py-4 max-md:py-3 cursor-pointer"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-3">
                    <span className="font-semibold text-text-main text-left max-md:w-min line-clamp-2">
                        {subgroup.name}
                    </span>
                    <span className="text-sm text-text-secondary">
                        ({subgroup.servicesCount})
                    </span>
                </div>
                <Icon
                    Svg={ChevronDown}
                    width={20}
                    height={20}
                    className={`
                        stroke-3 stroke-primary transform 
                        transition-transform duration-300 
                        ${isOpen ? 'rotate-180' : ''}
                    `}
                />
            </button>

            {/* Содержимое подгруппы */}
            {isOpen && (
                <div className="p-4 max-md:p-2 pt-0 border-t border-border">
                    {!services ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500 text-sm">Загрузка...</p>
                        </div>
                    ) : services.items.length === 0 && !services.isLoading ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500 text-sm">Нет доступных услуг</p>
                        </div>
                    ) : (
                        <>
                            {services.items.length === 0 && services.isLoading ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 text-sm">Загрузка...</p>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:justify-items-center gap-4 mt-4">
                                        {services.items.map((service) => (
                                            <ServiceCard
                                                key={service.id}
                                                data={service}
                                                variant="moreInfo"
                                                onButtonClick={() => onServiceClick(service)}
                                            />
                                        ))}
                                    </div>

                                    {services.isLoading && services.items.length > 0 && (
                                        <div className="text-center mt-4">
                                            <p className="text-gray-500 text-sm">Загрузка...</p>
                                        </div>
                                    )}

                                    {services.hasMore && !services.isLoading && (
                                        <div className="flex justify-center mt-4">
                                            <Button
                                                theme="light-blue"
                                                onClick={onLoadMore}
                                                size={isMobile ? 'small' : 'regular'}
                                                text="Загрузить ещё"
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
