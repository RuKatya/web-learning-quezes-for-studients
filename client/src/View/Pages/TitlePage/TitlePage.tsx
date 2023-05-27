import axios from 'axios'
import React, { Suspense } from 'react'
import { Await, Link, defer, useLoaderData, useParams } from 'react-router-dom'
import LoadingPage from '../../UI/LoadingPage'
import { Title } from '../../../features/titles/titleInterface'

const TitlePage = () => {
    const { titles: { continueWork, result, message } }: any = useLoaderData()
    console.log(continueWork)
    console.log(result)

    const { subject } = useParams()

    return (<Suspense fallback={<LoadingPage />}>
        <Await resolve={continueWork}>
            <h1>{subject}</h1>
            {continueWork ? result.map((item: Title) => (

                <Link to="">
                    {item.Title}
                </Link>

            )) :
                <div>{message}</div>}
        </Await>
    </Suspense>)
}

const getTitles = async (SubjectName: string) => {
    const { data } = await axios.post("/title-quiz/get-all-titles-for-user", { SubjectName })
    return data
}

export const titleLoader = async ({ params }: any) => {
    const { subject } = params

    return defer({
        titles: await getTitles(subject)
    })
}

export default TitlePage
