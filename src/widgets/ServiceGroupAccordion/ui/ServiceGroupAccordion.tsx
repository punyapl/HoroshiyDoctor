import ChevronDown from '@/shared/assets/icons/ChevronDown.svg';
import { ServiceCard } from '@/widgets/ServiceCard';
import { ServiceSubgroupAccordion } from '@/widgets/ServiceSubgroupAccordion';
import { Button } from '@/shared/ui/Button';
import { Service, ServiceGroup } from '@/entities/Service/types';
import { Icon } from '@/shared/ui/Icon';
import { useDevice } from '@/shared/hooks/useDevice';

interface ServiceGroupAccordionProps {
    group: ServiceGroup;
    isOpen: boolean;
    services?: {
        items?: Service[];
        hasMore?: boolean;
        isLoading?: boolean;
        subgroups?: {
            [subgroupId: string]: {
                items: Service[];
                hasMore: boolean;
                isLoading: boolean;
            };
        };
    };
    openSubgroupIds: Set<string>;
    onToggle: () => void;
    onToggleSubgroup?: (subgroupId: string) => void;
    onLoadMore: () => void;
    onLoadMoreSubgroup?: (subgroupId: string) => void;
    onServiceClick: (service: Service) => void;
}

export const ServiceGroupAccordion = ({
    group,
    isOpen,
    services,
    openSubgroupIds,
    onToggle,
    onToggleSubgroup,
    onLoadMore,
    onLoadMoreSubgroup,
    onServiceClick,
}: ServiceGroupAccordionProps) => {
    const { isMobile } = useDevice();

    return (
        <div className="border border-border rounded-[10px] overflow-hidden bg-background">
            {/* Заголовок группы */}
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-3 max-md:px-2.5 py-6 max-md:py-4 cursor-pointer hover:bg-background-secondary transition-colors"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-3">
                    <h6 className="font-h6 text-text-main text-left max-md:w-min line-clamp-2">
                        {group.name}
                    </h6>
                    <span className="text-sm text-text-secondary">
                        ({group.servicesCount || group.event_type_count || 0})
                    </span>
                </div>
                <Icon
                    Svg={ChevronDown}
                    width={24}
                    height={24}
                    className={`
                        stroke-3 stroke-primary transform 
                        transition-transform duration-300 
                        ${isOpen ? 'rotate-180' : ''}
                    `}
                />
            </button>

            {/* Содержимое группы */}
            {isOpen && (
                <div className="p-5 max-md:p-2 pt-0 border-t border-border">
                    {/* Если у группы ЕСТЬ подгруппы */}
                    {group.hasSubgroups && group.subgroups ? (
                        <div className="flex flex-col gap-4 mt-4">
                            {group.subgroups.map((subgroup) => {
                                const subgroupKey = `${group.id}-${subgroup.id}`;
                                const isSubgroupOpen = openSubgroupIds.has(subgroupKey);
                                
                                return (
                                    <ServiceSubgroupAccordion
                                        key={subgroup.id}
                                        subgroup={subgroup}
                                        isOpen={isSubgroupOpen}
                                        services={services?.subgroups?.[subgroup.id]}
                                        onToggle={() => onToggleSubgroup?.(subgroup.id)}
                                        onLoadMore={() => onLoadMoreSubgroup?.(subgroup.id)}
                                        onServiceClick={onServiceClick}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <>
                            {!services?.items ? (
                                <div className="text-center py-10">
                                    <p className="text-gray-500">Загрузка...</p>
                                </div>
                            ) : services.items.length === 0 && !services.isLoading ? (
                                <div className="text-center py-10">
                                    <p className="text-gray-500">Нет доступных услуг</p>
                                </div>
                            ) : (
                                <>
                                    {services.items.length === 0 && services.isLoading ? (
                                        <div className="text-center py-10">
                                            <p className="text-gray-500">Загрузка...</p>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:justify-items-center gap-5 mt-5">
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
                                                <div className="text-center mt-5">
                                                    <p className="text-gray-500">Загрузка...</p>
                                                </div>
                                            )}

                                            {services.hasMore && !services.isLoading && (
                                                <div className="flex justify-center mt-5">
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
                        </>
                    )}
                </div>
            )}
        </div>
    );
};
