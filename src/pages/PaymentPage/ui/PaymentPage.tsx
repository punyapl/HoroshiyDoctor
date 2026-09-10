import { Section } from "@/shared/ui/Section";
import { TextBanner } from "@/shared/ui/TextBanner";
import { Page } from "@/widgets/Page";
import { PaymentInfo } from "@/widgets/PageSections";

const PaymentPage = () => {
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
                    headerText="Способы оплаты"
                    id="legal-info-heading"
                />
            </Section>
            <PaymentInfo />
        </Page>
    );
};
export default PaymentPage;
