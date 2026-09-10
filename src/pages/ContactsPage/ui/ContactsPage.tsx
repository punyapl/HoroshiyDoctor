import { Page, } from '@/widgets/Page'
import { Section, } from '@/shared/ui/Section'
import { TextBanner, } from '@/shared/ui/TextBanner'
import { ContactsInfo, } from '@/widgets/PageSections'
import { Helmet } from 'react-helmet-async'

const ContactsPage = () => {
    return (
        <>
            <Helmet>
                <title>Контакты медицинского центра в Новосибирске | Хороший Доктор</title>
                <meta 
                    name="description" 
                    content="Контакты клиники в Новосибирске. Адрес, телефон для записи, режим работы." 
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
                    aria-labelledby="contacts-heading"
                >
                    <TextBanner
                        type="h1"
                        variant="light"
                        headerText="Контакты"
                        subheaderText="Как с нами связаться и где нас найти"
                        id="contacts-heading"
                    />
                </Section>
                <ContactsInfo />
            </Page>
        </>
    )
}
export default ContactsPage