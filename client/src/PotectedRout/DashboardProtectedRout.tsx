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
            if (!actionUuser.payload.isLogin) {
                return navigate("/auth", { replace: true });
            }
        })
    }, [user, navigate])

    return user.isLogin && user.userRole === "admin" ? <>{children}</> :
        user.isLogin ? <>{navigate("/", { replace: true })}</> : <>{navigate("/auth", { replace: true })}</>
}

export default DashboardProtectedRout
