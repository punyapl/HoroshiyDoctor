import Ruble from '@/shared/assets/icons/Ruble.svg'
import Heart from '@/shared/assets/icons/Heart.svg'
import ShieldCheck from '@/shared/assets/icons/ShieldCheck.svg'
import UserGroup from '@/shared/assets/icons/UserGroup.svg'
import { IconCard, } from '@/shared/ui/IconCard'
import { Section, } from '@/shared/ui/Section'
import { TextBanner, } from '@/shared/ui/TextBanner'

export const AboutClinic = () => {
    const clinicFacts = [
        {
            icon: UserGroup,
            titleText: 'Опытные врачи',
            paragraphText: 'Наши специалисты имеют высокую квалификацию и большой практический опыт, чтобы заботиться о вашем здоровье на каждом этапе.',
        },
        {
            icon: Ruble,
            titleText: 'Доступные цены',
            paragraphText: 'Прозрачная стоимость и гибкие программы обследования делают качественную медицину доступной для всей семьи.',
        },
        {
            icon: Heart,
            titleText: 'Комфортная атмосфера',
            paragraphText: 'Уютные кабинеты и внимательный персонал помогут чувствовать себя спокойно и уверенно во время визита.',
        },
        {
            icon: ShieldCheck,
            titleText: 'Современное оборудование',
            paragraphText: 'Мы используем новое медицинское оборудование и технологии, чтобы обеспечить точную диагностику и эффективное лечение',
        },
    ]

    return (
        <Section
            SectionClassName="pb-12 max-xl:pb-[34px] max-md:pb-6"
            ContainerClassName="flex flex-col gap-8 max-md:gap-5"
            role="region"
            aria-labelledby="about-clinic-heading"
        >
            <TextBanner
                type="h2"
                variant="white"
                headerText="О нас"
                subheaderText="Мы создали современный медицинский центр, где каждый пациент получает качественную медицинскую помощь в комфортной атмосфере"
                id="about-clinic-heading"
            />

            <div
                className="flex flex-wrap max-md:flex-nowrap max-md:flex-col gap-2.5 pt-[30px] gap-y-10 justify-center max-xl:max-w-[700px] max-xl:self-center"
                role="list"
                aria-label="Факты о клинике"
            >
                {clinicFacts.map((fact, index) => (
                    <IconCard
                        key={index}
                        icon={fact.icon}
                        titleText={fact.titleText}
                        paragraphText={fact.paragraphText}
                        role="listitem"
                    />
                ))}
            </div>
        </Section>
    )
}