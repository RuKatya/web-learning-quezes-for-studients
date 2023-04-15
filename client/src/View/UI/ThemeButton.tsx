import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTheme, setUserTheme } from '../../features/dark-light-theme/theme';
import sunIcon from '../../images/icons/sun.svg'
import moonIcon from '../../images/icons/moon.svg'

const ThemeSwitchButton = () => {
    const dispatch = useAppDispatch()
    const theme = useAppSelector(selectTheme)

    return (
        <div className={`themeBtn`}>
            <img
                src={
                    theme === "dark"
                        ? sunIcon
                        : moonIcon
                }
                alt="change icon theme"
                onClick={
                    () => dispatch(setUserTheme(theme === "dark" ? "light" : "dark"))
                }
            />
        </div>
    )
}

export default ThemeSwitchButton
