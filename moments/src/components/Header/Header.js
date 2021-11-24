import React from 'react'
import './style.css'

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {
    return (
        <div className='header'>
            <MenuOutlinedIcon />
            <div classNamme="header_right">
                <img className="avatar" style={{borderRadius:'25px'}} src={`https://avatars.dicebear.com/api/human/abc.svg`} />
                <button className="logout">
                    <LogoutIcon />
                </button>
            </div>
        </div>
    )
}

export default Header
