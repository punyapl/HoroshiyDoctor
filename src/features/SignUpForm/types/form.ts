export type Appointment = {
    serviceId: string;
    doctorId: string;
    date: string;
    timeStart: string;
    comment: string;
}

export type Patient = {
    id?: number;
    phone?: string;
    lastname: string;
    firstname: string;
    middlename?: string;
    birthday?: string;
}

export type Form = {
    event: Appointment;
    client: Patient;
    comment: string;
}

export type Step = 'contactInfo' | 'appointmentInfo' | 'result'