import React from 'react'
import { Link } from 'react-router-dom'
import { SubjectList } from '../../../../features/subjects/subjectsInterface'
import SubjectItem from './SubjectItem'

export interface SubjectListInterface {
    subjects: Array<SubjectList>
}

const Subjects = ({ subjects }: SubjectListInterface) => {
    return (<div className='dashboardInfo__listOfItems'>{
        subjects.length > 0 ? subjects.map((sub: any) => (
            <SubjectItem key={sub.SubjectID} sub={sub} />
        )) : (
            <>
                <h1 className='dashboardInfo__noSubjects-info'>No Subjects</h1>
            </>)
    }</div>)
}

export default Subjects
