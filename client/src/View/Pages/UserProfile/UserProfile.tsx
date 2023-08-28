import axios from 'axios'
import { Suspense } from 'react'
import { Await, defer, useLoaderData } from 'react-router-dom'
import LoadingPage from '../../UI/LoadingPage'

const UserProfile = () => {
    const { user: { continueWork, userName, email, message } }: any = useLoaderData()

    return (
        <Suspense fallback={<LoadingPage />}>
            <Await resolve={continueWork}>
                {continueWork ? <div>
                    <h1>USER PROFILE</h1>
                    <p>{email}</p>
                    <p>{userName}</p>
                    <button>Update UserName</button>
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
