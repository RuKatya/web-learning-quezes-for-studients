import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks'
import { useParams } from 'react-router-dom'
import { selectOneUser } from '../../../../../features/oneUser/oneUserSlice'
import { getOneUser, updateUserRole } from '../../../../../features/oneUser/oneUserApi'
import DeleteBtn from './DeleteBtn'

const UserPage = () => {
    const { userId } = useParams()
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectOneUser)

    useEffect(() => {
        dispatch(getOneUser(Number(userId)))
    }, [userId, dispatch])

    const handleChangeUserRole = (ev: React.SyntheticEvent) => {
        ev.preventDefault()

        const target = ev.target as typeof ev.target & {
            userRole: { value: string },
            id: string
        }

        console.log(target.id)
        const idUser = Number(target.id)
        const userRole = target.userRole.value

        dispatch(updateUserRole({ userId: idUser, userRole }))
    }

    console.log(user)
    return (
        <div>
            <DeleteBtn userId={Number(userId)} />

            <h1>{user.UserName}</h1>
            <div><h3>Email:</h3> <p>{user.Email}</p></div>
            <div>
                <form onSubmit={handleChangeUserRole} id={userId}>
                    <h3>Role:</h3>
                    <p>{user.UserRole}</p>
                    <select name="userRole">
                        <option disabled>Select User Role</option>
                        <option defaultValue={user.UserRole == "admin" ? "admin" : "user"}>{user.UserRole == "admin" ? "admin" : "user"}</option>
                        <option value={user.UserRole == "admin" ? "user" : "admin"}>{user.UserRole == "admin" ? "user" : "admin"}</option>
                    </select>
                    <button type="submit">Update User Role</button>
                </form>
            </div>
        </div>
    )
}

export default UserPage
