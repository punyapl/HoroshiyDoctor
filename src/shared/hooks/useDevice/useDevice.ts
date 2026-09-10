import { useState, useEffect, } from 'react';

export function useDevice() {
    const [device, setDevice,] = useState({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
    });

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            setDevice({
                isMobile: w < 768,
                isTablet: w >= 768 && w < 1280,
                isDesktop: w >= 1280,
            });
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return device;
}