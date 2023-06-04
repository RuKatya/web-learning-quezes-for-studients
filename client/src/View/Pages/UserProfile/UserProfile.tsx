import axios from 'axios'
import React, { Suspense } from 'react'
import { Await, defer, useLoaderData } from 'react-router-dom'
import LoadingPage from '../../UI/LoadingPage'

const UserProfile = () => {
    const { user: { continueWork, UserName, Email, message } }: any = useLoaderData()
    console.log(continueWork, UserName, Email)

    return (
        <Suspense fallback={<LoadingPage />}>
            <Await resolve={continueWork}>
                {continueWork ? <div>
                    <h1>USER PROFILE</h1>
                    <p>{UserName}</p>
                    <p>{Email}</p>
                </div> : <div>{message}</div>}
            </Await>
        </Suspense>
    )
}

const getUserData = async () => {
    const { data } = await axios.get("/users/get-user-profile")
    return data
}

export const profileLoader = async () => {
    return defer({
        user: await getUserData()
    })
}
export default UserProfile
