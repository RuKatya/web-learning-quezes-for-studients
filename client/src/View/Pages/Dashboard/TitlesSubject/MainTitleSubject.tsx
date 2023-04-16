import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

const MainTitleSubject = () => {
    let { subjectId } = useParams();

    useEffect(() => {

    })

    return (
        <div>
            <h1>{subjectId}</h1>
        </div>
    )
}

export default MainTitleSubject
