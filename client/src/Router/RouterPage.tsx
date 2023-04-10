import { useEffect, useState } from 'react'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "../View/Layout";
import App from "../App";
import Login from "../View/Pages/Auth/Login/Login";
import Auth from "../View/Pages/Auth/Auth";
import Registration from "../View/Pages/Auth/Regist/Registration";
import { registAction } from "../View/Pages/Auth/Regist/RegistActions";
import { loginAction } from "../View/Pages/Auth/Login/LoginActions";
import Dashboard from "../View/Pages/Dashboard/Dashboard";
import UserProfile from "../View/Pages/UserProfile/UserProfile";
import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../features/auth/authSlice";
// import { useTheme } from '../hooks/useTheme';
import { selectTheme } from '../features/dark-light-theme/theme';

const RouterPage = () => {
    // const [theme, setTheme] = useState(useTheme);

    // useEffect(() => {
    //     localStorage.setItem("theme", theme);
    // }, [theme]);

    const theme = useAppSelector(selectTheme)
    console.log(theme)

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout />}>
                <Route index element={<App />} />
                <Route path="auth" element={<Auth />} action={loginAction}>
                    <Route index element={<Login />} />
                    <Route path="registretion" element={<Registration />} action={registAction} />
                </Route>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile/:id" element={<UserProfile />} />
            </Route>
        )
    )

    return <RouterProvider router={router} />
}

export default RouterPage

/*

interface UserDetails {
isLogin: boolean,
userName: string,
userRole: string
}*/
    // const [user, setUser] = useState<UserDetails>({ isLogin: false, userName: "", userRole: "" })
//     {/* //  <ProtectedRout>
//         // setUser={setUser}
//         // </ProtectedRout> */}
//     {/* // loader={dashboardLoader}  */}
//     {/* // setUser={setUser} */}
// // <CurrentUserContext.Provider value={user}>
// // </CurrentUserContext.Provider>