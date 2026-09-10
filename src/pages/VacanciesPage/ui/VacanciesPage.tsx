import { Section, } from "@/shared/ui/Section";
import { TextBanner, } from "@/shared/ui/TextBanner";
import { Page, } from "@/widgets/Page";

const VacanciesPage = () => {
    return (
        <Page>
            <Section
                SectionClassName="py-12 max-xl:px-8 max-md:py-8 max-md:px-2.5"
                role="region"
                aria-labelledby="vacancies-heading"
            >
                <TextBanner
                    type="h1"
                    variant="light"
                    headerText="Вакансии"
                    id="vacancies-heading"
                />
            </Section>
            <Section
                SectionClassName="py-12 max-xl:p-[34px] max-md:py-6 max-md:px-2.5"
                ContainerClassName="flex justify-between xl:items-center max-xl:flex-col-reverse max-xl:gap-8 max-md:gap-3"
                role="region"
                aria-label="Актуальные вакансии"
            >
                <p className="font-p-xl text-text-primary text-center w-full p-4 bg-background rounded-[20px]">
                    На текущий момент открытые вакансии отсутствуют.
                </p>
            </Section>
        </Page>
    )
};
export default VacanciesPage;