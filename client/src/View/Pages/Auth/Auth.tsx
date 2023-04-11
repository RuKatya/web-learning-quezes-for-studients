import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/authSlice';

const Auth = () => {
    const user = useAppSelector(selectAuth);

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default Auth
