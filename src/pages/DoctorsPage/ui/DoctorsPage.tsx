import { Page, } from '@/widgets/Page'
import { Section, } from '@/shared/ui/Section'
import { TextBanner, } from '@/shared/ui/TextBanner'
import { DoctorList, } from '@/widgets/PageSections'
import { Helmet } from 'react-helmet-async'

const DoctorsPage = () => {
    return (
        <>
            <Helmet>
                <title>Врачи: гинеколог, терапевт, педиатр в Новосибирске | Хороший Доктор</title>
                <meta 
                    name="description" 
                    content="Опытные врачи медицинского центра: гинеколог, терапевт, педиатр. Хороший доктор УЗИ с многолетней практикой." 
                />
                <meta 
                    name="keywords" 
                    content="гинеколог, терапевт, педиатр, узи хороший доктор" 
                />
            </Helmet>
            
            <Page>
                <Section
                    SectionClassName="py-12 max-xl:p-[34px] max-md:py-6 max-md:px-2.5 "
                    role="region"
                    aria-labelledby="doctors-heading"
                >
                    <TextBanner
                        type="h1"
                        variant="light"
                        headerText="Наши врачи"
                        subheaderText="Команда опытных специалистов с многолетней практикой"
                        id="doctors-heading"
                    />
                </Section>
                <DoctorList />
            </Page>
        </>
    )
}
export default DoctorsPage