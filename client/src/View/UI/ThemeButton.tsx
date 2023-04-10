import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTheme, setUserTheme } from '../../features/dark-light-theme/theme';

const ThemeSwitchButton = () => {
    const dispatch = useAppDispatch()
    const theme = useAppSelector(selectTheme)

    return (
        <div className={`themeBtn`}>
            <img
                src={
                    theme === "dark"
                        ? `/images/icons/sun.svg`
                        : `/images/icons/moon.svg`
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
