import { FC, useEffect, useState } from "react";
import { useResponsivity } from "../../../hooks/useWidth";
import { useAppSelector } from "../../../app/hooks";
import { selectTheme } from "../../../features/dark-light-theme/theme"
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../logo/Logo";
import ThemeSwitchButton from "../../UI/ThemeButton";
import NavigationLinks from "./NavigationLinks";
import MenuIcon from '@mui/icons-material/Menu';
import AsideBar from "./AsideBar";
import { selectAuth } from "../../../features/auth/authSlice";

const linksForUser = [
    // { link: "", title: "Fav Quizes" },
    // { link: "", title: "Statistic" },
    { link: "/profile", title: "Profile" },
]

const Navbar: FC = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [toggleSecondMenu, setToggleSecondMenu] = useState(false);
    const isMobile = useResponsivity()
    const theme = useAppSelector(selectTheme)
    const user = useAppSelector(selectAuth);
    let location = useLocation();

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

                <div
                    className={`navbar__navigation navbar__navigation__${theme}-theme`}
                    style={{ width: user.isLogin ? isMobile ? "20%" : "50%" : isMobile ? "20%" : "15%" }}
                >
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

            {location.pathname.includes("/dashboard") && (
                <AsideBar
                    toggleSecondMenu={toggleSecondMenu}
                    setToggleSecondMenu={setToggleSecondMenu}
                    setToggleMenu={setToggleMenu}
                />
            )}
        </>
    )
}

export default Navbar
