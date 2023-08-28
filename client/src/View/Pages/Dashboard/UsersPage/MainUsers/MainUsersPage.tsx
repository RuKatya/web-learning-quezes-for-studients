import { FC, useEffect } from "react"
import { getAllUsers } from "../../../../../features/users/usersApi"
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks"
import { selectUsers } from "../../../../../features/users/usersSlice"
import { Link } from "react-router-dom"

const MainUsersPage: FC = () => {
    const dispatch = useAppDispatch()
    const users = useAppSelector(selectUsers)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    return (
        <div>
            <h1>USERS</h1>
            <div>
                {users.map(user => (
                    <Link key={user.UserID} to={`/dashboard/allUser/user/${user.UserID}`}>{user.UserName}</Link>
                ))}
            </div>
        </div>
    )
}

export default MainUsersPage
