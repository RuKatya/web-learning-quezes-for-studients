import {FC} from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard:FC = () => {
  return (
    <>
    <div>sidebar</div>
    <h1>Dashboard</h1>
    <Outlet/>
    </>
  )
}

export default Dashboard