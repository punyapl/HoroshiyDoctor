import { Section, } from "@/shared/ui/Section";
import { TextBanner, } from "@/shared/ui/TextBanner";
import { Page, } from "@/widgets/Page";
import { InsuranceOrganizationList, } from "@/widgets/PageSections";

const InsurancePage = () => {
    return (
        <Page>
            <Section
                SectionClassName="py-12 max-xl:px-8 max-md:py-8 max-md:px-2.5 bg-linear-90 from-grad-start to-primary"
                role="region"
                aria-labelledby="legal-info-heading"
            >
                <TextBanner
                    type="h1"
                    variant="dark"
                    headerText="Страховые медицинские организации"
                    subheaderText="Перечень страховых медицинских организаций, с которыми заключены договоры на оказание и оплату медицинской помощи по обязательному медицинскому страхованию."
                    id="legal-info-heading"
                />
            </Section>
            <InsuranceOrganizationList />
        </Page>
    )
};
export default InsurancePage;
