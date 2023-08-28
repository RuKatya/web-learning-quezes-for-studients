import { FC, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectTheme } from "../../../features/dark-light-theme/theme";
import { getFavQuizes } from '../../../features/savedFavQuizes/savedFavQuizesApi';
import { countSavedQuizes } from '../../../features/savedFavQuizes/savedFavQuizesSlice';

interface LinksProps {
    link: string,
    title: string,
    setToggleMenu: Function
}


const LinksOfMav: FC<LinksProps> = ({ link, title, setToggleMenu }) => {
    const theme = useAppSelector(selectTheme)
    const countSavedQuizesOfUser = useAppSelector(countSavedQuizes)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getFavQuizes())
    }, [dispatch])

    return (
        <NavLink
            to={link}
            className={`navbar__navigation--link navbar__navigation--link__${theme}-theme`}
            onClick={() => setToggleMenu(false)}
        >{
                title === "Fav Quizes" ?
                    <>{title} <span>{countSavedQuizesOfUser}</span></>
                    :
                    title
            }</NavLink>
    )
}

export default LinksOfMav