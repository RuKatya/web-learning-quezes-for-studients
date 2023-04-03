import { useState, useContext } from 'react'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements, } from "react-router-dom";
import Layout from "../View/Layout";
import App from "../App";
import Login from "../View/Pages/Auth/Login/Login";
import Auth from "../View/Pages/Auth/Auth";
import Registration from "../View/Pages/Auth/Regist/Registration";
import { registAction } from "../View/Pages/Auth/Regist/RegistActions";
import { loginAction } from "../View/Pages/Auth/Login/LoginActions";
import Dashboard from "../View/Pages/Dashboard/Dashboard";
import ProtectedRout from "../PotectedRout/ProtectedRout";
import CurrentUser from "../context/CurrentUser";

const RouterPage = () => {
    const [user, setUser] = useState({})
    const loggedUser = useContext(CurrentUser)
    console.log(loggedUser)

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>

                <Route path="/" element={<Layout />}>
                    <Route index element={<App />} />
                    <Route path="auth" element={<Auth />} action={loginAction}>
                        <Route index element={<Login setUser={setUser} />} />
                        <Route path="registretion" element={<Registration />} action={registAction} />
                    </Route>
                    <Route path="dashboard" element={
                        <ProtectedRout isLogin={false}>
                            <Dashboard />
                        </ProtectedRout>
                    } />

                    {/* </Route> */}
                </Route>
                {/* </CurrentUser.Provider> */}
            </>
        )
    )

    return <CurrentUser.Provider value={user}>
        <RouterProvider router={router} />
    </CurrentUser.Provider>
}

export default RouterPage
