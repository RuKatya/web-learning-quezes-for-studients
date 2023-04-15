import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardNavigation from '../../Components/DashboardNavigation/DashboardNavigation'

const Dashboard: FC = () => {
  return (
    <div className='dashboardMain'>
      <DashboardNavigation />
      <Outlet />
    </div>
  )
}

export default Dashboard