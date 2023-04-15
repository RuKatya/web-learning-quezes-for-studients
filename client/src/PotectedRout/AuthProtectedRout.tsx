import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { checkLogin } from '../features/auth/authAPI';
import { ProtectedRoutProps } from './ProtectedRoutInterface';

const AuthProtectedRout: FC<ProtectedRoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(checkLogin()).then((actionUuser: any) => {
            if (actionUuser.payload.isLogin) {
                return navigate("/", { replace: true });
            }
        })
    })

    return (<>{children}</>)
}

export default AuthProtectedRout
