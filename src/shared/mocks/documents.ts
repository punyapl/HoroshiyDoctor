import pdfPlaceholder from '@/shared/assets/documents/pdfPlaceholder.pdf'
import federalLaw323fzHealthcareBasics from '@/shared/assets/documents/federalLaw323fzHealthcareBasics.pdf'
import citizenRightsDutiesHealthcare from '@/shared/assets/documents/citizenRightsDutiesHealthcare.pdf'

import licenseExtract from '@/shared/assets/documents/licenseExtract.pdf'
import SEZ from '@/shared/assets/documents/SEZ.pdf'

import USRLEExtract from '@/shared/assets/documents/USRLEExtract.pdf'

import priceList from '@/shared/assets/documents/priceList.pdf'
import admissionRules from '@/shared/assets/documents/admissionRules.pdf'
import serviceAgreement from '@/shared/assets/documents/serviceAgreement.pdf'

// import workSchedule from '@/shared/assets/documents/workSchedule.pdf'
import specialistsInfo from '@/shared/assets/documents/specialistsInfo.pdf'

import MCAccessibilityQualityIndicators from '@/shared/assets/documents/MCAccessibilityQualityIndicators.pdf'

import privacyPolicy from '@/shared/assets/documents/privacyPolicy.pdf'
import essentialDrugs from '@/shared/assets/documents/essentialDrugs.pdf'
import discountedDrugsNSO from '@/shared/assets/documents/discountedDrugsNSO.pdf'
import discountedDrugs from '@/shared/assets/documents/discountedDrugs.pdf'


export const Documents = [
    {
        label: 'Регламентирующие документы',
        docs: [
            {
                label: 'Федеральный закон от 21.11.2011 N 323-ФЗ (ред. от 03.07.2016) "Об основах охраны здоровья граждан в Российской Федерации"',
                document: federalLaw323fzHealthcareBasics,
            },
            {
                label: 'Права и обязанности граждан в сфере охраны здоровья (ФЗ от 21.11.2011 N 323-ФЗ (ред. от 03.07.2016) "Об основах охраны здоровья граждан в Российской Федерации")',
                document: citizenRightsDutiesHealthcare,
            },
            //Выдержки из программы государственных гарантий
        ]
    },
    {
        label: 'Лицензии на осуществляемые виды деятельности',
        docs: [
            {
                label: 'Выписка из реестра лицензий',
                document: licenseExtract,
            },
            {
                label: 'Санитарно-эпидемиологическое заключение',
                document: SEZ,
            },
        ]
    },
    {
        label: 'Реквизиты организации',
        docs: [
            {
                label: 'Выписка из ЕГРЮЛ/ЕГРИП',
                document: USRLEExtract,
            },
        ]
    },
    {
        label: 'Платные услуги',
        docs: [
            {
                label: 'Прайс-лист',
                document: priceList,
            },
            {
                label: 'Правила записи на первичный прием',
                document: admissionRules,
            },
            //Правила предоставления платных услуг
            {
                label: 'Типовая форма договора на платные услуги',
                document: serviceAgreement,
            },
        ]
    },
    // {
    //     label: 'Для пациентов',
    //     docs: [
    //         //Правила внутреннего распорядка
    //     ]
    // },
    {
        label: 'Специалисты',
        docs: [
            {
                label: 'Информация о специалистах',
                document: specialistsInfo,
            },
            // {
            //     label: 'График работы специалистов',
            //     document: workSchedule,
            // },specialistsInfo
            //Копии дипломов и сертификатов врачей
            //Сведения об аккредитации специалистов
            //Письменное согласие врача на публикацию персональных данных
        ]
    },
    {
        label: 'Качество услуг',
        docs: [
            {
                label: 'Показатели доступности и качества медицинской помощи',
                document: MCAccessibilityQualityIndicators,
            },
            //Результаты независимой оценки качества (НОК)
        ]
    },
    {
        label: 'Юридические документы',
        docs: [
            {
                label: 'Политика обработки персональных данных',
                document: privacyPolicy,
            },
            //Сведения о противодействии коррупции
        ]
    },
    {
        label: 'Лекарственное обеспечение',
        docs: [
            {
                label: 'Перечень ЖНВЛП',
                document: essentialDrugs,
            },
            {
                label: 'Перечни препаратов для региональных льготников',
                document: discountedDrugsNSO,
            },
            {
                label: 'Перечни препаратов для федеральных льготников',
                document: discountedDrugs,
            },
            //Перечень препаратов по решению врачебной комиссии
            //Препараты, отпускаемые бесплатно или со скидкой
        ]
    },
]