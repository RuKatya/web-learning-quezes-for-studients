import React from 'react'
import { Link } from 'react-router-dom'
import { SubjectList } from '../../../../features/subjects/subjectsInterface'

export interface SubjectListInterface {
    subjects: Array<SubjectList>
}

const Subjects = ({ subjects }: SubjectListInterface) => {
    return (<>{
        subjects.length > 0 ? subjects.map((sub: any) => (
            <div key={sub.SubjectID}>
                <h1>
                    <Link to={`/dashboard/subjects/${sub.SubjectID}`}>{sub.SubjectName}</Link>
                </h1>
            </div>
        )) : (
            <div>
                <h1>No Subjects</h1>
            </div>)
    }</>)
}

export default Subjects
