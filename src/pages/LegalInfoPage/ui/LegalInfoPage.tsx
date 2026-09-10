import { Section, } from "@/shared/ui/Section"
import { TextBanner, } from "@/shared/ui/TextBanner"
import { Page, } from "@/widgets/Page"
import { LegalInfo, } from "@/widgets/PageSections"

const LegalInfoPage = () => {
    return (
        <Page>
            <Section
                SectionClassName="py-12 max-xl:px-8 max-md:py-8 max-md:px-2.5"
                role="region"
                aria-labelledby="legal-info-heading"
            >
                <TextBanner
                    type="h1"
                    variant="light"
                    headerText="Юридические данные"
                    id="legal-info-heading"
                />
            </Section>
            <LegalInfo />
        </Page>
    )
}

export default LegalInfoPage