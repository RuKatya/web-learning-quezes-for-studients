import React, { FC, useState } from 'react'
import DashboardAddNew from '../../../UI/DashboardAddNew/DashboardAddNew'
import { useAppDispatch } from '../../../../app/hooks'
import { addNewTitle } from '../../../../features/titles/titleApi'

interface AddItemProps {
    subjectId: number
}

const AddTitleForm: FC<AddItemProps> = ({ subjectId }) => {
    const [showAddNewSubjectWindow, setShowAddNewSubjectWindow] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const hendleAddNewTitle = (ev: React.SyntheticEvent) => {
        ev.preventDefault()

        const target = ev.target as typeof ev.target & {
            titleName: { value: string }
        }

        const Title = target.titleName.value

        if (Title.length <= 2) {
            return alert("The Input must be atleast 3 charasters")
        }

        dispatch(addNewTitle({ SubjectID: subjectId, Title }))
        setShowAddNewSubjectWindow(false)
    }


    return (
        <>
            <DashboardAddNew
                btnText={"TITLE"}
                submitFunction={hendleAddNewTitle}
                inputName={"titleName"}
                placeholderText={'Enter Title'}
                showAddNewSubjectWindow={showAddNewSubjectWindow}
                setShowAddNewSubjectWindow={setShowAddNewSubjectWindow}
            />

        </>
    )
}

export default AddTitleForm
