import { FAQData, } from '@/shared/mocks/faq'
import { Accordion, } from '@/shared/ui/Accordion'
import { Section, } from '@/shared/ui/Section'
import { TextBanner, } from '@/shared/ui/TextBanner'

export const FAQ = () => {
    return (
        <Section
            SectionClassName="py-12 max-xl:p-[34px] max-md:py-6 max-md:px-2.5"
            ContainerClassName="flex flex-col gap-8 max-md:gap-5 items-center"
        >
            <TextBanner
                type="h2"
                variant="white"
                headerText="Часто задаваемые вопросы"
                subheaderText="Вопросы и ответы, которые вас могут заинтересовать"
            />
            <Accordion data={FAQData} />
        </Section>
    )
}