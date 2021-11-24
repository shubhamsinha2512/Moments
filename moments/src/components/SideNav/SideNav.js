import React from 'react'
import Nav from './Nav'
import './style.css'

import {Link} from 'react-router-dom'

function SideNav() {
    return (
        <div className="side_nav">
            <Link to="/"><img className="logo" src="/logo.png" alt="logo" /></Link>
            <Nav />
        </div>
    )
}

export default SideNav
