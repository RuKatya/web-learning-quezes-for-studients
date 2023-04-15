import { useAppSelector } from '../../app/hooks'
import { selectTheme } from '../../features/dark-light-theme/theme'
import logoDarkTheme from '../../images/logo/logoDarkTheme.svg';
import logoLightTheme from '../../images/logo/logoLightTheme.svg';

const Logo = () => {
    const theme = useAppSelector(selectTheme)

    return (
        <div className='logo'>
            <img src={theme === "dark" ? logoDarkTheme : logoLightTheme} alt="logo of the site" />
        </div>
    )
}

export default Logo
