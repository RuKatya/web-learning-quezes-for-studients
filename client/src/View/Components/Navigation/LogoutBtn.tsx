import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAuth } from '../../../features/auth/authSlice';
import { Link } from 'react-router-dom';
import { selectTheme } from '../../../features/dark-light-theme/theme';
import { logout } from '../../../features/auth/authAPI';

const LogoutBtn = () => {
    const user = useAppSelector(selectAuth);
    const theme = useAppSelector(selectTheme)
    const dispatch = useAppDispatch()

    return (
        <>
            {
                user.isLogin && <Link
                    to="/"
                    className={`navbar__navigation--link navbar__navigation--link__${theme}-theme`}
                    onClick={() => dispatch(logout())}
                >{user.userName} | Logout</Link>
            }
        </>
    )
}

export default LogoutBtn
