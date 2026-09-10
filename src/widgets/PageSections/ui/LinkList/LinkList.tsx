import { linkList, } from "@/shared/mocks/linkList";
import { Section, } from "@/shared/ui/Section";
import { LinkCard, } from "@/widgets/LinkCard";

export const LinkList = () => {
    return (
        <Section
            SectionClassName="py-5 max-xl:p-8 max-md:py-6 max-md:px-2.5"
            ContainerClassName="flex flex-col gap-[25px] max-xl:gap-5 max-md:gap-3.5 items-center"
            role="region"
            aria-label="Список полезных ссылок"
        >
            <div
                className="grid grid-cols-2 max-xl:grid-cols-1 gap-5 items-start max-w-max"
                role="list"
                aria-label="Список полезных ссылок"
            >
                {linkList.map((link, index) => (
                    <div
                        key={index}
                        className="flex justify-center items-center"
                        role="listitem"
                    >
                        <LinkCard
                            data={link}
                        />
                    </div>
                ))}
            </div>
        </Section>
    );
};
