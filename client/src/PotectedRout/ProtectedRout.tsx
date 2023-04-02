import { FC, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// import { Navigate } from 'react-router-dom'

interface ProtectedRoutProps {
    isLogin: boolean,
    children?: ReactNode
}
const ProtectedRout:FC<ProtectedRoutProps> = ({isLogin, children}) => {
    const navigate = useNavigate();
    useEffect(()=>{
        if(!isLogin) {
            return navigate("/auth", {replace:true});
        }
    },[isLogin])

  return <>{children}</>
}

export default ProtectedRout