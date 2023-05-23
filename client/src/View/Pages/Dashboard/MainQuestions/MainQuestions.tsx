import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { getQuestions } from '../../../../features/questions/questionsApi'
import { questionsMessage, questionsStatus, setQuestionMessageEmpty } from '../../../../features/questions/questionsSlice'
import AddQuestionForm from './AddQuestionForm'
import LoadingPage from '../../../UI/LoadingPage'
import InfoAlert from '../../../UI/InfoAlert'
import QuestionsList from './QuestionsList'

const MainQuestions = () => {
    const [openMessage, setOpenMessage] = useState<boolean>(false)
    const { titleId } = useParams()
    const dispatch = useAppDispatch()
    const questMessage = useAppSelector(questionsMessage)
    const questStatus = useAppSelector(questionsStatus)

    useEffect(() => {
        dispatch(getQuestions(Number(titleId)))
    }, [titleId, dispatch])

    useEffect(() => {
        if (questMessage.length > 0) setOpenMessage(true)
    }, [questMessage])

    return (
        <div className='dashboardInfo'>
            {questStatus === "loading" ?
                <LoadingPage /> :
                <>
                    <h2>Questions</h2>

                    {openMessage && (<InfoAlert
                        message={questMessage}
                        setOpenMessage={setOpenMessage}
                        removeMessage={setQuestionMessageEmpty}
                    />)}

                    <AddQuestionForm />
                    <QuestionsList />
                </>}
        </div>
    )
}

export default MainQuestions;