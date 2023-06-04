import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectTheme } from '../features/dark-light-theme/theme'
import { checkLogin } from '../features/auth/authAPI'
import PagesNavigation from './Components/PagesNavigation/PagesNavigation'
import Navbar from './Components/Navigation/NavBar'
// import Navbar from './Components/Navigation/Navbar'

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

        if (location.pathname.includes("/auth") || location.pathname.includes("/subject/")) {
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

    return (
        <div>
            <Navbar />
            <main>
                <PagesNavigation />
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
