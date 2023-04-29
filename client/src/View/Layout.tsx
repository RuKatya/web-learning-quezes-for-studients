import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Components/Navigation/Navbar'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectTheme } from '../features/dark-light-theme/theme'
import { checkLogin } from '../features/auth/authAPI'

const Layout = () => {
    let location = useLocation();
    const dispatch = useAppDispatch()
    const theme = useAppSelector(selectTheme)

    useEffect(() => {
        dispatch(checkLogin())
    }, [dispatch])

    useEffect(() => {
        const body = document.querySelector('body') as HTMLBodyElement
        const root = document.querySelector("#root") as HTMLDivElement

        if (location.pathname.includes("/auth")) {
            root.classList.remove("root-background-img")
        } else {
            root.classList.add("root-background-img")
        }

        if (theme === "dark") {
            body?.classList.add("dark-body")
            body?.classList.remove("light-body")
        } else {
            body?.classList.add("light-body")
            body?.classList.remove("dark-body")
        }
    }, [theme, location])

    // console.log(location.pathname)
    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
