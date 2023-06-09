import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'

const PagesNavigation = () => {
    const navidation = Object.values(useParams())
    let location = useLocation();

    return (
        <div>
            {
                location.pathname == "/" || location.pathname.includes("/auth") ? null :
                    <>
                        <Link to="/">Home</Link> {" > "}
                        {navidation.map((item, index) => (
                            <span key={index}>
                                <Link to="" >{item}</Link> {index !== 0 ? "  " : " > "}
                            </span>
                        ))}
                    </>
            }
        </div>
    )
}

export default PagesNavigation
