import axios from 'axios'
import { Suspense } from 'react'
import { Await, Link, defer, useLoaderData, useParams } from 'react-router-dom'
import LoadingPage from '../../UI/LoadingPage'
import { Title } from '../../../features/titles/titleInterface'
import { selectTheme } from '../../../features/dark-light-theme/theme'
import { useAppSelector } from '../../../app/hooks'
import PagesNavigation from '../../Components/PagesNavigation/PagesNavigation'

const TitlePage = () => {
    const theme = useAppSelector(selectTheme)
    const { titles: { continueWork, result, message } }: any = useLoaderData()
    const { subject } = useParams()

    return (
        <Suspense fallback={<LoadingPage />}>
            <Await resolve={continueWork}>
                <div className={`titlesPage titlesPage--${theme}-theme`}>
                    <h1>{subject}</h1>
                    <div className={`titlesPage__questions titlesPage__questions--${theme}-theme`}>
                        {continueWork ? result.map((item: Title) => (
                            <Link to={`/subject/${subject}/${item.Title}/statistic`} className={`titlesPage__questions--links titlesPage__questions--links--${theme}-theme`} key={item.Title_QuizID}>
                                {item.Title}
                            </Link>
                        )) : <div>{message}</div>}
                    </div>
                </div>
            </Await>
        </Suspense>
    )
}

const getTitles = async (SubjectName: string) => {
    const { data } = await axios.post("/title-quiz/get-all-titles-for-user", { SubjectName })
    return data
}

export const titleLoader = async ({ params }: any) => {
    const { subject } = params

    return defer({
        titles: await getTitles(subject)
    })
}

export default TitlePage