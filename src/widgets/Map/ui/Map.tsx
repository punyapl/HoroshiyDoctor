import {
    YMap,
    YMapComponentsProvider,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapDefaultMarker,
} from 'ymap3-components';
import { useDevice, } from '@/shared/hooks/useDevice';

export const Map = () => {
    const { isMobile, } = useDevice()

    return (
        <YMapComponentsProvider apiKey={__YMAPKEY__} lang="ru_RU">
            <YMap location={{ center: [82.88691, 54.984266,], zoom: isMobile? 13 : 14, }} theme="light" mode="vector">
                <YMapDefaultSchemeLayer />
                <YMapDefaultFeaturesLayer />
                <YMapDefaultMarker coordinates={[82.87188, 54.97890, ]} title="Хороший доктор" subtitle="Медицинский центр" color="#FF8636" />
            </YMap>
        </YMapComponentsProvider>
    )
}