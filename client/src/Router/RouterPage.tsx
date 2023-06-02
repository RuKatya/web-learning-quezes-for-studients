import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "../View/Layout";
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
import MainPage from "../View/Pages/MainPage/MainPage";
import MainTitle from "../View/Pages/Dashboard/MainTitles/MainTitle";
import MainQuestions from "../View/Pages/Dashboard/MainQuestions/MainQuestions";
import TitlePage, { titleLoader } from "../View/Pages/TitlePage/TitlePage";
import StatisticPage from "../View/Pages/StatisticPage/StatisticPage";
import QuestionPage, { QuestionLoader } from "../View/Pages/QuestionsPage/QuestionPage";
import DoneQuiz from "../View/Pages/DoneQuiz/DoneQuiz";

const RouterPage = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout />} >
                <Route index element={<MainPage />} />
                <Route path="subject/:subject" element={<TitlePage />} loader={titleLoader} />
                <Route path="subject/:subject/:title/statistic" element={<StatisticPage />} />
                <Route path="subject/:subject/:title/questions" element={<QuestionPage />} loader={QuestionLoader} />
                <Route path="subject/:subject/:title/done-quiz" element={<DoneQuiz/>}/>
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
                    <Route path="subjects/:subjectId" element={<MainTitle />} />
                    <Route path="subjects/:subjectId/:titleId" element={<MainQuestions />} />
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