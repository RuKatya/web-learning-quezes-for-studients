export interface User {
    isLogin: boolean,
    userName: string,
    userRole: string,
}

export interface AuthState {
    user: User,
    status: 'idle' | 'loading' | 'failed';
}

export interface CheckLogin extends User {
    continueWork: boolean,
    isLogin: boolean
}