import { Suspense, useEffect } from 'react'
import { Await, Link, defer, useLoaderData, useParams } from 'react-router-dom'
import axios from 'axios'
import LoadingPage from '../../UI/LoadingPage'
import { Questions } from '../../../features/questions/questionsInterface'
import QuizCard from '../../UI/QuizCard'
import { useAppDispatch } from '../../../app/hooks'
import { setQuizInfo } from '../../../features/doneQuiz/doneQuizSlice'

const QuestionPage = () => {
    const dispatch = useAppDispatch();
    const { subject, title } = useParams()
    const { titles: { continueWork, questions, message, titleID } }: any = useLoaderData()

    useEffect(() => {
        if (continueWork) dispatch(setQuizInfo({ title, titleID, totalQuestions: questions.length }))
    }, [continueWork, dispatch, title, titleID, questions.length])

    return (
        <Suspense fallback={<LoadingPage />}>
            <Await resolve={continueWork}>
                <h1>{title}</h1>
                {continueWork ? <>
                    {questions.map((question: Questions) => (
                        <QuizCard key={question.QuestionID} quest={question} />
                    ))}
                    <Link to={`/subject/${subject}/${title}/done-quiz`}>Done Quiz</Link>
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
