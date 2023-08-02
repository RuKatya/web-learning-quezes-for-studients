import React, { FormEventHandler } from 'react'
import { Form } from 'react-router-dom'

interface DashboardAddNewFormProps {
    submitFunction: FormEventHandler<HTMLFormElement>,
    inputName: string,
    placeholderText: string
}

const DashboardAddNewForm = ({ submitFunction, inputName, placeholderText }: DashboardAddNewFormProps) => {
    return (
        <Form onSubmit={submitFunction} className='addMoreForm__form'>
            <input
                type="text"
                name={inputName}
                placeholder={`Enter ${placeholderText} To Save`}
                required
                minLength={3}
            />
            <button type='submit'>Save</button>
        </Form>
    )
}

export default DashboardAddNewForm
