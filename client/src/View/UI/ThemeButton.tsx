import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTheme, setUserTheme } from "../../features/dark-light-theme/theme";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ThemeSwitchButton = () => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(selectTheme);

    return (
        <div
            className={`theme_switch theme_switch--${theme}`}
            onClick={() => dispatch(setUserTheme(theme === "dark" ? "light" : "dark"))}
        >
            <div
                className={`${
                    theme === "dark" ? `slide-out` : `slide-in`
                } theme_switch__img--${theme}`}
            >
                {theme === "dark" ? (
                    <DarkModeIcon sx={{ color: "#ECEFF1" }} />
                ) : (
                    <LightModeIcon sx={{ color: "#546E7A" }} />
                )}
            </div>
        </div>
    );
};

export default ThemeSwitchButton;
