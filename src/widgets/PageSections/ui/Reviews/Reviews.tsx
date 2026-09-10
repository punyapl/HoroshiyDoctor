import { Section } from "@/shared/ui/Section";

export const Reviews = () => {
    return (
        <Section
            SectionClassName="py-5 max-xl:p-8 max-md:py-6 max-md:px-2.5"
            ContainerClassName="flex flex-col gap-[25px] max-xl:gap-5 max-md:gap-3.5 items-center"
            role="region"
            aria-label="Отзывы клиентов"
        >
            <div
                style={{ width: 560, height: 800, overflow: "hidden", position: "relative" }}
            >
                <iframe
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "1px solid #e6e6e6",
                        borderRadius: 8,
                        boxSizing: "border-box"
                    }}
                    src="https://yandex.ru/maps-reviews-widget/120823951511?comments"
                />
                <a
                    href="https://yandex.com/maps/org/khoroshiy_doktor/120823951511/"
                    target="_blank"
                    style={{
                        boxSizing: "border-box",
                        textDecoration: "none",
                        color: "#b3b3b3",
                        fontSize: 10,
                        fontFamily: "YS Text,sans-serif",
                        padding: "0 16px",
                        position: "absolute",
                        bottom: 8,
                        width: "100%",
                        textAlign: "center",
                        left: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "block",
                        maxHeight: 14,
                        whiteSpace: "nowrap"
                    }}
                >
                    Хороший Доктор на карте Новосибирска — Яндекс&nbsp;Карты
                </a>
            </div>

        </Section>
    );
};
