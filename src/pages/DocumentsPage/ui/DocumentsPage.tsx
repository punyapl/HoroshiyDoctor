import { Page, } from '@/widgets/Page'
import { Section, } from '@/shared/ui/Section'
import { TextBanner, } from '@/shared/ui/TextBanner'
import { DocumentList, } from '@/widgets/PageSections'
import { Helmet } from 'react-helmet-async'

const DocumentsPage = () => {
    return (
        <>
            <Helmet>
                <title>Документы и лицензии клиники | Хороший Доктор</title>
                <meta 
                    name="description" 
                    content="Лицензии и нормативные документы, регламентирующие деятельность медицинского центра." 
                />
                <meta 
                    name="keywords" 
                    content="" 
                />
            </Helmet>
            
            <Page>
                <Section
                    SectionClassName="py-12 max-xl:p-[34px] max-md:py-6 max-md:px-2.5"
                    role="region"
                    aria-labelledby="documents-heading"
                >
                    <TextBanner
                        type="h1"
                        variant="light"
                        headerText="Нормативные документы"
                        subheaderText="Документы, регламентирующие деятельность клиники"
                        id="documents-heading"
                    />
                </Section>
                <DocumentList />
            </Page>
        </>
    )
}
export default DocumentsPage