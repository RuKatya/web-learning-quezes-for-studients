import { useAppSelector } from '../../app/hooks'
import { selectTheme } from '../../features/dark-light-theme/theme'

const Logo = () => {
    const theme = useAppSelector(selectTheme)

    return (
        <div className='logo'>
            <img src={`./images/logo/logo-${theme}-theme.svg`} alt="logo of the site" />
        </div>
    )
}

export default Logo
