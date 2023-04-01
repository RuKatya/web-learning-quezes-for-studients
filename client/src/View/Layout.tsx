import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
// import PropTypes from 'prop-types'

const Layout = () => {
    const [admin, setAdmin] = useState<string>()

    // localStorage.setItem('AdminKatya', JSON.stringify("KatyaAdmin"))

    useEffect(() => {
        const localStorageData: string | null = localStorage.getItem('AdminKatya')
        if (localStorageData !== null) {
            const item = JSON.parse(localStorageData)
            setAdmin(item)
        }
    }, [])

    return (
        <div>
            <Navbar admin={admin} />
            <Outlet />
        </div>
    )
}

// Layout.propTypes = {

// }

export default Layout
