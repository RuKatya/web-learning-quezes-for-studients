import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { selectSavedQuizes } from '../../../features/savedFavQuizes/savedFavQuizesSlice'
import { Link } from 'react-router-dom'
import { removeFromFavQuizes } from '../../../features/savedFavQuizes/savedFavQuizesApi'

const UserSaveFav = () => {
    const savedQuizes = useAppSelector(selectSavedQuizes)
    const dispatch = useAppDispatch()
    // const favMessage = useAppSelector(SavedQuizesMessage)
    // console.log(favMessage)

    return (
        <div>
            <h1>FAV QUIZ</h1>
            <div>
                {savedQuizes.length > 0 ?
                    savedQuizes.map(quiz => (
                        <div key={quiz.savedQuizID}>
                            <Link to={`/subject/${quiz.SubjectName}/${quiz.Title_Name}/statistic`}>{quiz.Title_Name}</Link>
                            <button
                                title="Delete from fav"
                                onClick={() => dispatch(removeFromFavQuizes({ savedQuizID: quiz.savedQuizID }))}
                            >Delete</button>
                        </div>
                    ))
                    : <h2> No Saved Quizes</h2>}
            </div>
        </div>
    )
}

export default UserSaveFav
