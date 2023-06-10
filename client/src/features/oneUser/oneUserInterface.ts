import { User, getDataFromServer } from "../users/usersInterface";

export interface oneUser extends User {
    Email: string
    UserRole: string
}

export interface oneUserInit {
    user: oneUser,
    message?: string,
    status: 'idle' | 'loading' | 'failed'
}

export interface getUserPayload extends getDataFromServer {
    user: oneUser
}