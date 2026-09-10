import { Section, } from "@/shared/ui/Section";
import { TextBanner, } from "@/shared/ui/TextBanner";
import { Page, } from "@/widgets/Page";
import { LinkList, } from "@/widgets/PageSections";

const LinksPage = () => {
    return (
        <Page>
            <Section
                SectionClassName="py-12 max-xl:px-8 max-md:py-8 max-md:px-2.5"
                role="region"
                aria-labelledby="links-heading"
            >
                <TextBanner
                    type="h1"
                    variant="light"
                    headerText="Полезные ссылки"
                    id="links-heading"
                />
            </Section>
            <LinkList />
        </Page>
    )
};
export default LinksPage;
