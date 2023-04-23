import { useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/authSlice';
import { Link } from 'react-router-dom';
import { selectTheme } from '../../../features/dark-light-theme/theme';

const AdminBtn = () => {
    const user = useAppSelector(selectAuth);
    const theme = useAppSelector(selectTheme)

    return (
        <>
            {user.isLogin && user.userRole === "admin" && (
                <Link
                    to="/dashboard"
                    className={`navigation__link navigation__link--${theme}`}
                >Dashboard</Link>
            )}
        </>
    )
}

export default AdminBtn
