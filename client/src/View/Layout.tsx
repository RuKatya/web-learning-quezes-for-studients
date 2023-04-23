import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navigation/Navbar'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectTheme } from '../features/dark-light-theme/theme'
import { checkLogin } from '../features/auth/authAPI'

const Layout = () => {
    const theme = useAppSelector(selectTheme)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(checkLogin())
    }, [dispatch])

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
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
