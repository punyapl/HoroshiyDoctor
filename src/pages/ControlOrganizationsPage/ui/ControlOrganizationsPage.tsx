import { Section, } from "@/shared/ui/Section";
import { TextBanner, } from "@/shared/ui/TextBanner";
import { Page, } from "@/widgets/Page";
import { ControlOrganizationList, } from "@/widgets/PageSections";

const ControlOrganizationsPage = () => {
    return (
        <Page>
            <Section
                SectionClassName="py-12 max-xl:px-8 max-md:py-8 max-md:px-2.5"
                role="region"
                aria-labelledby="control-organizations-heading"
            >
                <TextBanner
                    type="h1"
                    variant="light"
                    headerText="Контролирующие организации"
                    id="control-organizations-heading"
                />
            </Section>
            <ControlOrganizationList />
        </Page>
    )
};

export default ControlOrganizationsPage;
