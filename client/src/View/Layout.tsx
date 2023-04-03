import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import { CurrentUser } from '../context/CurrentUser'

const Layout = () => {
    const [admin, setAdmin] = useState<string>()
    const navigate = useNavigate();
    const currentUserLogin = CurrentUser()

    // localStorage.setItem('AdminKatya', JSON.stringify("KatyaAdmin"))

    useEffect(() => {
        const localStorageData: string | null = localStorage.getItem('AdminKatya')
        if (localStorageData !== null) {
            const item = JSON.parse(localStorageData)
            setAdmin(item)
        }
    }, [])

    useEffect(() => {
        if (currentUserLogin.isLogin) {
            return navigate("/dashboard", { replace: true })
        }
    }, [currentUserLogin, navigate])

    return (
        <div>
            <Navbar admin={admin} />
            <Outlet />
        </div>
    )
}

export default Layout
