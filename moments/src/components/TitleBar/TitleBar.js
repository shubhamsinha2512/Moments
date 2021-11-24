import React from 'react'
import './style.css'

function TitleBar({title}) {
    return (
        <div className="title_bar">
            <h3>{title}</h3>
        </div>
    )
}

export default TitleBar
