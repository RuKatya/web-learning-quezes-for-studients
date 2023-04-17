import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface LinkProps {
    link: {
        to: string,
        title: string
    },
    activeSideNav: string,
    setActiveSideNav: Function
}
const DashboardLink = ({ link, setActiveSideNav, activeSideNav }: LinkProps) => {
    return (
        <>
            <Link to={`/${link.to}`} className={activeSideNav == link.title ? "activeSideNav" : ""} onClick={() => setActiveSideNav(link.title)}>{link.title}</Link>
        </>
    )
}

export default DashboardLink
