import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectAuth } from '../features/auth/authSlice';
import { ProtectedRoutProps } from './ProtectedRoutInterface';
import { checkLogin } from '../features/auth/authAPI';

const UserProtectedRout: FC<ProtectedRoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectAuth);

    useEffect(() => {
        dispatch(checkLogin()).then((actionUuser: any) => {
            if (!actionUuser.payload.isLogin) {
                return navigate("/auth", { replace: true });
            }
        })
    }, [user, navigate])

    return <>{children}</>
}

export default UserProtectedRout