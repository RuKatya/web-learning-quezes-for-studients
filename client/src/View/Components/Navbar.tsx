// import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { FC } from 'react'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../features/auth/authSlice";
import { selectTheme, setUserTheme } from "../../features/dark-light-theme/theme";

const Navbar: FC = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectAuth);
  const theme = useAppSelector(selectTheme)

  return (
    <div>
      <Link to="/">Home</Link>
      {user.isLogin && user.userRole === "admin" ? (
        <>
          <Link to="/profile">PROFILE</Link>
          <Link to="/dashboard">DASHBOARD</Link>
        </>
      ) : (
        user.isLogin &&
        user.userRole === "user" && (
          <>
            <Link to="/profile">PROFILE</Link>
          </>
        )
      )}
      {user.isLogin && <Link to="logout">{user.userName} | Logut</Link>}
      <img
        src={
          theme === "dark"
            ? `/images/icons/sun.svg`
            : `/images/icons/moon.svg`
        }
        alt="change icon theme"
        onClick={
          () => dispatch(setUserTheme(theme == "dark" ? "light" : "dark"))
        }
      />
      <div>{theme}</div>
    </div>
  );
};

export default Navbar;
