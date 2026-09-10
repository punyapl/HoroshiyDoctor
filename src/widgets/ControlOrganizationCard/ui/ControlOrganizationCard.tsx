import { Link, } from "react-router-dom";
import { ControlOrganization, } from "@/entities/ControlOrganization/types";

type ControlOrganizationCardProps = {
    data: ControlOrganization;
    className?: string;
}

export const ControlOrganizationCard = (props: ControlOrganizationCardProps) => {
    const { data, className = '', } = props;

    return (
        <Link to={data.link} rel="noopener noreferrer" target="_blank" className="group">
            <div
                className={`
                flex flex-col justify-between bg-primary-light 
                rounded-[20px] p-7 max-md:p-4 
                w-full min-w-[300px] max-w-[630px] 
                h-full xl:min-h-[283px]
                group-hover:shadow-sm
                ${className}
                `}
            >
                <div className="flex flex-col w-full gap-3 max-md:gap-2">
                    <div className='flex flex-col w-full gap-2'>
                        <h4 className="font-h4 text-text-primary h-auto overflow-ellipsis line-clamp-4 max-md:line-clamp-5">{data.name}</h4>
                        {
                            data.altName &&
                            <p className="font-p-lg max-md:text-xs text-text-secondary overflow-ellipsis">{data.altName}</p>
                        }
                    </div>
                    <p
                        className="font-p-md max-md:text-sm text-text-main h-auto overflow-ellipsis line-clamp-2"
                    >
                        {`Адрес: ${data.address}`}
                    </p>
                    <p
                        className="font-p-md max-md:text-sm text-text-main h-auto overflow-ellipsis line-clamp-2"
                    >
                        {`Телефон${data.phones.length > 1 ? 'ы': ''}: ${data.phones.join(', ')}`}
                    </p>
                </div>
            </div>
        </Link>
    )
}