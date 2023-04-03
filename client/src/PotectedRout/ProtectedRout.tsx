import { FC, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { CurrentUser } from '../context/CurrentUser';

interface ProtectedRoutProps {
    children?: ReactNode
}

const ProtectedRout: FC<ProtectedRoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const { isLogin } = CurrentUser()

    useEffect(() => {
        if (!isLogin) {
            return navigate("/auth", { replace: true });
        }
    }, [isLogin, navigate])

    return <>{children}</>
}

export default ProtectedRout