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

const RouterPage = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Layout />}>
                    <Route index element={<App />} />
                    <Route path="auth" element={<Auth />} action={loginAction}>
                        <Route index element={<Login />} />
                        <Route path="registretion" element={<Registration />} action={registAction} />
                    </Route>
                    <Route path="dashboard" element={
                    <ProtectedRout isLogin={true}>
                        <Dashboard/>
                    </ProtectedRout>
                    }/>

                    {/* </Route> */}
                </Route>
            </>
        )
    )

    return <RouterProvider router={router} />
}

export default RouterPage
