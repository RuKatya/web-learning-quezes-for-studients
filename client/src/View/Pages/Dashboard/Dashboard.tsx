import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardNavigation from '../../Components/DashboardNavigation/DashboardNavigation'
import { useAppSelector } from '../../../app/hooks'
import { selectTheme } from '../../../features/dark-light-theme/theme'

const Dashboard: FC = () => {
  const theme = useAppSelector(selectTheme)

  return (
    <div className={`dashboardMain dashboardMain__${theme}-theme`}>
      <DashboardNavigation />
      <Outlet />
    </div>
  )
}

export default Dashboard