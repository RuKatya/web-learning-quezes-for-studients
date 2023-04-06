import { useEffect, useState } from 'react'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "../View/Layout";
import App from "../App";
import Login from "../View/Pages/Auth/Login/Login";
import Auth from "../View/Pages/Auth/Auth";
import Registration from "../View/Pages/Auth/Regist/Registration";
import { registAction } from "../View/Pages/Auth/Regist/RegistActions";
import { loginAction } from "../View/Pages/Auth/Login/LoginActions";
import Dashboard, { dashboardLoader } from "../View/Pages/Dashboard/Dashboard";
import ProtectedRout from "../PotectedRout/ProtectedRout";
import { CurrentUserContext } from '../context/CurrentUser';

interface UserDetails {
    isLogin: boolean,
    userName: string,
    userRole: string
}

const RouterPage = () => {
    const [user, setUser] = useState<UserDetails>({ isLogin: false, userName: "", userRole: "" })

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout />}>
                <Route index element={<App />} />
                <Route path="auth" element={<Auth />} action={loginAction}>
                    <Route index element={<Login setUser={setUser} />} />
                    <Route path="registretion" element={<Registration />} action={registAction} />
                </Route>
                <Route path="dashboard" element={
                     <ProtectedRout>
                        <Dashboard setUser={setUser} />
                    </ProtectedRout>
                } loader={dashboardLoader}/>
            </Route>
        )
    )

    return <CurrentUserContext.Provider value={user}>
        <RouterProvider router={router} />
    </CurrentUserContext.Provider>
}

export default RouterPage
