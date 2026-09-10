import { Section } from "@/shared/ui/Section";

export const PaymentInfo = () => {
    return (
        <Section
            SectionClassName="py-12 max-xl:p-[34px] max-md:py-6 max-md:px-2.5"
            ContainerClassName="flex flex-col gap-[25px] max-xl:gap-5 max-md:gap-3.5"
            role="region"
            aria-label="Способы оплаты"
        >
            <div className="flex flex-col gap-4 max-md:gap-2 w-full p-4 bg-background rounded-[20px]">
                <p className="font-p-lg text-text-main leading-relaxed">В клинике ООО &quot;Хороший доктор&quot; доступны удобные способы оплаты медицинских услуг.</p>
                <div className="flex flex-col gap-2 w-full">
                    <h4 className="font-h4 text-text-primary">Способы оплаты</h4>
                    <p className="font-p-lg text-text-main leading-relaxed">В клинике</p>
                    <ul className="font-p-lg text-text-main leading-relaxed list-disc list-inside">
                        <li>Наличный расчет — оплата в кассе клиники наличными денежными средствами</li>
                        <li>Банковские карты — принимаются карты платежных систем VISA, MasterCard, МИР</li>
                        <li>Система быстрых платежей (СБП) — оплата через мобильное приложение вашего банка по QR-коду</li>
                    </ul>
                    <p className="font-p-lg text-text-main leading-relaxed">Онлайн-оплата</p>
                    <p className="font-p-lg text-text-main leading-relaxed">Оплата медицинских услуг через интернет осуществляется банковскими картами: VISA Inc, MasterCard WorldWide, НСПК МИР.</p>
                    <p className="font-p-lg text-text-main leading-relaxed">Услуга оплаты через интернет осуществляется в соответствии с правилами международных платежных систем на принципах соблюдения конфиденциальности и безопасности совершения платежа. Используются современные методы проверки, шифрования и передачи данных по закрытым каналам связи.</p>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <h4 className="font-h4 text-text-primary">Порядок онлайн-оплаты</h4>
                    <ol className="font-p-lg text-text-main leading-relaxed list-decimal list-inside">
                        <li>При оплате банковской картой вы будете перенаправлены на защищенную страницу банка</li>
                        <li>Потребуется ввести данные карты: номер карты, имя владельца, срок действия, трёхзначный код безопасности (CVV2/CVC2)</li>
                        <li>Для подтверждения операции введите код из SMS, который придет от вашего банка</li>
                        <li>После успешной оплаты вы получите электронный чек</li>
                    </ol>
                    <p className="font-p-lg text-text-main leading-relaxed">Возможные причины отказа в платеже:</p>
                    <ul className="font-p-lg text-text-main leading-relaxed list-disc list-inside">
                        <li>Карта не предназначена для интернет-платежей (уточните в банке)</li>
                        <li>Недостаточно средств на счете</li>
                        <li>Неверно введены данные карты</li>
                        <li>Истек срок действия карты</li>
                    </ul>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <h4 className="font-h4 text-text-primary">Безопасность платежей</h4>
                    <p className="font-p-lg text-text-main leading-relaxed">Предоставляемая вами информация (имя, телефон, e-mail, данные карты) является конфиденциальной и не подлежит разглашению. Данные банковской карты передаются только в зашифрованном виде и не сохраняются на сервере клиники.</p>
                    <p className="font-p-lg text-text-main leading-relaxed">Рекомендации по безопасности:</p>
                    <ul className="font-p-lg text-text-main leading-relaxed list-disc list-inside">
                        <li>Берегите карту так же, как наличные деньги</li>
                        <li>Никогда не сообщайте полные данные карты по телефону</li>
                        <li>Вводите реквизиты только при совершении оплаты</li>
                        <li>Храните номер телефона банка для экстренной блокировки карты</li>
                    </ul>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <h4 className="font-h4 text-text-primary">Возврат денежных средств</h4>
                    <p className="font-p-lg text-text-main leading-relaxed">При оплате банковской картой возврат наличными не допускается. Возврат осуществляется на ту же карту, с которой была произведена оплата.</p>
                    <p className="font-p-lg text-text-main leading-relaxed">Порядок возврата:</p>
                    <ol className="font-p-lg text-text-main leading-relaxed list-decimal list-inside">
                        <li>Направьте заявление о возврате на электронную почту клиники: centerprofmed@mail.ru</li>
                        <li>Приложите копию паспорта и документ, подтверждающий оплату</li>
                        <li>Возврат осуществляется в течение 21 рабочего дня с момента получения заявления</li>
                    </ol>
                    <p className="font-p-lg text-text-main leading-relaxed">Процедура возврата регулируется статьями 28 и 31 Федерального закона «О защите прав потребителей».</p>
                </div>
            </div>
        </Section>
    );
};
