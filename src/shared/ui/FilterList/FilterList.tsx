import XMark from '@/shared/assets/icons/XMark.svg'
import { Icon, } from '../Icon';

interface FilterListProps {
    filters: Record<string, string[]>;
    onRemove: (key: string, value: string) => void;
    onRemoveAll: () => void;
}

export const FilterList = (props: FilterListProps) => {
    const { filters, onRemove, onRemoveAll, } = props;

    const filterItems: { key: string; value: string }[] = [];

    Object.entries(filters).forEach(([key, values,]) => {
        values.forEach(value => {
            filterItems.push({ key, value, });
        });
    });

    return (
        <div className="flex flex-wrap gap-2.5">
            <button className="p-2 border-0 bg-primary-light rounded-full" onClick={onRemoveAll}>
                <Icon Svg={XMark} className="stroke-primary stroke-3" />
            </button>
            {filterItems.map((item, index) => (
                <button
                    key={index}
                    className="flex items-center gap-1 py-2 px-3 border-0 bg-primary-light rounded-full font-p-md leading-none text-primary"
                    onClick={() => onRemove(item.key, item.value)}
                >
                    <Icon Svg={XMark} className="stroke-primary stroke-3" />
                    {item.value}
                </button>
            ))}
        </div>
    )
}