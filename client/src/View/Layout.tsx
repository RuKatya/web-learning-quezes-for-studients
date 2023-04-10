import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navigation/Navbar'
import { useAppSelector } from '../app/hooks'
import { selectTheme } from '../features/dark-light-theme/theme'

const Layout = () => {
    const theme = useAppSelector(selectTheme)

    useEffect(() => {
        const body = document.querySelector('body')

        if (theme === "dark") {
            body?.classList.add("dark-body")
            body?.classList.remove("light-body")
        } else {
            body?.classList.add("light-body")
            body?.classList.remove("dark-body")
        }
    }, [theme])

    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Layout
