export interface Doctor {
    id: number;
    name: string;
    speciality: string[];
    photo: string;
}

export interface DoctorsResponse {
    status: string;
    data: {
        list: Doctor[];
        meta: {
            hasMore: boolean;
            limit: number;
            page: number;
            total: number;
        }
    };
}

export interface Service {
    id: number;
    name: string;
    price: number;
    category: string;
    duration: number;
    group: {
        id: string;
        name: string;
    }
    serviceList: string[];
}

export interface ServicesResponse {
    status: string;
    data: {
        list: Service[];
        meta: {
            hasMore: boolean;
            limit: number;
            page: number;
            total: number;
        }
    };
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

export interface ServiceGroupsResponse {
    status: string;
    data: {
        list: ServiceGroup[];
        meta: {
            hasMore: boolean;
            limit: number;
            page: number;
            total: number;
        }
    };
}

export interface GroupsStructureResponse {
    status: string;
    data: {
        groups: ServiceGroup[];
        lastUpdated: string;
    };
}

export interface Patient {
    id: number;
    lastname: string;
    firstname: string;
    middlename: string;
    birthday: string;
}

export interface PatientResponse {
    status: string;
    data: Patient;
}

export interface TimeSlot {
    date?: string;
    start: string;
    end: string;
    specialist: number;
}

export interface ScheduleData {
    list: {
        [date: string]: TimeSlot[];
    };
}

export interface ScheduleResponse {
    status: string;
    data: ScheduleData;
}

interface Event {
    date: string;
    time_start: string;
    time_end: string;
    specialist: string;
    fio: string;
    phone: string;
}

export interface CreateAppointmentResponse {
    status: string;
    data: {
        status: string;
        message: string;
        event: Event;
    };
}

export interface ErrorResponse {
    status: 'error';
    error: {
        type: string;
        message: string;
    };
}

// Параметры запроса
export interface GetDoctorsParams {
    event_type?: number;
    limit?: number;
    page?: number;
}

export interface GetServicesParams {
    search?: string;
    sort?: string;
    id?: string;
    group?: number;
    specialist?: number;
    limit?: number;
    page?: number;
}

export interface GetCachedServicesParams {
    search?: string;
    exclude?: string;
    sort?: string;
    id?: string;
    group?: number;
    subgroup?: string;
    limit?: number;
    page?: number;
}

export interface GetServiceGroupsParams {
    search?: string;
    sort?: string;
    id?: string;
    group?: number;
    specialist?: number;
    limit?: number;
    page?: number;
}

export interface GetPatientParams {
    phone?: string;
    snils?: string;
}

export interface GetScheduleParams {
    event_type?: number;
    specialist?: number;
    date_start?: string;
    date_end?: string;
}

export interface EventRequest {
    event_type: number;
    specialist: number;
    date: string;
    time_start: string;
}

export interface ClientRequest {
    id?: number;
    phone?: string;
    lastname: string;
    firstname: string;
    middlename?: string;
    birthday?: string;
}

export interface CreateAppointmentRequest {
    event: EventRequest;
    client: ClientRequest;
    comment: string;
}