import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PagesNavigation = () => {
    // const a = useParams()
    const navidation = Object.keys(useParams()).map(item => item.endsWith("Id") ? item.slice(0, -2) : item)

    // console.log(a)
    console.log(navidation)
    const aaa = navidation.map(item => item.endsWith("Id") ? item.slice(0, -2) : item)
    console.log(aaa)

    return (
        <div>
            {navidation.map(item => (
                <Link to=""></Link>
            ))}
        </div>
    )
}

export default PagesNavigation
