import React from 'react'
import { useAppSelector } from '../../../app/hooks'
import { selectSavedQuizes } from '../../../features/savedFavQuizes/savedFavQuizesSlice'
import { Link } from 'react-router-dom'

const UserSaveFav = () => {
    const savedQuizes = useAppSelector(selectSavedQuizes)

    return (
        <div>
            <h1>FAV QUIZ</h1>
            <div>
                {savedQuizes.length > 0 ?
                    savedQuizes.map(quiz => (
                        <div key={quiz.savedQuizID}>
                            <Link to="">{quiz.Title_Name}</Link>
                        </div>
                    ))
                    : <h2> No Saved Quizes</h2>}
            </div>
        </div>
    )
}

export default UserSaveFav
