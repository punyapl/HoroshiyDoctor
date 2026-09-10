import { FC, memo, type SVGProps, } from 'react';

type SvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>;

interface IconProps extends SvgProps {
    className?: string;
    Svg: FC<SVGProps<SVGSVGElement>>;
}

export const Icon: FC<IconProps> = memo((props) => {
    const {
        className = '',
        Svg,
        width = 20,
        height = 20,
        ...otherProps
    } = props;

    const icon = (
        <Svg
            className={className}
            width={width}
            height={height}
            {...otherProps}
        />
    );
    return icon;
});
