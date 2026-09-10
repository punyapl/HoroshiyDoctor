import { useEffect, useState, } from 'react'
import Burger from '@/shared/assets/icons/Burger.svg'
import LogoIcon from '@/shared/assets/icons/LogoIcon.svg'
import PhoneFilled from '@/shared/assets/icons/PhoneFilled.svg'
import { useDevice, } from '@/shared/hooks/useDevice'
import { Button, } from '@/shared/ui/Button'
import { Icon, } from '@/shared/ui/Icon'
import { NavBar, } from '@/shared/ui/NavBar'
import { Section, } from '@/shared/ui/Section'
import { useModal } from '@/shared/hooks/useModal'
import { SignUpModal } from '@/widgets/SignUpModal'
import { useScrollDetector } from '@/shared/hooks/useScrollDetector'
import { PhoneListModal } from '@/widgets/PhoneListModal'
import { AccessibilityButton } from '@/features/accessibility'

export const Header = () => {
    const { isMobile, } = useDevice()
    const isScrolled = useScrollDetector(50)

    const [sidebarOpen, setSidebarOpen,] = useState(false);

    const formModal = useModal();
    const phoneModal = useModal();

    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [sidebarOpen,]);

    return (
        <Section SectionClassName={`fixed left-0 right-0 w-screen transition duration-150 ease-in-out 
            ${sidebarOpen ? 'bg-white' : 'bg-transparent'} z-50 
            ${isScrolled
                ? 'bg-white shadow-md'
                : 'bg-transparent'
            }`}
        >
            <header className='py-2.5 px-[34px] xl:px-0 flex items-center justify-between'>
                <div id='main-menu' className='flex flex-wrap justify-center max-xl:justify-between items-center w-full px-4'>
                    <div className='flex items-center gap-3'>
                        <Icon
                            Svg={LogoIcon}
                            width={55}
                            height={55}
                            aria-hidden="true"
                        />
                        <NavBar
                            className="hidden xl:flex mx-8"
                            role="navigation"
                            aria-label="Основное меню"
                        />
                    </div>
                    <div className="hidden xl:flex gap-3 items-center">
                        <Button
                            icon={PhoneFilled}
                            iconType='both'
                            theme="light-blue"
                            size={isMobile ? 'small' : 'regular'}
                            onClick={() => isMobile ? window.open('tel:+73833830087') : phoneModal.open()}
                            aria-label="Открыть список номеров телефонов"
                        />
                        <Button
                            theme="blue"
                            text="Записаться"
                            size={isMobile ? 'small' : 'regular'}
                            onClick={() => formModal.open()}
                            aria-label="Записаться на прием"
                        />
                        <AccessibilityButton />
                    </div>
                    <div className="xl:hidden flex gap-3">
                        <AccessibilityButton />
                        <button
                            className="xl:hidden bg-background rounded-full p-2.5"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            aria-label="Открыть меню"
                            aria-expanded={sidebarOpen}
                            aria-controls="mobile-menu"
                            aria-haspopup="true"
                        >
                            <Icon
                                Svg={Burger}
                                className='stroke-2 stroke-primary'
                                width={32}
                                height={32}
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </div>
                <div
                    id="mobile-menu"
                    className={`
                            fixed inset-y-0 right-0 z-50 bg-white ${isMobile ? 'w-screen' : 'max-w-[360px]'} top-[75px]
                            transform transition-transform duration-300 ease-in-out
                            ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
                        `}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Мобильное меню"
                    aria-hidden={!sidebarOpen}
                >
                    <nav
                        className="flex flex-col h-full justify-between px-[38px] py-[34px]"
                        aria-label="Мобильная навигация"
                    >
                        <NavBar
                            className="flex-col items-start gap-[30px]"
                            role="navigation"
                        />
                        <div className="flex flex-col gap-[30px]">
                            <Button
                                icon={PhoneFilled}
                                iconType='both'
                                theme="light-blue"
                                text='Позвонить'
                                size={isMobile ? 'small' : 'regular'}
                                onClick={() => {
                                    isMobile ? window.open('tel:+73833830087') : phoneModal.open();
                                    setSidebarOpen(false);
                                }}
                                aria-label={isMobile ? "Позвонить на +7 (383) 383-00-87" : "Открыть список номеров телефонов"}
                            />
                            <Button
                                theme="blue"
                                text="Записаться"
                                size={isMobile ? 'small' : 'regular'}
                                onClick={() => {
                                    formModal.open();
                                    setSidebarOpen(false);
                                }}
                                aria-label="Записаться на прием"
                            />
                        </div>
                    </nav>
                </div>
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/30 z-40 top-[75px]"
                        onClick={() => setSidebarOpen(false)}
                        aria-hidden="true"
                        role="presentation"
                    />
                )}
            </header>
            <SignUpModal
                isOpen={formModal.show}
                onClose={formModal.close}
                aria-labelledby="signup-modal-title"
            />
            <PhoneListModal
                isOpen={phoneModal.show}
                onClose={phoneModal.close}
                aria-labelledby="phone-modal-title"
            />
        </Section>
    )
}