import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectAuth } from '../features/auth/authSlice';
import { checkLogin } from '../features/auth/authAPI';
import { ProtectedRoutProps } from './ProtectedRoutInterface';

const AuthProtectedRout: FC<ProtectedRoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectAuth);

    useEffect(() => {
        dispatch(checkLogin()).then((actionUuser: any) => {
            if (actionUuser.payload.isLogin) {
                return navigate("/", { replace: true });
            }
        })
    }, [user, navigate])

    return (<>{children}</>)
}

export default AuthProtectedRout
