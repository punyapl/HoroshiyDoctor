import { Link, } from "react-router-dom";
import { LinkData, } from "@/entities/LinkData/types";

type LinkCardProps = {
    data: LinkData;
    className?: string;
};

export const LinkCard = (props: LinkCardProps) => {
    const { data, className = '', } = props;

    return (
        <Link to={data.link} rel="noopener noreferrer" target="_blank" className="group">
            <div
                className={`
                flex flex-col items-center max-md:justify-center gap-2.5
                bg-background outline-2 outline-border
                rounded-[20px] p-5
                w-[410px] min-h-[240px] max-md:w-[300px] max-md:min-h-[250px] max-md:h-min
                transition-all duration-150
                group-hover:shadow-sm group-hover:bg-primary-light
                group-hover:outline-0
                ${className}
                `}
            >
                <img src={data.image} alt="Логотип карточки" className="w-[123px] aspect-square" />
                <h6 className="font-h6 text-text-main text-center h-auto overflow-ellipsis line-clamp-3">{data.name}</h6>
            </div>
        </Link>
    );
};
