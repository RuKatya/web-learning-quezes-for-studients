import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { checkLogin } from '../../../features/auth/authAPI'
import { selectAuth } from '../../../features/auth/authSlice'

const UserProfile = () => {
    const user = useAppSelector(selectAuth);

    return (
        <div>
            <h1>USER PROFILE</h1>
        </div>
    )
}

export default UserProfile
