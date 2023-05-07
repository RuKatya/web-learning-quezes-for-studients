import { FC } from 'react'
import { useResponsivity } from '../../../hooks/useWidth'
import { useAppSelector } from '../../../app/hooks'
import { selectAuth } from '../../../features/auth/authSlice'
import LinksOfMav from './LinksOfMav'
import AdminBtn from './AdminBtn'
import LogoutBtn from './LogoutBtn'
import { NavLink } from 'react-router-dom'
import { selectTheme } from '../../../features/dark-light-theme/theme'

interface Links {
    link: string
    title: string
}

interface NavigationLinksProps {
    toggleMenu: boolean
    linksForUser: Array<Links>
    setToggleMenu: Function
    setToggleSecondMenu: Function
}

const NavigationLinks: FC<NavigationLinksProps> = ({ toggleMenu, linksForUser, setToggleMenu, setToggleSecondMenu }) => {
    const isMobile = useResponsivity()
    const user = useAppSelector(selectAuth);
    const theme = useAppSelector(selectTheme)


    return (
        <>
            {(toggleMenu || !isMobile) && (
                <div className={`navbar__navigation--links`}>
                    {
                        user.isLogin ? <>
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
                        </>
                            :
                            <>
                                <NavLink
                                    className={`nav__navigation--link__${theme}-theme`}
                                    to="/auth"
                                    onClick={() => {
                                        setToggleMenu(!toggleMenu)
                                        setToggleSecondMenu(false)
                                    }}
                                >SIGN IN</NavLink>
                            </>
                    }
                </div>)}
        </>
    )
}

export default NavigationLinks
