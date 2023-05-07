import { FC } from 'react'
import { useResponsivity } from '../../../hooks/useWidth'
import { selectTheme } from '../../../features/dark-light-theme/theme'
import { useAppSelector } from '../../../app/hooks'
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useLocation } from 'react-router-dom';

interface toggleSecondMenu {
    toggleSecondMenu: boolean,
    setToggleSecondMenu: Function,
    setToggleMenu: Function
}
const AsideBar: FC<toggleSecondMenu> = ({ toggleSecondMenu, setToggleSecondMenu, setToggleMenu }) => {
    const isMobile = useResponsivity()
    const theme = useAppSelector(selectTheme)
    const location = useLocation()

    return (
        location.pathname === "/" ?
            null :
            <aside className={`secondNavbar secondNavbar__${theme}-theme`}>
                <div className="secondNavbar__menuBtn">
                    <MenuIcon
                        onClick={() => {
                            setToggleSecondMenu(!toggleSecondMenu)
                            setToggleMenu(false)
                        }} />
                </div>
                {(toggleSecondMenu || !isMobile) && (
                    <div className={`secondNavbar__navigation secondNavbar__navigation__${theme}-theme`}>
                        <NavLink
                            to="html"
                            onClick={() => setToggleSecondMenu(false)}
                        >HTML</NavLink>
                        <NavLink
                            to="css"
                            onClick={() => setToggleSecondMenu(false)}
                        >CSS</NavLink>
                        <NavLink
                            to="javascript"
                            onClick={() => setToggleSecondMenu(false)}
                        >javaScript</NavLink>
                    </div>
                )}
            </aside>)
}

export default AsideBar
