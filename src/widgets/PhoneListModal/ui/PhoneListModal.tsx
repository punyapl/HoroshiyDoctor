import { useDevice } from "@/shared/hooks/useDevice";
import { ModalProps, Modal } from "@/shared/ui/Modal";

type PhoneListModalProps = Omit<ModalProps, 'children'>

export const PhoneListModal = (props: PhoneListModalProps) => {
    const { isMobile, } = useDevice()

    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} size={isMobile ? 'sm' : 'xl'}>
            <div className="flex flex-col gap-3 max-md:gap-2.5 justify-self-center">
                <div className="flex max-md:flex-col justify-between gap-3 max-md:gap-2.5">
                    <p className="font-p-lg text-text-primary">Телефоны для записи:</p>
                    <div className="flex flex-col gap-3 max-md:gap-2.5">
                        <a
                            href="tel:+73833830087"
                            className="font-p-md text-text-main text-nowrap"
                            aria-label="Позвонить на +7 (383) 383-00-87"
                        >
                            +7 (383) 383‒00‒87
                        </a>
                        <a
                            href="tel:+79231927707"
                            className="font-p-md text-text-main text-nowrap"
                            aria-label="Позвонить на +7 (923) 192-77-07"
                        >
                            +7 (923) 192‒77‒07
                        </a>
                    </div>
                </div>
                <div className="flex max-md:flex-col justify-between gap-3 max-md:gap-2.5">
                    <p className="font-p-lg text-text-primary">Служба заботы о пациентах:</p>
                    <a
                        href="tel:+79137077287"
                        className="font-p-md text-text-main text-nowrap"
                        aria-label="Позвонить на +7 (913) 707-72-87"
                    >
                        +7 (913) 707‒72‒87
                    </a>
                </div>
            </div>
        </Modal>
    )
};
