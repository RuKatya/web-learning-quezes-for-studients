import { FC, useEffect, useState } from "react";
import { useResponsivity } from "../../../hooks/useWidth";
import { useAppSelector } from "../../../app/hooks";
import { selectTheme } from "../../../features/dark-light-theme/theme"
import { NavLink } from "react-router-dom";
import Logo from "../../logo/Logo";
import ThemeSwitchButton from "../../UI/ThemeButton";
import NavigationLinks from "./NavigationLinks";
import MenuIcon from '@mui/icons-material/Menu';
import AsideBar from "./AsideBar";

const linksForUser = [
    { link: "", title: "Fav Quizes" },
    { link: "", title: "Statistic" },
    { link: "/profile/1", title: "Profile" },
]

const Navbar: FC = () => {

    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleSecondMenu, setToggleSecondMenu] = useState(false);
    const isMobile = useResponsivity()
    const theme = useAppSelector(selectTheme)

    useEffect(() => {
        setToggleSecondMenu(false)
        setToggleMenu(false)
    }, [isMobile])

    return (
        <>
            <nav className={`navbar navbar__${theme}-theme`}>
                <NavLink to="/" className="homePagebtn">
                    <Logo
                        classProps={"navBar-logo"}
                        setToggleMenu={setToggleMenu}
                        setToggleSecondMenu={setToggleSecondMenu}
                    />
                </NavLink>

                <div className={`navbar__navigation nav__navigation__${theme}-theme`}>
                    <ThemeSwitchButton />
                    <div className="secondNavbar__menuBtn">
                        <MenuIcon fontSize="large"
                            onClick={() => {
                                setToggleMenu(!toggleMenu)
                                setToggleSecondMenu(false)
                            }}
                        />
                    </div>

                    <NavigationLinks
                        toggleMenu={toggleMenu}
                        linksForUser={linksForUser}
                        setToggleMenu={setToggleMenu}
                        setToggleSecondMenu={setToggleSecondMenu}
                    />
                </div>
            </nav>

            <AsideBar
                toggleSecondMenu={toggleSecondMenu}
                setToggleSecondMenu={setToggleSecondMenu}
                setToggleMenu={setToggleMenu}
            />
        </>
    )
}

export default Navbar
