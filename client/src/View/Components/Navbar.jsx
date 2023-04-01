// import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { string } from "prop-types";

const Navbar = ({ admin }) => {
    return (
        <div>
            <Link to="/">Home</Link>
            {
                admin ? <Link to="auth">Login</Link> : null
            }
        </div>
    );
};

Navbar.propTypes = {
    admin: string
};

export default Navbar;
