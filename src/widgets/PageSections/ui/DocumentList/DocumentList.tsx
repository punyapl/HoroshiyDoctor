import { Documents, } from '@/shared/mocks/documents'
import { DocumentButton, } from '@/shared/ui/DocumentButton'
import { Section, } from '@/shared/ui/Section'

export const DocumentList = () => {
    return (
        <Section
            SectionClassName="py-12 pt-0 max-xl:p-[34px] max-xl:pt-0 max-md:py-6 max-md:pt-0 max-md:px-2.5"
            ContainerClassName="flex flex-col items-center gap-16 max-md:gap-10"
            role="region"
            aria-label="Нормативные документы клиники"
        >
            {
                Documents.map(section => (
                    <div className="flex flex-col gap-10 max-xl:gap-8 max-md:gap-6 w-full items-center" role="region" aria-labelledby="section-heading">
                        <h2 id="section-heading" className="font-h2 text-text-primary text-center">{section.label}</h2>
                        <div
                            className="grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 justify-center w-fit gap-[25px] max-xl:gap-5 max-md:gap-3.5"
                            role="list"
                            aria-label="Список документов"
                        >
                            {section.docs.map((doc, index) => (
                                <DocumentButton
                                    key={index}
                                    documentData={doc}
                                    role="listitem"
                                />
                            ))}
                        </div>
                    </div>
                ))
            }
        </Section>
    )
}