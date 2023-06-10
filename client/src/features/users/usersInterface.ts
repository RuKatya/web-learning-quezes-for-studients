export interface User {
    UserID: number
    UserName: string
}

export interface UsersList {
    list: Array<User>,
    status: 'idle' | 'loading' | 'failed',
    message?: string
}

export interface getDataFromServer {
    message?: string,
    continueWork: boolean
}

export interface getAllUserPayload extends getDataFromServer {
    users: Array<{ UserName: string, UserID: number }>
}