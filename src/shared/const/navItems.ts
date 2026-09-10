import { getRouteMain, getRouteServices, getRouteDoctors, getRouteContacts, getRouteDocuments, getRouteLegalInfo, getRouteLinks, getRouteOrganizations, getRoutePayment, getRouteReviews, getRouteVacancies, } from './router';

export const navItems = [
    { 
        path: getRouteMain(), 
        label: 'Главная', 
    },
    { 
        path: getRouteContacts(), 
        label: 'О нас',
        children: [
            { path: getRouteContacts(), label: 'Контакты', },
            { path: getRouteLegalInfo(), label: 'Юридические данные', },
            { path: getRouteOrganizations(), label: 'Контролирующие организации', },
            { path: getRouteLinks(), label: 'Полезные ссылки', },
            { path: getRouteReviews(), label: 'Отзывы', },
        ],
    },
    { 
        path: getRouteDoctors(), 
        label: 'Врачи',
        children: [
            { path: getRouteDoctors(), label: 'Все специалисты', },
            { path: getRouteVacancies(), label: 'Вакансии', },
        ],
    },
    { 
        path: getRouteServices(), 
        label: 'Услуги',
        children: [
            { path: getRouteServices(), label: 'Каталог услуг', },
            { path: getRoutePayment(), label: 'Способы оплаты', },
        ],
    },
    { 
        path: getRouteDocuments(), 
        label: 'Документы', 
    },
];