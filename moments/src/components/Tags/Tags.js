import React from 'react'
import './style.css'

import CancelIcon from '@mui/icons-material/Cancel';

function Tags({tag}) {
    return (
        <span className="tag">
            {tag} &nbsp;<CancelIcon />
        </span>
    )
}

export default Tags
