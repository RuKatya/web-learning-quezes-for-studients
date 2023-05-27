import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../app/hooks'
import { selectTheme } from '../../../features/dark-light-theme/theme'
import HTML_light_theme from '../../../images/mainPageLinks/HTML-light-theme.png'
import HTML_dark_theme from '../../../images/mainPageLinks/HTML-dark-theme.png'
import CSS_light_theme from '../../../images/mainPageLinks/CSS-light-theme.png'
import CSS_dark_theme from '../../../images/mainPageLinks/CSS-dark-theme.png'
import JS_light_theme from '../../../images/mainPageLinks/JS-light-theme.png'
import JS_dark_theme from '../../../images/mainPageLinks/JS-dark-theme.png'



const MainPage: FC = () => {
    const theme = useAppSelector(selectTheme)

    return (
        <div className={`mainPage mainPage--${theme}-theme`}>
            <h1
                className={`mainPage__header mainPage__header--${theme}-theme`}>
                Welcome to Web Learning
            </h1>
            <p
                className={`mainPage__intoParag mainPage__intoParag--${theme}-theme`}>
                Are you eager to learn web development from scratch? Our website is tailored to help beginners like you master the art of building websites and applications.
            </p>

            <p
                className={`mainPage__intoParag mainPage__intoParag--${theme}-theme`}>
                With our beginner-friendly approach and supportive community, we're here to make your learning experience enjoyable and rewarding. Whether you're interested in HTML, CSS, or JavaScript, or want to explore the exciting world of frameworks and libraries, we've got you covered.
            </p>

            <div className={`mainPage__links-to-study mainPage__links-to-study--${theme}-theme`}>
                <Link to="/subject/HTML"><img src={theme === "dark" ? HTML_dark_theme : HTML_light_theme} alt="HTML Link" /></Link>
                <Link to="/subject/CSS"><img src={theme === "dark" ? CSS_dark_theme : CSS_light_theme} alt="HTML Link" /></Link>
                <Link to="/subject/JavaScript"><img src={theme === "dark" ? JS_dark_theme : JS_light_theme} alt="HTML Link" /></Link>
            </div>
        </div>
    )
}

export default MainPage
