export interface LoginUser {
    email: string
    password: string
}

export interface LoginData {
    continueWork?: boolean
    isLogin?: boolean
    message?: string
    userName?: string
    userRole?: string
}