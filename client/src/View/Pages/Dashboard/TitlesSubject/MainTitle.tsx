import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectTitles, titlesMessage, titlesStatus } from '../../../../features/titles/titleSlice';
import { addNewTitle, getTitlesBySubjectID, removeTitle } from '../../../../features/titles/titleApi';
import LoadingPage from '../../../UI/LoadingPage';
import InfoAlert from '../../../UI/InfoAlert';

type TitleParams = {
    subjectId: string
}

const MainTitle = () => {
    const [openMessage, setOpenMessage] = useState<boolean>(false)
    let { subjectId } = useParams<TitleParams>();
    const dispatch = useAppDispatch()
    const titles = useAppSelector(selectTitles)
    const titleMsg = useAppSelector(titlesMessage)
    const titleStatus = useAppSelector(titlesStatus)

    useEffect(() => {
        const subjectid = Number(subjectId)
        dispatch(getTitlesBySubjectID(subjectid!))
    }, [])

    useEffect(() => {
        if (titleMsg.length > 0) setOpenMessage(true)
    }, [titleMsg])

    const hendleAddNewTitle = (ev: React.SyntheticEvent) => {
        ev.preventDefault()

        const target = ev.target as typeof ev.target & {
            titleName: { value: string }
        }

        const Title = target.titleName.value

        const subjectid = Number(subjectId)

        if (Title.length <= 2) {
            return alert("The Input must be atleast 3 charasters")
        }

        dispatch(addNewTitle({ SubjectID: subjectid!, Title }))
        // setShowAddNewSubjectWindow(false)
    }


    const hendleDeleteTitle = (Title_QuizID: number, title: string) => {
        const approveUserToDelete = window.confirm("Are you sure you want to delete the title?")

        if (approveUserToDelete) {
            const makeSureToDelete = prompt(`To delete the subject, please write ${title}`)

            if (title === makeSureToDelete) {
                dispatch(removeTitle(Title_QuizID))
            } else {
                alert("Wrong Value")
            }
        }
    }

    return (
        <div>
            <div>
                <button>Add new Title</button>
                <form onSubmit={hendleAddNewTitle}>
                    <input type="text" name="titleName" placeholder='Enter Title' />
                    <button type='submit'>Add</button>
                </form>
            </div>
            {openMessage && (<InfoAlert message={titleMsg} setOpenMessage={setOpenMessage} />)}
            {titleStatus === "loading" ? <LoadingPage /> :
                titles.length > 0 ?
                    titles.map(title => (
                        <div key={title.Title_QuizID}>
                            <p>{title.Title}</p>
                            <button onClick={() => hendleDeleteTitle(title.Title_QuizID, title.Title)}>Delete</button>
                        </div>))
                    : <h2>No Titles here</h2>
            }
        </div>
    )
}

export default MainTitle
