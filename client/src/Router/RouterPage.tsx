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
import UserProtectedRout from "../PotectedRout/UserProtectedRout";
import DashboardProtectedRout from "../PotectedRout/DashboardProtectedRout";
import AuthProtectedRout from "../PotectedRout/AuthProtectedRout";
import MainDashboard from "../View/Pages/Dashboard/MainDashboard/MainDashboard";
import MainTitleSubject from "../View/Pages/Dashboard/TitlesSubject/MainTitleSubject";

const RouterPage = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout />}>
                <Route index element={<App />} />
                <Route path="auth" element={
                    <AuthProtectedRout>
                        <Auth />
                    </AuthProtectedRout>
                } action={loginAction}>
                    <Route index element={<Login />} />
                    <Route path="registretion" element={<Registration />}
                        action={registAction}
                    />
                </Route>
                <Route path="dashboard" element={
                    <DashboardProtectedRout>
                        <Dashboard />
                    </DashboardProtectedRout>
                }  >
                    <Route index element={<MainDashboard />} />
                    <Route path="subjects/:subjectId" element={<MainTitleSubject />} />
                </Route>
                <Route path="profile/:id" element={
                    <UserProtectedRout>
                        <UserProfile />
                    </UserProtectedRout>
                } />
            </Route>
        )
    )

    return <RouterProvider router={router} />
}

export default RouterPage