import axios from 'axios'
import { Suspense, useState } from 'react'
import { Await, defer, useLoaderData } from 'react-router-dom'
import LoadingPage from '../../UI/LoadingPage'
import { useAppDispatch } from '../../../app/hooks'
import { chengeUserName } from '../../../features/auth/authAPI'

const UserProfile = () => {
    const dispatch = useAppDispatch()
    const { user: { continueWork, userName, email, message } }: any = useLoaderData()
    const [showUpdate, setShowUpdate] = useState<boolean>(false)

    const handleChangeUserName = (ev: React.SyntheticEvent) => {
        ev.preventDefault()

        const target = ev.target as typeof ev.target & {
            newUserName: { value: string }
        }

        const newUserName = target.newUserName.value

        dispatch(chengeUserName(newUserName))
        setShowUpdate(!showUpdate)
    }
    return (
        <Suspense fallback={<LoadingPage />}>
            <Await resolve={continueWork}>
                {continueWork ? <div>
                    <h1>USER PROFILE</h1>
                    <p>{email}</p>
                    <p>{userName}</p>
                    <button onClick={() => setShowUpdate(!showUpdate)}>{showUpdate ? " Close" : "Update UserName"}</button>
                    {
                        showUpdate && (
                            <div>
                                <form onSubmit={handleChangeUserName}>
                                    <input type="text" defaultValue={userName} name="newUserName" />
                                    <button type='submit'>Change Username</button>
                                </form>
                            </div>
                        )
                    }
                    <button>Delete Account</button>
                </div> : <div>{message}</div>}
            </Await>
        </Suspense>
    )
}

const getUserData = async () => {
    const { data } = await axios.get("/user/get-user-profile")
    return data
}

export const profileLoader = async () => {
    return defer({
        user: await getUserData()
    })
}
export default UserProfile
