import React, { useEffect } from 'react'
import { selectUsers } from '../../../../../features/users/usersSlice'
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks'
import { useParams } from 'react-router-dom'
import { selectOneUser } from '../../../../../features/oneUser/oneUserSlice'
import { getOneUser } from '../../../../../features/oneUser/oneUserApi'

const UserPage = () => {
    const { userId } = useParams()
    const dispatch = useAppDispatch()
    const users = useAppSelector(selectOneUser)

    useEffect(() => {
        dispatch(getOneUser(Number(userId)))
    }, [userId])

    return (
        <div >
            <h1>USER ONE</h1>
            <div>{users.UserName}</div>
            <div>{users.Email}</div>
            <div>{users.UserRole}</div>
        </div>
    )
}

export default UserPage
