import { controlOrganizationList, } from '@/shared/mocks/controlOrganizationList'
import { Section, } from '@/shared/ui/Section'
import { ControlOrganizationCard, } from '@/widgets/ControlOrganizationCard'

export const ControlOrganizationList = () => {

    return (
        <Section
            SectionClassName="py-5 max-xl:p-8 max-md:py-6 max-md:px-2.5"
            ContainerClassName="flex flex-col gap-[25px] max-xl:gap-5 max-md:gap-3.5"
            role="region"
            aria-label="Список контролирующих организаций"
        >
            <div
                className="grid grid-cols-2 max-xl:grid-cols-1 gap-5 items-start"
                role="list"
                aria-label="Список контролирующих организаций"
            >
                {controlOrganizationList.map((org, index) => (
                    <div
                        key={index}
                        className="flex justify-center items-center"
                        role="listitem"
                    >
                        <ControlOrganizationCard
                            data={org}
                            className='max-w-full'
                        />
                    </div>
                ))}
            </div>
        </Section>
    )
}