export interface Themes {
    dark: "dark",
    light: "light"
}

export const themes: Themes = {
    dark: "dark",
    light: "light",
};

export const getTheme = () => {
    const theme = `${window?.localStorage?.getItem("theme")}`;
    console.log('%cuseTheme.ts line:13 theme', 'color: #007acc;', theme);

    if (Object.values(themes).includes(theme)) return theme;

    const userMedia = window.matchMedia("(prefers-color-scheme: light)");
    if (userMedia.matches) return themes.light;

    return themes.dark;
};