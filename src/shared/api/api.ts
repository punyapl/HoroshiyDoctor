import axios from 'axios';
import { DoctorsResponse, ErrorResponse, GetDoctorsParams, ServicesResponse, GetServicesParams, GetPatientParams, PatientResponse, GetScheduleParams, ScheduleResponse, CreateAppointmentRequest, CreateAppointmentResponse, GetServiceGroupsParams, ServiceGroupsResponse, GetCachedServicesParams, GroupsStructureResponse } from './types';

const apiClient = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            return Promise.reject(error.response.data);
        } else if (error.request) {
            return Promise.reject({
                status: 'error',
                error: {
                    type: 'network_error',
                    message: 'Network error occurred',
                },
            });
        } else {
            return Promise.reject({
                status: 'error',
                error: {
                    type: 'unknown_error',
                    message: error.message,
                },
            });
        }
    }
);

export const getDoctors = async (params?: GetDoctorsParams): Promise<DoctorsResponse | ErrorResponse> => {
    return apiClient.get('/specialists', { params })
        .then((res) => res.data)
        .then((data) => {
            if (data?.status === 'success') {
                return data;
            }
            return Promise.reject(data);
        });
};

export const getServices = async (params?: GetServicesParams): Promise<ServicesResponse | ErrorResponse> => {
    return apiClient.get('/eventTypeList', { params })
        .then((res) => res.data)
        .then((data) => {
            if (data?.status === 'success') {
                return data;
            }
            return Promise.reject(data);
        });
};

export const getCachedServices = async (params?: GetCachedServicesParams): Promise<ServicesResponse | ErrorResponse> => {
    return apiClient.get('/getCachedServices', { params })
        .then((res) => res.data)
        .then((data) => {
            if (data?.status === 'success') {
                return data;
            }
            return Promise.reject(data);
        });
};

export const getGroupsStructure = async (): Promise<GroupsStructureResponse | ErrorResponse> => {
    return apiClient.get('/getGroupsStructure')
        .then((res) => res.data)
        .then((data) => {
            if (data?.status === 'success') {
                return data;
            }
            return Promise.reject(data);
        });
};

export const getServiceGroups = async (params?: GetServiceGroupsParams): Promise<ServiceGroupsResponse | ErrorResponse> => {
    return apiClient.get('/eventTypeGroupList', { params })
        .then((res) => res.data)
        .then((data) => {
            if (data?.status === 'success') {
                return data;
            }
            return Promise.reject(data);
        });
};

export const getPatient = async (params?: GetPatientParams): Promise<PatientResponse | ErrorResponse> => {
    return apiClient.get('/searchPatient', { params })
        .then((res) => res.data)
        .then((data) => {
            if (data?.status === 'success') {
                return data;
            }
            return Promise.reject(data);
        });
};

export const getSchedule = async (params?: GetScheduleParams): Promise<ScheduleResponse | ErrorResponse> => {
    return apiClient.get('/schedule', { params })
        .then((res) => res.data)
        .then((data) => {
            if (data?.status === 'success') {
                return data;
            }
            return Promise.reject(data);
        });
};

export const createAppointment = async (appointmentData: CreateAppointmentRequest): Promise<CreateAppointmentResponse | ErrorResponse> => {
    return apiClient.post('/create', appointmentData)
        .then((res) => res.data)
        .then((data) => {
            if (data?.status === 'success') {
                return data.data;
            }
            return Promise.reject(data);
        });
};