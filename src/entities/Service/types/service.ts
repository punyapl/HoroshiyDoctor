export type Service = {
    id: number;
    name: string;
    price: number;
    category: string;
    duration: number;
    group: {
        id: string;
        name: string;
    };
    serviceList: string[];
}

export interface SubgroupServices {
    items: Service[];
    currentPage: number;
    hasMore: boolean;
    isLoading: boolean;
}

export interface GroupServicesData {
    items?: Service[];
    currentPage?: number;
    hasMore?: boolean;
    isLoading?: boolean;
    subgroups?: {
        [subgroupId: string]: SubgroupServices;
    };
}

export interface GroupServices {
    [groupId: number]: GroupServicesData;
}

export interface ServiceSubgroup {
    id: string; // slug
    name: string;
    servicesCount: number;
}

export interface ServiceGroup {
    id: number;
    name: string;
    event_type_count?: number;
    servicesCount: number;
    hasSubgroups: boolean;
    subgroups?: ServiceSubgroup[];
}