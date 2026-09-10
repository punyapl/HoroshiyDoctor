import { Section, } from '@/shared/ui/Section'
import { TextBanner, } from '@/shared/ui/TextBanner'
import { PromotionSlider } from '@/widgets/PromotionSlider'

export const Promotions = () => {
    return (
        <Section
            SectionClassName="py-12 max-xl:p-[34px] max-md:py-6 max-md:px-2.5 bg-background"
            ContainerClassName="flex flex-col gap-8 max-md:gap-5"
            role="region"
            aria-labelledby="promotions-section-heading"
        >
            <TextBanner
                type="h2"
                variant="white"
                headerText="Наши акции"
                id="promotions-section-heading"
            />
            <PromotionSlider />
        </Section>
    )
}