import { AriaRole, ReactNode, } from 'react'

type SectionProps = {
    role?: AriaRole
    children?: ReactNode;
    SectionClassName?: string;
    ContainerClassName?: string;
}
export const Section = (props: SectionProps) => {
    const { role, children, SectionClassName, ContainerClassName,} = props;

    return (
        <section role={role} className={`w-full  ${SectionClassName ?? ''}`}>
            <div className={`m-auto max-w-7xl ${ContainerClassName ?? ''}`}>
                {children}
            </div>
        </section>
    )
}