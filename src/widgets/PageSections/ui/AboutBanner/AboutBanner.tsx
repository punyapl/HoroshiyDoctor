import { useDevice, } from '@/shared/hooks/useDevice'
import { Button, } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import { Section, } from '@/shared/ui/Section'
import AboutClinicBackgroundDesktop from '@/shared/assets/icons/AboutClinicBackgroundDesktop.svg'
import AboutClinicBackgroundTablet from '@/shared/assets/icons/AboutClinicBackgroundTablet.svg'
import AboutClinicBackgroundMobile from '@/shared/assets/icons/AboutClinicBackgroundMobile.svg'
import { Link, } from 'react-router-dom'
import { Carousel } from '@/shared/ui/Carousel'
import { Banner } from '@/entities/Banner/types'
import { banners } from '@/shared/mocks/banners'

type BannerProps = {
    data: Banner;
    type?: 'default' | 'transparent'
}

const BannerContainer = (props: BannerProps) => {
    const { data, type = 'default' } = props
    const { isMobile } = useDevice()

    return (
        <div
            className='flex max-xl:flex-col-reverse max-xl:justify-end items-center 
                gap-10 max-xl:gap-5 max-md:gap-3 p-10 max-xl:p-7.5 max-md:p-2.5
                w-[1144px] max-xl:w-[564px] max-md:w-[216px]
                min-h-[648px] max-xl:min-h-[800px] max-md:min-h-[426px]
                bg-banner border-2 border-border rounded-[20px]'
        >
            <div className='flex flex-col gap-10 max-xl:justify-between w-full'>
                <div className='flex flex-col gap-5 max-md:gap-2.5'>
                    <h1 className='font-h1 text-primary text-ellipsis'>{data.title}</h1>
                    <p className='font-sub text-text-main text-ellipsis'>{data.description}</p>
                </div>
                {
                    data.linkTo &&
                    <Link to={data.linkTo} className='self-center'>
                        <Button text={data.buttonText} icon={data.buttonIcon} theme='blue' iconType={data.buttonIconType} size={isMobile ? 'small' : 'regular'} />
                    </Link>
                }
            </div>
            <div className='relative w-full h-full max-xl:max-h-[423px] max-md:max-h-[160px] rounded-[20px] max-md:rounded-[5px] overflow-hidden'>
                <img src={data.image} alt="Иллюстрация баннера" className='absolute h-full w-full object-cover' />
            </div>
        </div>
    )
}

export const AboutBanner = () => {
    const { isMobile, isTablet } = useDevice()

    const bannerList = banners.map((banner, index) =>
        <BannerContainer data={banner} key={index} type='default' />
    )

    return (
        <Section
            SectionClassName="pb-12 max-xl:pb-[34px] max-md:pb-6 h-full"
            ContainerClassName='relative flex flex-col items-center max-w-[1993px] overflow-x-hidden'
            role="region"
            aria-label="О клинике"
        >
            <div className='z-10 w-full h-full py-5 max-xl:py-8.5 max-md:py-3 flex flex-col gap-6'>
                <h3 className='font-h3 text-text-primary text-center leading-snug max-xl:hidden'>Если здоровье вас тревожит - <br/> ХОРОШИЙ ДОКТОР вам поможет!</h3>
                <Carousel
                    items={bannerList}
                    desktopPageSize={1}
                    tabletPageSize={1}
                    mobilePageSize={1}
                    slideShow
                    className='max-w-[1280px] max-xl:max-w-[700px]'
                />
            </div>
            <div className='absolute flex flex-col overflow-x-hidden max-w-[1993px]'>
                <Icon
                    Svg={
                        isMobile ? AboutClinicBackgroundMobile :
                            isTablet ? AboutClinicBackgroundTablet :
                                AboutClinicBackgroundDesktop
                    }
                    width={isMobile ? 767 : isTablet ? 1279 : 1993}
                    height={isMobile ? 470 : isTablet ? 911 : 854}
                    className='self-center '
                />
            </div>
        </Section>
    )
}