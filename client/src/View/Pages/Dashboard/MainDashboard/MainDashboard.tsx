import React, { Suspense, useEffect, useState } from 'react'
import { Await, Form, Link, useLoaderData } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { selectSubject, setMessageEmpty, subjectMessage } from '../../../../features/subjects/subjectsSlice'
import { addSubject, getSubjects } from '../../../../features/subjects/subjectsAPI'

import { Alert } from '@mui/material';
import { Stack } from '@mui/material';
import SubjectList from './SubjectList'
import AddSubjForm from './AddSubjForm'
import InfoAlert from '../../../UI/InfoAlert'

const MainDashboard = () => {
    const [showAddNewSubjectWindow, setShowAddNewSubjectWindow] = useState<boolean>(false)
    const [openMessage, setOpenMessage] = useState<boolean>(false)
    const subjects = useAppSelector(selectSubject)
    const subMessage = useAppSelector(subjectMessage)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getSubjects())
    })

    useEffect(() => {
        if (subMessage) setOpenMessage(true)
    }, [subMessage])

    return (

        <div>
            {openMessage && (<InfoAlert message={subMessage} setOpenMessage={setOpenMessage} />)}

            <AddSubjForm />
            <SubjectList subjects={subjects} />
        </div>
    )
}

export default MainDashboard

