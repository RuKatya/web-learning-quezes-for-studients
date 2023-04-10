import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard: FC = () => {
  return (
    <>
      <div>sidebar</div>
      <h1>Dashboard</h1>
      <Outlet />
    </>
  )
}

export default Dashboard

/*
 
interface DashboardProps {
  setUser: Function
}

// const checkUser = async () => {
//   // const { data }: any = axios.get("/users/check-cookies")
//   const data: any = axios.get("/users/check-cookies")
//   console.log(data)
//   return data
// }
 
// export const dashboardLoader = async () => {
//   return defer({
//     data: await checkUser()
//   })
// }

    // const {data}: any = useLoaderData()
    // const [errorFromServer, setErrorFromServer] = useState()
    // console.log(data.data)

    // useEffect(() => {
    //   const { continueWork, message, isLogin, userName, userRole } = data

    //   if (!continueWork) {
    //     return setErrorFromServer(message)
    //   }

    //   return setUser({ isLogin, userName, userRole })
    // })


*/