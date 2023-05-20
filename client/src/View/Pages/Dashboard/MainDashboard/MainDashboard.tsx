import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { subjectSubjectsMessage, subjectSubjectsStatus } from '../../../../features/subjects/subjectsSlice'
import { getSubjects } from '../../../../features/subjects/subjectsAPI'
import SubjectList from './SubjectList'
import AddSubjForm from './AddSubjForm'
import InfoAlert from '../../../UI/InfoAlert'
import LoadingPage from '../../../UI/LoadingPage'

const MainDashboard = () => {
    const [openMessage, setOpenMessage] = useState<boolean>(false)
    const subMessage = useAppSelector(subjectSubjectsMessage)
    const subStatus = useAppSelector(subjectSubjectsStatus)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getSubjects())
    }, [dispatch])

    useEffect(() => {
        if (subMessage.length > 0) setOpenMessage(true)
    }, [subMessage])

    return (
        <div className='dashboardInfo'>
            {subStatus === 'loading' ?
                <LoadingPage />
                :
                <>
                    {openMessage && (<InfoAlert message={subMessage} setOpenMessage={setOpenMessage} />)}

                    <AddSubjForm />
                    <SubjectList />
                </>
            }
        </div>
    )
}

export default MainDashboard

