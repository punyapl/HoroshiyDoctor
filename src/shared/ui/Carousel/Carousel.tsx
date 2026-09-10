import { useState, useEffect, useRef, useCallback } from 'react';
import { Icon } from '../Icon';
import ChevronDown from '@/shared/assets/icons/ChevronDown.svg'
import { useDevice } from '@/shared/hooks/useDevice';

import { CarouselProvider, ButtonBack, Slider, Slide, ButtonNext, DotGroup, Dot } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

type CarouselProps = {
    items: React.ReactNode[];
    role?: React.AriaRole;
    desktopPageSize: number;
    tabletPageSize: number;
    mobilePageSize: number;
    slideShow?: boolean
    className?: string;
};

export const Carousel = (props: CarouselProps) => {
    const {
        items,
        role,
        desktopPageSize,
        tabletPageSize,
        mobilePageSize,
        className,
        slideShow = false 
    } = props;
    const { isMobile } = useDevice();
    const [visibleItems, setVisibleItems] = useState(4);
    const [numberOfDots, setNumberOfDots] = useState(0)

    const ArrowPrev = () => (
        <Icon Svg={ChevronDown} width={isMobile ? 16 : 32} height={isMobile ? 16 : 32} className='stroke-4 stroke-white rotate-90' />
    );

    const ArrowNext = () => (
        <Icon Svg={ChevronDown} width={isMobile ? 16 : 32} height={isMobile ? 16 : 32} className='stroke-4 stroke-white -rotate-90' />
    );

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 1280) {
                setVisibleItems(desktopPageSize);
                setNumberOfDots(Math.ceil(items.length / desktopPageSize))
            } else if (width >= 768) {
                setVisibleItems(tabletPageSize);
                setNumberOfDots(Math.ceil(items.length / tabletPageSize))
            } else {
                setVisibleItems(mobilePageSize);
                setNumberOfDots(Math.ceil(items.length / mobilePageSize))
            }
        };
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [desktopPageSize, tabletPageSize, mobilePageSize]);

    return (
        <div className={`relative mx-auto max-w-[1248px] max-xl:max-w-[682px] max-md:max-w-[300px] ${className}`}>
            <CarouselProvider
                naturalSlideWidth={546}
                naturalSlideHeight={234}
                totalSlides={items.length}
                visibleSlides={visibleItems}
                step={visibleItems}
                isIntrinsicHeight={true}
                infinite={true}
                isPlaying={slideShow}
            >
                <div className="flex items-center gap-5 max-md:gap-2.5">
                    <ButtonBack className="focus:outline-none bg-primary rounded-full p-2 shadow-md cursor-pointer">{<ArrowPrev />}</ButtonBack>

                    <Slider className='w-full'>
                        {items.map((item, index) => (
                            <Slide index={index} key={index} innerClassName='flex justify-center overflow-visible'>
                                {item}
                            </Slide>
                        ))}
                    </Slider>

                    <ButtonNext className="focus:outline-none bg-primary rounded-full p-2 shadow-md cursor-pointer">{<ArrowNext />}</ButtonNext>
                </div>
                <div className="flex justify-center mt-5 max-md:mt-3 w-full">
                    <div className='flex gap-5 max-md:gap-3'>
                        {Array.from({ length: numberOfDots }).map((_, index) => (
                            <Dot
                                key={index}
                                slide={index * visibleItems}
                            />
                        ))}
                    </div>
                </div>
            </CarouselProvider>
        </div>
    );
};
