import axios from 'axios'
import { FC, Suspense, useEffect, useState } from 'react'
import { Await, Outlet, defer, useLoaderData } from 'react-router-dom'

interface DashboardProps {
  setUser: Function
}
const Dashboard: FC<DashboardProps> = ({ setUser }) => {
  const {data}: any = useLoaderData()
  const [errorFromServer, setErrorFromServer] = useState()
  console.log(data.data)

  useEffect(() => {
    const { continueWork, message, isLogin, userName, userRole } = data

    if (!continueWork) {
      return setErrorFromServer(message)
    }

    return setUser({ isLogin, userName, userRole })
  })

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Await resolve={data}>
        <div>sidebar</div>
        <h1>Dashboard</h1>
        <Outlet />
      </Await>
    </Suspense>

  )
}

const checkUser = async () => {
  // const { data }: any = axios.get("/users/check-cookies")
  const data : any = axios.get("/users/check-cookies")
  console.log(data)
  return data
}

export const dashboardLoader = async () => {
  return defer({
    data: await checkUser()
  })
}

export default Dashboard