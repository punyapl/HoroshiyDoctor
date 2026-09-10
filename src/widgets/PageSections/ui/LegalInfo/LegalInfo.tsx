import { fullLegalInformation, } from "@/shared/mocks/fullLegalInformation"
import { Section, } from "@/shared/ui/Section"
import QR from '@/shared/assets/images/QR.png'

export const LegalInfo = () => {

    return (
        <Section
            SectionClassName="py-12 max-xl:p-[34px] max-md:py-6 max-md:px-2.5"
            ContainerClassName="flex flex-col items-center gap-16 max-md:gap-10"
            role="region"
            aria-label="Юридические данные"
        >
            <div className="flex flex-col gap-5 max-md:gap-3 w-full">
                {
                    fullLegalInformation.map((row, index) => (
                        <div className="flex max-md:flex-col gap-5 max-md:gap-1.5 w-full" key={index}>
                            {
                                row.label &&
                                <h6 className="font-h6 text-text-primary text-nowrap max-md:whitespace-normal max-md:break-words ">
                                    {row.label}
                                </h6>
                            }
                            <p className="font-p-xl max-md:text-sm text-text-main text-wrap">
                                {row.value}
                            </p>
                        </div>
                    ))
                }
            </div>
            <div className="flex items-center max-md:flex-col justify-between max-md:gap-3 w-full bg-background rounded-[20px] p-4">
                <div className="flex flex-col gap-3">
                    <p className="font-p-xl max-md:text-sm text-text-main text-wrap">
                        Лицензия №: Л041-01125-54/02875073
                    </p>
                    <p className="font-p-xl max-md:text-sm text-text-main text-wrap">
                        от 07.08.2025
                    </p>
                    <p className="font-p-xl max-md:text-sm text-text-main text-wrap">
                        Лицензирующий орган: Министерство здравоохранения Новосибирской области
                    </p>
                </div>
                <img src={QR} alt="qr-код лицензии" />
            </div>
        </Section>
    )
}
