import { createContext, useContext } from 'react'

interface CurrentUserContextInterface {
    isLogin: boolean,
    userName: string,
    userRole: string
}

export const CurrentUserContext = createContext<CurrentUserContextInterface>({ isLogin: false, userName: "", userRole: "" })

export const CurrentUser = () => useContext(CurrentUserContext)