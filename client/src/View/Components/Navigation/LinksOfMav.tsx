import { FC, useState } from 'react'
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { selectTheme } from "../../../features/dark-light-theme/theme";
import { selectAuth } from '../../../features/auth/authSlice';

interface LinksProps {
    link: string,
    title: string,
}

const LinksOfMav: FC<LinksProps> = ({ link, title }) => {
    const theme = useAppSelector(selectTheme)
    const user = useAppSelector(selectAuth);
    const [numberSaved, setNumberSaves] = useState(11)

    return (
        <Link
            to={link}
            className={`navigation__link navigation__link--${theme} ${title === "Fav Quizes" && "navigation__link--favQuizes"}`}>{
                title === "Logout" ?
                    `${user.userName} | Logout`
                    : title === "Fav Quizes" ?
                        <>{title} <span>{numberSaved}</span></>
                        : title
            }</Link>
    )
}

export default LinksOfMav
