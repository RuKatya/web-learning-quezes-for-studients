import React, { useState } from 'react'
import { Form } from 'react-router-dom'
import { useAppDispatch } from '../../../../app/hooks'
import { addSubject } from '../../../../features/subjects/subjectsAPI'

const AddSubjForm = () => {
    const [showAddNewSubjectWindow, setShowAddNewSubjectWindow] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    const addNewSubject = (ev: React.SyntheticEvent) => {
        ev.preventDefault()

        const target = ev.target as typeof ev.target & {
            subjectName: { value: string }
        }

        const subjectName = target.subjectName.value
        dispatch(addSubject(subjectName))
    }
    return (
        <>
            <button onClick={() => setShowAddNewSubjectWindow(!showAddNewSubjectWindow)}>Add new Subject</button>

            {
                showAddNewSubjectWindow && (
                    <Form onSubmit={addNewSubject}>
                        <input type="text" name="subjectName" placeholder='Enter Subject to save' />
                        <button type='submit'>Save</button>
                    </Form>
                )
            }
        </>
    )
}

export default AddSubjForm
