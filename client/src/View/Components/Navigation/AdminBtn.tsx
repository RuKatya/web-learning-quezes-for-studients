import { useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/authSlice';
import { NavLink } from 'react-router-dom';
import { selectTheme } from '../../../features/dark-light-theme/theme';
import { FC } from 'react';

interface AdminBtnProps {
    setToggleMenu: Function
}
const AdminBtn: FC<AdminBtnProps> = ({ setToggleMenu }) => {
    const user = useAppSelector(selectAuth);
    const theme = useAppSelector(selectTheme)

    return (
        <>
            {user.isLogin && user.userRole === "admin" && (
                <NavLink
                    to="/dashboard"
                    className={`navbar__navigation--link navbar__navigation--link__${theme}-theme`}
                    onClick={() => setToggleMenu(false)}
                >Dashboard</NavLink>
            )}
        </>
    )
}

export default AdminBtn
