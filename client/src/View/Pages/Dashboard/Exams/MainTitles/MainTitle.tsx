import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AddTitleForm from './AddTitleForm';
import TitleList from './TitleList';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setTitleMessageEmpty, titlesMessage, titlesStatus } from '../../../../../features/titles/titleSlice';
import { getTitlesBySubjectID } from '../../../../../features/titles/titleApi';
import LoadingPage from '../../../../UI/LoadingPage';
import InfoAlert from '../../../../UI/InfoAlert';

type TitleParams = {
    subjectId: string
}

const MainTitle = () => {
    const [openMessage, setOpenMessage] = useState<boolean>(false)
    let { subjectId } = useParams<TitleParams>();
    const dispatch = useAppDispatch()
    const titleMsg = useAppSelector(titlesMessage)
    const titleStatus = useAppSelector(titlesStatus)

    useEffect(() => {
        const subjectid = Number(subjectId)
        dispatch(getTitlesBySubjectID(subjectid!))
    }, [subjectId, dispatch])

    useEffect(() => {
        if (titleMsg.length > 0) {
            setOpenMessage(true)
        }
    }, [titleMsg])

    return (
        <div >
            {
                titleStatus === "loading" ?
                    <LoadingPage />
                    :
                    <>
                        {openMessage && (
                            <InfoAlert
                                message={titleMsg}
                                setOpenMessage={setOpenMessage}
                                removeMessage={setTitleMessageEmpty}
                            />)}

                        <AddTitleForm subjectId={Number(subjectId)} />
                        <TitleList />
                    </>
            }
        </div>
    )
}

export default MainTitle
