import BannerImage1 from '@/shared/assets/images/BannerImage1.png'
import BannerImage2 from '@/shared/assets/images/BannerImage2.png'
import BannerImage3 from '@/shared/assets/images/BannerImage3.png'
import BannerImage4 from '@/shared/assets/images/BannerImage4.png'
import BannerImage5 from '@/shared/assets/images/BannerImage5.png'

import UserGroup from '@/shared/assets/icons/UserGroup.svg'
import { getRouteDoctors } from '@/shared/const/router'
import { Banner } from '@/entities/Banner/types'

export const banners = <Banner[]>[
    {
        title: 'Точная диагностика – ясная картина',
        description: 'Проводим все виды УЗИ на аппарате экспертного класса Mindray Resona I9 Exp — быстро, комфортно, достоверно.',
        image: BannerImage1,
    },
    {
        title: 'Проверь здоровье печени без боли',
        description: 'Фиброэластометрия — современная альтернатива биопсии. Безоперационное исследование для оценки печени.',
        image: BannerImage2,
    },
    {
        title: 'Полная картина работы сердца',
        description: 'Современные методы диагностики сердечного ритма и артериального давления: ХОЛТЕР, СМАД, ЭКГ',
        image: BannerImage3,
    },
    {
        title: 'Опытные врачи для всей семьи',
        description: 'Консультация квалифицированного врача в уютной домашней обстановке. Мы работаем для вас!',
        image: BannerImage4,
        linkTo: getRouteDoctors(),
        buttonText: 'Все врачи',
        buttonIcon: UserGroup,
        buttonIconType: 'fill'
    },
    {
        title: 'Все анализы в одном месте',
        description: 'Мы сотрудничаем с ведущими лабораториями ЦЛД, ИНВИТРО и ХЕЛИКС. Надежные результаты, доступные цены, минимальные сроки.',
        image: BannerImage5,
    },
]