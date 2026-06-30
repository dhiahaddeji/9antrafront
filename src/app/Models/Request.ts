export class Request {
    id?: number
    firstName?: string 
    lastName?: string
    country?: string
    phoneNumber?: number
    email?: string
    formationName?: string
    requestStatus?: string
}

export enum RequestStatus {
    PAID, UNPAID, CANCELED
}