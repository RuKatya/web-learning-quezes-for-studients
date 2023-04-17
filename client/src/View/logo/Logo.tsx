import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks'
import { selectTheme } from '../../features/dark-light-theme/theme'
import logoDarkTheme from '../../images/logo/logoDarkTheme.svg';
import logoLightTheme from '../../images/logo/logoLightTheme.svg';

const Logo = () => {
    const theme = useAppSelector(selectTheme)
    const location = useLocation();

    return (
        <div className='logo'>
            <img src={theme === "dark" ? logoDarkTheme : logoLightTheme} alt="logo of the site" />
            {location.pathname.includes("dashboard") ? <div>
                _dashboard</div> : null}
        </div>
    )
}

export default Logo
