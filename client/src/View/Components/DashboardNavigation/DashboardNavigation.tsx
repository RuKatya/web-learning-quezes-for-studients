import { useState } from 'react';
import DashboardLink from './DashboardLink';
import { selectTheme } from '../../../features/dark-light-theme/theme';
import { useAppSelector } from '../../../app/hooks';

const dashboardLinks = [
    { to: "dashboard", title: "Dashboard" },
    { to: "dashboard/allUser", title: "Users" },
    { to: "dashboard/user-statisic", title: "Statistic" },
]

const DashboardNavigation = () => {
    const [activeSideNav, setActiveSideNav] = useState<string>("Dashboard")
    const theme = useAppSelector(selectTheme)

    return (
        <aside className={`asideDashboardNav asideDashboardNav__${theme}-theme`}>
            {dashboardLinks.map((link, index) => (
                <DashboardLink key={index} link={link} setActiveSideNav={setActiveSideNav} activeSideNav={activeSideNav} />))}
        </aside>
    )
}

export default DashboardNavigation
