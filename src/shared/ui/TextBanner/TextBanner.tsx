interface VariantMap {
    h1: 'dark' | 'light';
    h2: 'white' | 'blue' | 'light-blue';
}

type TextBannerProps = {
    [T in keyof VariantMap]: {
        type: T;
        variant: VariantMap[T];
        headerText: string;
        subheaderText?: string;
        id?: string;
    }
}[keyof VariantMap];

const headerSizes: Record<keyof VariantMap, string> = {
    h1: 'font-h1',
    h2: 'font-h2',
};

const paragraphSizes: Record<keyof VariantMap, string> = {
    h1: 'font-sub max-w-[810px] max-md:w-[300px]',
    h2: 'font-sub max-w-[810px] max-md:w-[300px]',
};

type Variant = VariantMap[keyof VariantMap];

const variantClasses: { [V in Variant]: { header: string; subheader: string } } = {
    'dark': { header: 'text-text-white', subheader: 'text-text-white', },
    'light': { header: 'text-text-primary', subheader: 'text-text-main', },
    'white': { header: 'text-text-primary', subheader: 'text-text-secondary', },
    'blue': { header: 'text-text-white', subheader: 'text-text-white', },
    'light-blue': { header: 'text-text-primary', subheader: 'text-text-main', },
};

export const TextBanner = (props: TextBannerProps) => {
    const {
        type,
        variant,
        headerText,
        subheaderText,
        id,
    } = props;

    const Tag = type;
    const headerSizeClass = headerSizes[type];
    const subSizeClass = paragraphSizes[type]

    const { header: headerClass, subheader: subClass, } = variantClasses[variant];

    return (
        <div className="flex flex-col items-center gap-4">
            <Tag id={id} className={`text-center ${headerSizeClass} ${headerClass}`}>
                {headerText}
            </Tag>
            {
                subheaderText &&
                <p className={`text-center ${subSizeClass} ${subClass}`}>
                    {subheaderText}
                </p>
            }
        </div>
    );
};
