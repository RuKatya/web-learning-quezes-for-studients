import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectAuth } from '../features/auth/authSlice';
import { ProtectedRoutProps } from './ProtectedRoutInterface';
import { checkLogin } from '../features/auth/authAPI';

const DashboardProtectedRout: FC<ProtectedRoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const user = useAppSelector(selectAuth);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(checkLogin()).then((actionUuser: any) => {
            const { isLogin, userRole } = actionUuser.payload
            if (!isLogin) {
                return navigate("/auth", { replace: true });
            }

            if (userRole !== "admin") {
                return navigate("/", { replace: true })
            }
        })
    }, [dispatch, navigate])

    return <>{user.isLogin && user.userRole === "admin" && <>{children}</>}</>
}

export default DashboardProtectedRout
