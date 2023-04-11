import { Link } from "react-router-dom";
import { FC } from 'react'
import { useAppSelector } from "../../../app/hooks";
import { selectAuth } from "../../../features/auth/authSlice";
import ThemeSwitchButton from "../../UI/ThemeButton";
import Logo from "../../logo/Logo";
import { selectTheme } from "../../../features/dark-light-theme/theme";
import LinksOfMav from "./LinksOfMav";
import AdminBtn from "./AdminBtn";
import LogoutBtn from "./LogoutBtn";

const linksForUser = [
  { link: "", title: "Fav Quizes" },
  { link: "", title: "Statistic" },
  { link: "/profile/1", title: "Profile" },
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
        <AdminBtn />
        {user.isLogin && linksForUser.map((link, index) => (
          <LinksOfMav key={index} link={link.link} title={link.title} />
        ))
        }
        <LogoutBtn />
        <ThemeSwitchButton />
      </div>
    </nav>
  );
};

export default Navbar;