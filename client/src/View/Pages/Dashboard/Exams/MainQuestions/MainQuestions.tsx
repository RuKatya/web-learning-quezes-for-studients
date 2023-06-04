import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddQuestionForm from './AddQuestionForm'
import QuestionsList from './QuestionsList'
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks'
import { questionsMessage, questionsStatus, setQuestionMessageEmpty } from '../../../../../features/questions/questionsSlice'
import { getQuestions } from '../../../../../features/questions/questionsApi'
import LoadingPage from '../../../../UI/LoadingPage'
import { saveDraftOrPublish } from '../../../../../features/titles/titleApi'
import InfoAlert from '../../../../UI/InfoAlert'

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
        <div className='dashboard-exams'>
            {/* {questStatus === "loading" ?
                <LoadingPage /> :
                <>
                    <h2>Questions</h2>
                    <button onClick={() => dispatch(saveDraftOrPublish({ draft: true, id: Number(titleId) }))}>Save as draft</button>
                    <button onClick={() => dispatch(saveDraftOrPublish({ draft: false, id: Number(titleId) }))}>Publish</button>

                    {openMessage && (<InfoAlert
                        message={questMessage}
                        setOpenMessage={setOpenMessage}
                        removeMessage={setQuestionMessageEmpty}
                    />)}

                    <AddQuestionForm />
                    <QuestionsList />
                </>} */}
        </div>
    )
}

export default MainQuestions;