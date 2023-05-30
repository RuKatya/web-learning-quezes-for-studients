import { Suspense } from 'react'
import { Await, defer, useLoaderData, useParams } from 'react-router-dom'
import axios from 'axios'
import LoadingPage from '../../UI/LoadingPage'
import { Questions } from '../../../features/questions/questionsInterface'
import QuizCard from '../../UI/QuizCard'

const QuestionPage = () => {
    const { title } = useParams()
    const { titles: { continueWork, questions, message } }: any = useLoaderData()

    return (
        <Suspense fallback={<LoadingPage />}>
            <Await resolve={continueWork}>
                <h1>{title}</h1>
                {continueWork ? <>
                    {questions.map((question: Questions) => (
                        <QuizCard key={question.QuestionID} quest={question} />
                    ))}
                </> : <>{message}</>}

            </Await>
        </Suspense>
    )
}
const getQuestions = async (Title: string) => {
    const { data } = await axios.post("/title-questions/get-all-title-questions-by-name", { Title })
    return data
}

export const QuestionLoader = async ({ params }: any) => {
    const { title } = params

    return defer({
        titles: await getQuestions(title)
    })
}

export default QuestionPage
