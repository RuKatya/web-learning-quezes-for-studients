import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks'
import { selectTheme } from '../../features/dark-light-theme/theme'
import logoDarkTheme from '../../images/logo/logoDarkTheme.svg';
import logoLightTheme from '../../images/logo/logoLightTheme.svg';
import { FC } from 'react';

interface LogoProps {
    classProps: string,
    setToggleMenu: Function,
    setToggleSecondMenu: Function
}
const Logo: FC<LogoProps> = ({ classProps, setToggleMenu, setToggleSecondMenu }) => {
    const theme = useAppSelector(selectTheme)
    const location = useLocation();

    return (
        <div className='logo' onClick={() => {
            setToggleMenu(false)
            setToggleSecondMenu(false)
        }}>
            <img src={theme === "dark" ? logoDarkTheme : logoLightTheme} alt="logo of the site" />
            {/* {location.pathname.includes("dashboard") ? <div>
                .dashboard</div> : null} */}
        </div>
    )
}

export default Logo
