import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../../app/hooks'
import { selectTheme } from '../../../features/dark-light-theme/theme'

interface LinkProps {
    link: {
        to: string,
        title: string
    },
    activeSideNav: string,
    setActiveSideNav: Function
}

const DashboardLink = ({ link, setActiveSideNav, activeSideNav }: LinkProps) => {
    const theme = useAppSelector(selectTheme)

    return (<NavLink
        to={`/${link.to}`}
        className={`asideDashboardNav__link ${activeSideNav === link.title ?
            `activeSideNavLink activeSideNavLink__${theme}-theme` : ""}`} onClick={() => setActiveSideNav(link.title)}>{link.title}</NavLink >)
}

export default DashboardLink