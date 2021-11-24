import React from 'react'
import './style.css'

import {Link} from 'react-router-dom'

function Nav() {
    return (
        <div className="d-flex flex-column nav">
            <div className="nav_item">
                <h5>Profile</h5>
            </div>
            <Link to="/"><div className="nav_item">
                <h5>Moments</h5>
                <ul>
                    <li>Moment List</li>
                </ul>
            </div>
            </Link>
                <Link to="/create"><button className="new_moment_btn">Add New Moment</button></Link>
        </div>
    )
}

export default Nav
