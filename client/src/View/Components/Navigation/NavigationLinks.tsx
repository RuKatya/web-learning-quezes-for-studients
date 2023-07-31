import { FC } from 'react'
import { useResponsivity } from '../../../hooks/useWidth'
import { useAppSelector } from '../../../app/hooks'
import { selectAuth } from '../../../features/auth/authSlice'
import LinksOfMav from './LinksOfMav'
import AdminBtn from './AdminBtn'
import LogoutBtn from './LogoutBtn'
// import { NavLink } from 'react-router-dom'
import { selectTheme } from '../../../features/dark-light-theme/theme'
import MenuIcon from '@mui/icons-material/Menu';


interface Links {
    link: string
    title: string
}

interface NavigationLinksProps {
    toggleMenu: boolean
    linksForUser: Array<Links>
    setToggleMenu: Function
    // setToggleSecondMenu: Function
    heightOfNavbar: number
}

const NavigationLinks: FC<NavigationLinksProps> = ({ toggleMenu, linksForUser, setToggleMenu,
    // setToggleSecondMenu, 
    heightOfNavbar }) => {
    const isMobile = useResponsivity()
    const user = useAppSelector(selectAuth);
    const theme = useAppSelector(selectTheme)

    return (
        <>
            {isMobile && (
                <MenuIcon fontSize="large"
                    onClick={() => {
                        setToggleMenu(!toggleMenu)
                        // setToggleSecondMenu(false)
                    }}
                />
            )}

            {(toggleMenu || !isMobile) && (
                <div
                    className={`navbar__navigation--links navbar__navigation--links__${theme}-theme`}
                    style={{ top: user.isLogin ? `${heightOfNavbar}px` : '0px' }}>
                    {user.isLogin && linksForUser.map((link, index) => (
                        <LinksOfMav
                            key={index}
                            link={link.link}
                            title={link.title}
                            setToggleMenu={setToggleMenu}
                        />
                    ))}
                    <AdminBtn setToggleMenu={setToggleMenu} />
                    <LogoutBtn />
                </div >)
            }
        </>
    )
}

export default NavigationLinks
