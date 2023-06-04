import React, { FC } from 'react'
import { SubjectList } from '../../../../../features/subjects/subjectsInterface'
import { useAppDispatch } from '../../../../../app/hooks'
import { removeSubject, updateSubject } from '../../../../../features/subjects/subjectsAPI'
import ListItem from '../../../../UI/ListItem'

interface SubjectItemProps {
    sub: SubjectList
}

const SubjectItem: FC<SubjectItemProps> = ({ sub }) => {
    const dispatch = useAppDispatch()

    const hendleDeleteSubject = (id: number, subject: string) => {
        const approveUserToDelete = window.confirm("Are you sure you want to delete the subject?")

        if (approveUserToDelete) {
            const makeSureToDelete = prompt(`To delete the subject, please write ${subject}`)

            if (subject === makeSureToDelete) {
                dispatch(removeSubject(id))
            } else {
                alert("Wrong Value")
            }
        }
    }

    const hendleUpdateSubjectFunc = (ev: React.SyntheticEvent) => {
        ev.preventDefault()

        const target = ev.target as typeof ev.target & {
            subjectsName: { value: string, id: string }
        }

        const SubjectName = target.subjectsName.value
        const id = Number(target.subjectsName.id)

        if (SubjectName.length <= 2) {
            return alert("The Input must be atleast 3 charasters")
        }

        dispatch(updateSubject({ id, SubjectName }))
    }

    return (
        <ListItem
            itemID={sub.SubjectID}
            itemName={sub.SubjectName}
            itemCategory={"subjects"}
            deleteFunc={hendleDeleteSubject}
            updateFunc={hendleUpdateSubjectFunc}
        />
    )
}

export default SubjectItem
