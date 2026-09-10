export type Filters = Record<string, string[]>;

interface FilterOptionSet {
    label: string;
    options: string[];
}

export type FilterOptions = Record<string, FilterOptionSet>;