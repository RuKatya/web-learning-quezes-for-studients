import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

const PagesNavigation = () => {
    // const a = useParams()
    // console.log(a)
    const navidation = Object.values(useParams())
    let location = useLocation();
    // console.log(navidation)
    // const navidation = Object.keys(useParams()).map(item => item.endsWith("Id") ? item.slice(0, -2) : item)

    // // console.log(a)
    // console.log(navidation)
    // const aaa = navidation.map(item => item.endsWith("Id") ? item.slice(0, -2) : item)
    // console.log(aaa)

    return (
        <div>
            {location.pathname !== "/" && (<><Link to="/">Home</Link> {" > "}</>)}

            {navidation.map((item, index) => (
                <span key={index}>
                    <Link to="" >{item}</Link> {index !== 0 ? "  " : " > "}
                </span>
            ))}
        </div>
    )
}

export default PagesNavigation
