import { Link, } from 'react-router-dom'
import privacyPolicy from '@/shared/assets/documents/privacyPolicy.pdf'
import TG from '@/shared/assets/icons/TG.svg'
import WA from '@/shared/assets/icons/WA.svg'
import LogoIcon from '@/shared/assets/icons/LogoIcon.svg'
import MapPin from '@/shared/assets/icons/MapPin.svg'
import Phone from '@/shared/assets/icons/Phone.svg'
import { navItems, } from '@/shared/const/navItems'
import { useDevice, } from '@/shared/hooks/useDevice'
import { Icon, } from '@/shared/ui/Icon'
import { Section, } from '@/shared/ui/Section'
import { Button } from '@/shared/ui/Button'

export const Footer = () => {
    const { isMobile, } = useDevice()

    const getLinkList = () => {
        const flat: { label: string; path: string }[] = [];

        navItems.forEach((item) => {
            // основной пункт
            if (!item.children) {
                flat.push({ label: item.label, path: item.path, });
            }

            // дети, если есть
            if (item.children && item.children.length > 0) {
                item.children.forEach((child) => flat.push({ label: child.label, path: child.path, }));
            }
        });

        return flat;
    }

    return (
        <Section
            SectionClassName="self-end bg-linear-to-r from-grad-start to-primary"
            ContainerClassName='w-full max-w-[1440px]'
        >
            <footer
                role="contentinfo"
                aria-label="Подвал сайта"
                className="flex flex-col max-w-[1440px] px-20 max-xl:px-[34px] 
                    max-md:px-2.5 py-[50px] max-xl:py-5 gap-2.5 max-xl:gap-5 max-md:gap-2.5"
            >
                <div className="flex gap-7 flex-wrap max-md:flex-col max-md:gap-4" role="region" aria-label="Контактная информация">
                    {/* Информация о клинике */}
                    <div className="flex flex-col gap-5 py-3 w-[278px] max-xl:w-[290px] max-md:w-full">
                        <a href="/" aria-label="Перейти на главную страницу">
                            <Icon
                                Svg={LogoIcon}
                                width={56}
                                height={56}
                                aria-hidden="true"
                            />
                        </a>
                        <p className="font-p-lg text-text-white">
                            Современная медицинская клиника с полным спектром услуг и индивидуальным подходом к каждому пациенту.
                        </p>
                    </div>

                    {/* Контакты */}
                    <address className="flex flex-col gap-5 max-md:gap-4 py-3 max-xl:w-[245px] max-md:w-full not-italic">
                        <h3 className="text-[28px] max-md:text-lg font-bold leading-none text-text-white">Контакты</h3>
                        <div className="flex gap-2.5 items-center">
                            <Icon
                                Svg={Phone}
                                width={isMobile ? 16 : 24}
                                height={isMobile ? 16 : 24}
                                className="stroke-white stroke-3 max-md:stroke-1"
                                aria-hidden="true"
                            />
                            <a
                                href="tel:+73833830087"
                                className="font-p-lg text-text-white text-nowrap"
                                aria-label="Позвонить по номеру +7 (383) 383‒00‒87"
                            >
                                +7 (383) 383‒00‒87
                            </a>
                        </div>
                        <div className="flex gap-2.5 items-center">
                            <Icon
                                Svg={Phone}
                                width={isMobile ? 16 : 24}
                                height={isMobile ? 16 : 24}
                                className="stroke-white stroke-3 max-md:stroke-1"
                                aria-hidden="true"
                            />
                            <a
                                href="tel:+79231927707"
                                className="font-p-lg text-text-white text-nowrap"
                                aria-label="Позвонить по номеру +7 (923) 192‒77‒07"
                            >
                                +7 (923) 192‒77‒07
                            </a>
                        </div>
                        <div className='flex flex-col gap-2.5'>
                            <p className='font-p-lg text-text-white text-nowrap'>Служба заботы о пациентах</p>
                            <div className="flex gap-2.5 items-center">
                                <Icon
                                    Svg={Phone}
                                    width={isMobile ? 16 : 24}
                                    height={isMobile ? 16 : 24}
                                    className="stroke-white stroke-3 max-md:stroke-1"
                                    aria-hidden="true"
                                />
                                <a
                                    href="tel:+79137077287"
                                    className="font-p-md text-text-white text-nowrap"
                                    aria-label="Позвонить на +7 (913) 707-72-87"
                                >
                                    +7 (913) 707‒72‒87
                                </a>
                            </div>
                        </div>
                    </address>

                    {/* Адреса и время работы */}
                    <div className="flex flex-col gap-5 max-md:gap-4 py-3 max-w-[474px] max-xl:max-w-[700px] max-md:w-[300px]">
                        <h3 className="text-[28px] max-md:text-lg font-bold leading-none text-text-white">Адреса</h3>
                        <div className="flex flex-col gap-[15px] max-xl:gap-5 max-md:gap-4">
                            <div className="flex gap-[5px] items-center">
                                <Icon
                                    Svg={MapPin}
                                    width={isMobile ? 16 : 24}
                                    height={isMobile ? 16 : 24}
                                    className="fill-white shrink-0"
                                    aria-hidden="true"
                                />
                                <h6 className="font-h6 text-text-white text-nowrap max-md:text-wrap">Новосибирск, ул. Станиславского 20</h6>
                            </div>
                            <div className="flex flex-col gap-[5px] pl-[30px]">
                                <p className="font-p-lg text-text-white">Пн-Сб</p>
                                <p className="font-p-lg text-text-white">7:30 - 20:00</p>
                            </div>
                            <div className="flex flex-col gap-[5px] pl-[30px]">
                                <p className="font-p-lg text-text-white">Воскресенье</p>
                                <p className="font-p-lg text-text-white">7:30 - 13:00</p>
                            </div>
                        </div>
                    </div>

                    {/* Навигация */}
                    <nav
                        className="flex flex-col gap-3 p-3 w-[220px] max-xl:hidden"
                        aria-label="Дополнительная навигация"
                    >
                        {getLinkList().map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                className="text-base font-normal text-text-white leading-tight"
                                aria-label={item.label}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <p className='w-full font-p-sm text-text-white'>
                    Имеются противопоказания. Необходима консультация специалиста! <br />
                    Материалы, размещенные на сайте, носят информационный характер. Посетители сайта не должны использовать их в качестве медицинских рекомендаций - определение диагноза и выбор методики лечения остается исключительной прерогативой вашего лечащего врача! <br />
                    Администрация клиники прилагает все усилия для своевременного обновления прейскуранта на сайте, но рекомендует уточнять стоимость услуг в регистратуре или обратиться в колл-центр по телефону <a href="tel:+73833830087" className='hover:text-text-primary transition-colors'>+7 (383) 383‒00‒87</a>. Обратите внимание: размещенный прейскурант не является офертой, медицинские услуги предоставляются на основании заключенного договора.
                </p>

                {/* Нижняя часть футера */}
                <div className="flex max-md:flex-col-reverse max-md:gap-5 md:justify-between" role="region" aria-label="Юридическая информация">
                    <div className="flex flex-col gap-2.5">
                        <p className="font-p-md text-text-white">
                            © {new Date().getFullYear()} ООО МЦ &quot;Хороший Доктор&quot;
                        </p>
                        <p className="font-p-md text-text-white">
                            Все права защищены.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2.5">
                        <Link
                            to={privacyPolicy}
                            rel="noopener noreferrer"
                            target="_blank"
                            className="font-p-md text-text-white"
                            aria-label="Политика конфиденциальности"
                        >
                            Политика конфиденциальности
                        </Link>
                    </div>
                </div>
                <Link to={'https://d-extra.ru/'} className='w-full group'>
                    <p className='text-center text-text-white group-hover:text-primary-light transition font-p-md mt-3'>Сделано в Dextra Webs</p>
                </Link>
            </footer>
        </Section>
    )
}