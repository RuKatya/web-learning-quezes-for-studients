import React from 'react'
import { Link } from 'react-router-dom'

const DashboardNavigation = () => {
    return (
        <aside className='asideDashboardNav'>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/dashboard">users</Link>
            <Link to="/dashboard">statistic</Link>
            <Link to="/dashboard">Dashboard</Link>
        </aside>
    )
}

export default DashboardNavigation
