import { FC, SVGProps } from "react";

export type Banner = {
    title: string;
    description: string;
    image: string;
    linkTo?: string;
    buttonText?: string;
    buttonIcon?: FC<SVGProps<SVGSVGElement>>;
    buttonIconType?: "fill" | "none" | "stroke" | "both";
}