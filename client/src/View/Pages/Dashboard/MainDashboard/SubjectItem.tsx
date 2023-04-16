import React from 'react'
import { SubjectList } from '../../../../features/subjects/subjectsInterface'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../../../app/hooks'
import { removeSubject } from '../../../../features/subjects/subjectsAPI'

interface SubjectItemProps {
    sub: SubjectList

}
const SubjectItem = ({ sub }: SubjectItemProps) => {
    const dispatch = useAppDispatch()

    const deleteSubject = (id: number, subject: string) => {
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
    return (
        <div key={sub.SubjectID}>
            <h1>
                <Link to={`/dashboard/subjects/${sub.SubjectID}`}>{sub.SubjectName}</Link>
            </h1>
            <button onClick={() => deleteSubject(sub.SubjectID, sub.SubjectName)}>Delete</button>
        </div>
    )
}

export default SubjectItem
