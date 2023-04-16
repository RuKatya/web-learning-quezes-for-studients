import { Link, useLocation } from 'react-router-dom'
import DashboardLink from './DashboardLink';

const dashboardLinks = [
    { to: "dashboard", title: "Dashboard" },
    { to: "dashboard", title: "Users" },
    { to: "dashboard", title: "Statistic" },
    { to: "dashboard", title: "Dashboard" }
]

const DashboardNavigation = () => {

    return (
        <aside className='asideDashboardNav'>
            {
                dashboardLinks.map(link => (
                    <DashboardLink />
                ))
            }
            {/* <Link to="/dashboard">Dashboard</Link>
            <Link to="/dashboard">Users</Link>
            <Link to="/dashboard">Statistic</Link>
            <Link to="/dashboard">Dashboard</Link> */}
        </aside>
    )
}

export default DashboardNavigation
