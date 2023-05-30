import React from 'react'
import PagesNavigation from '../../Components/PagesNavigation/PagesNavigation'
import { Link, useParams } from 'react-router-dom'

const StatisticPage = () => {
    const { subject, title } = useParams()

    return (
        <div>
            <h1>Statistic</h1>
            <h2>Coming soon!!</h2>
            <Link to={`/subject/${subject}/${title}/questions`}>Start Quiz</Link>
        </div>
    )
}

export default StatisticPage
