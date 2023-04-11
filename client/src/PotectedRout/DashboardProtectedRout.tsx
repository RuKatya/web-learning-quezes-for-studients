import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectAuth } from '../features/auth/authSlice';
import { ProtectedRoutProps } from './ProtectedRoutInterface';


const DashboardProtectedRout: FC<ProtectedRoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const user = useAppSelector(selectAuth);

    useEffect(() => {
        if (!user.isLogin) {
            return navigate("/auth", { replace: true });
        }
    }, [user, navigate])

    return user.isLogin && user.userRole === "admin" ? <>{children}</> : <>{navigate("/auth", { replace: true })}</>
}

export default DashboardProtectedRout
