import TG from '@/shared/assets/icons/TG.svg'
import WA from '@/shared/assets/icons/WA.svg'
import { Button, } from '@/shared/ui/Button'
import { Section, } from '@/shared/ui/Section'
import { Map, } from '@/widgets/Map'
import { Link } from 'react-router-dom'

export const ContactsInfo = () => {
    return (
        <Section
            SectionClassName="py-12 pt-0 max-xl:p-[34px] max-xl:pt-0 max-md:py-6 max-md:pt-0 max-md:px-2.5"
            ContainerClassName="flex justify-between xl:items-center max-xl:flex-col-reverse max-xl:gap-8 max-md:gap-3"
            role="region"
            aria-label="Контактная информация клиники"
        >
            <div
                className="flex self-center w-full max-w-[785px] h-[535px] max-md:h-[220px] text-center"
                role="img"
                aria-label="Карта с расположением клиник"
            >
                <Map />
            </div>

            <address className="h-max w-max max-xl:w-full flex flex-col gap-7 not-italic">
                <div className="flex flex-col gap-4 flex-wrap">
                    <div className="flex gap-3 items-center">
                        <h3 className="font-h6 text-text-primary">Телефон:</h3>
                        <a
                            href="tel:+73833830087"
                            className="font-p-lg text-text-main text-nowrap"
                            aria-label="Позвонить по номеру +7 (383) 383‒00‒87"
                        >
                            +7 (383) 383‒00‒87
                        </a>
                    </div>
                    <div className="flex gap-3 items-center">
                        <h3 className="font-h6 text-text-primary">Телефон:</h3>
                        <a
                            href="tel:+79231927707"
                            className="font-p-lg text-text-main text-nowrap"
                            aria-label="Позвонить по номеру +7 (923) 192‒77‒07"
                        >
                            +7 (923) 192‒77‒07
                        </a>
                    </div>
                    <div className="flex gap-3 items-center">
                        <h3 className="font-h6 text-text-primary">Служба заботы о пациентах:</h3>
                        <a
                            href="tel:+79137077287"
                            className="font-p-lg text-text-main text-nowrap"
                            aria-label="Позвонить на +7 (913) 707-72-87"
                        >
                            +7 (913) 707‒72‒87
                        </a>
                    </div>
                </div>

                <div className="flex flex-col gap-4 flex-wrap">
                    <div className="flex gap-3 flex-col">
                        <h3 className="font-h6 text-text-primary">Медицинский центр:</h3>
                        <p className="font-p-lg text-text-main">630078 г. Новосибирск, ул. Станиславского, д. 20</p>
                    </div>
                    <div className="flex gap-3 items-start">
                        <h3 className="font-h6 text-text-primary">Время работы:</h3>
                        <div className="flex-col">
                            <div className="flex gap-3">
                                <p className="font-p-lg text-text-main">Пн-Сб</p>
                                <p className="font-p-lg text-text-main">7:30 - 20:00</p>
                            </div>
                            <div className="flex gap-3">
                                <p className="font-p-lg text-text-main">Воскресенье</p>
                                <p className="font-p-lg text-text-main">7:30 - 13:00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </address>
        </Section>
    )
}