import { useState } from 'react';
import DashboardLink from './DashboardLink';

const dashboardLinks = [
    { to: "dashboard", title: "Dashboard" },
    { to: "dashboard", title: "Users" },
    { to: "dashboard", title: "Statistic" },
    // { to: "dashboard", title: "Dashboard" }
]

const DashboardNavigation = () => {
    const [activeSideNav, setActiveSideNav] = useState<string>("Dashboard")


    return (
        <aside className='asideDashboardNav'>
            {
                dashboardLinks.map(link => (
                    <DashboardLink link={link} setActiveSideNav={setActiveSideNav} activeSideNav={activeSideNav} />
                ))
            }
        </aside>
    )
}

export default DashboardNavigation
