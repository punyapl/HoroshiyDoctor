import { ReactNode, } from 'react'
import { Footer, } from '@/widgets/Footer'
import { Header, } from '@/widgets/Header'
import { Icon } from '@/shared/ui/Icon';
import Clouds from '@/shared/assets/icons/Clouds.svg'
import Ground from '@/shared/assets/icons/Ground.svg'

type PageProps = {
    children: ReactNode;
    groundVisibility?: boolean;
}
export const Page = (props: PageProps) => {
    const { children, groundVisibility = true } = props
    return (
        <div className="flex flex-col items-center h-screen ">
            <Header />
            <div className='absolute flex flex-col bottom-0 -z-10 -top-10 overflow-x-hidden w-full'>
                <Icon Svg={Clouds} width={2000} height={236} className='self-center' />
            </div>
            <div className="relative flex flex-col w-full grow pt-[84px] max-xl:pt-[88px] max-md:pt-[72px]">
                {children}
                {
                    groundVisibility &&
                    <div className='absolute flex flex-col bottom-0 -z-10 overflow-x-hidden w-full'>
                        <Icon Svg={Ground} width={2000} height={282} className='self-center' />
                    </div>
                }
            </div>
            <Footer />
        </div>
    )
}