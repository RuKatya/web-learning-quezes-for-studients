import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { ProtectedRoutProps } from './ProtectedRoutInterface';
import { checkLogin } from '../features/auth/authAPI';

const UserProtectedRout: FC<ProtectedRoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(checkLogin()).then((actionUuser: any) => {
            if (!actionUuser.payload.isLogin) {
                return navigate("/auth", { replace: true });
            }
        })
    }, [dispatch, navigate])

    return <>{children}</>
}

export default UserProtectedRout