import { Section, } from "@/shared/ui/Section";
import { TextBanner, } from "@/shared/ui/TextBanner";
import { Page, } from "@/widgets/Page";
import { Reviews } from "@/widgets/PageSections";

const ReviewsPage = () => {
    return (
        <Page>
            <Section
                SectionClassName="py-12 max-xl:px-8 max-md:py-8 max-md:px-2.5"
                role="region"
                aria-labelledby="reviews-heading"
            >
                <TextBanner
                    type="h1"
                    variant="light"
                    headerText="Отзывы"
                    id="reviews-heading"
                />
            </Section>
            <Reviews />
        </Page>
    )
};
export default ReviewsPage;