// import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { FC } from 'react'
import { useAppSelector } from "../../../app/hooks";
import { selectAuth } from "../../../features/auth/authSlice";
import ThemeSwitchButton from "../../UI/ThemeButton";
import Logo from "../../logo/Logo";
import { selectTheme } from "../../../features/dark-light-theme/theme";
import LinksOfMav from "./LinksOfMav";

const linksForUser = [
  { link: "", title: "Fav Quizes" },
  { link: "", title: "Statistic" },
  { link: "/profile", title: "Profile" },
  { link: "/", title: "Logout" },
]
const Navbar: FC = () => {
  const user = useAppSelector(selectAuth);
  const theme = useAppSelector(selectTheme)

  return (
    <nav className={`nav nav__${theme}-theme`}>
      <Link to="/" className="homePagebtn">
        <Logo />
      </Link>
      <div className={`navigation`}>
        {user.isLogin && user.userRole === "admin" && (
          <Link
            to="/dashboard"
            className={`navigation__link navigation__link--${theme}`}
          >Dashboard</Link>
        )}
        {user.isLogin && linksForUser.map(link => (
          <LinksOfMav link={link.link} title={link.title} />
        ))}
        <ThemeSwitchButton />
      </div>
    </nav>
  );
};

export default Navbar;


/*

 <Link
            to=""
            className={`navigation__link navigation__link--${theme}`}
          >Fav Quizes <span>11</span></Link>
          <Link
            to=""
            className={`navigation__link navigation__link--${theme}`}
          >Statistic</Link>
          <Link
            to="/profile"
            className={`navigation__link navigation__link--${theme}`}
          >Profile</Link>
          <Link
            to="logout"
            className={`navigation__link navigation__link--${theme}`}
          >{user.userName} | Logut</Link>
        </> 

        */
