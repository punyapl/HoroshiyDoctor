import { AriaRole, } from 'react';
import DocumentTextFilled from '@/shared/assets/icons/DocumentTextFilled.svg'
import { useDevice, } from '@/shared/hooks/useDevice'
import { Icon, } from '../Icon'

type DocumentButtonProps = {
    documentData: { label: string; document?: string; link?: string };
    role?: AriaRole;
}

export const DocumentButton = (props: DocumentButtonProps) => {
    const { documentData, role, } = props
    const { isMobile, } = useDevice()

    return (
        <a role={role} href={documentData.document || documentData.link} rel="noopener noreferrer" target="_blank">
            <button className="cursor-pointer flex items-center gap-5 p-5 max-md:p-3 h-full max-md:h-[100px] max-w-[410px] max-md:max-w-[300px] w-full border-2 bg-background border-primary rounded-[20px] hover:shadow transition duration-300 hover:shadow-primary-light hover:bg-primary-light">
                <Icon Svg={DocumentTextFilled} width={isMobile? 68 : 84} height={isMobile? 68 : 84} className='fill-primary shrink-0'/>
                <p className='h-max font-p-xl max-md:text-base text-text-main align-middle line-clamp-4 text-left leading-tight wrap-anywhere'>{documentData.label}</p>
            </button>
        </a>
    )
}