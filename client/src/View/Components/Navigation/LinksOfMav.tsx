import { FC } from 'react'
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { selectTheme } from "../../../features/dark-light-theme/theme";

interface LinksProps {
    link: string,
    title: string,
    setToggleMenu: Function
}


const LinksOfMav: FC<LinksProps> = ({ link, title, setToggleMenu }) => {
    const theme = useAppSelector(selectTheme)
    // const [numberSaved, setNumberSaves] = useState(11)

    return (
        <NavLink
            to={link}
            className={`navigation__link navigation__link--${theme} ${title === "Fav Quizes" && "navigation__link--favQuizes"}`}
            onClick={() => setToggleMenu(false)}
        >{
                title === "Fav Quizes" ?
                    <>{title} <span>{11}</span></>
                    :
                    title
            }</NavLink>
    )
}

export default LinksOfMav