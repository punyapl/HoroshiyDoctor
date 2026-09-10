import { Page, } from '@/widgets/Page'
import { AboutBanner, AboutClinic, Doctors, FAQ, Services, Promotions } from '@/widgets/PageSections'
import { Helmet } from 'react-helmet-async'

const MainPage = () => {
    return (
        <>
            <Helmet>
                <title>Медицинский центр в Новосибирске | Хороший Доктор</title>
                <meta 
                    name="description" 
                    content="Медцентр в Новосибирске на левом берегу. УЗИ экспертного класса, анализы, прием врачей. Акции и недорогие цены." 
                />
                <meta 
                    name="keywords" 
                    content="УЗИ новосибирск, Медцентр, Медицинский центр, Клиника, узи экспертного класса, узи новосибирск левый берег, узи новосибирск акции, узи новосибирск недорого, узи новосибирск хороший доктор" 
                />
            </Helmet>
            
            <Page groundVisibility={false}>
                <AboutBanner />
                <Promotions />
                <AboutClinic />
                <Doctors />
                <Services />
                <FAQ />
            </Page>
        </>
    )
}

export default MainPage