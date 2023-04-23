import { Link } from "react-router-dom";
import { FC, useState } from 'react'
import { selectTheme } from "../../../features/dark-light-theme/theme";
import { useAppSelector } from "../../../app/hooks";
import { selectAuth } from "../../../features/auth/authSlice";
import { useResponsivity } from "../../../hooks/useWidth";
import MenuIcon from '@mui/icons-material/Menu';
import ThemeSwitchButton from "../../UI/ThemeButton";
import Logo from "../../logo/Logo";
import LinksOfMav from "./LinksOfMav";
import AdminBtn from "./AdminBtn";
import LogoutBtn from "./LogoutBtn";

const linksForUser = [
  { link: "", title: "Fav Quizes" },
  { link: "", title: "Statistic" },
  { link: "/profile/1", title: "Profile" },
]

const Navbar: FC = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const user = useAppSelector(selectAuth);
  const theme = useAppSelector(selectTheme)
  const isMobile = useResponsivity()
  const darkBtnColor = "#050f52"
  const lightBtnColor = "#9399c6"

  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <nav className={`nav nav__${theme}-theme`}>
      <Link to="/" className="homePagebtn">
        <Logo />
      </Link>

      <div className="nav__navigation">
        {/* <div onClick={toggleNav} className="menuBtn">
        <MenuIcon sx={{ color: theme === "dark" ? lightBtnColor : darkBtnColor }} />
      </div> */}

        {/* <div className="navigation"> */}
        {/* {(toggleMenu || !isMobile) && (
        // <>
        //   <AdminBtn />
        //   {user.isLogin && linksForUser.map((link, index) => (
        //     <LinksOfMav key={index} link={link.link} title={link.title} />
        //   ))}
        //   <LogoutBtn />
        //   <ThemeSwitchButton />
        // </>
        )} */}
        {/* <>
          {user.isLogin && linksForUser.map((link, index) => (
            <LinksOfMav key={index} link={link.link} title={link.title} />
            ))}
            <LogoutBtn />
          </> */}
        <AdminBtn />
        <ThemeSwitchButton />
        {user.isLogin ? <LogoutBtn /> : <Link to="/auth">SIGN IN</Link>}
      </div>
      {/* </div> */}



    </nav>
  );
};

export default Navbar;