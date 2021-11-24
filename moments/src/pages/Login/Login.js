import React, {useState, useEffect} from 'react'

import LogoBanner from '../../components/LogoBanner/LogoBanner'
import './style.css'

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import {Link} from 'react-router-dom'

//API
import {BASE_URL, API} from '../../utils/API'

//session utils
import {setSession} from '../../utils/session_utils'

function Login({setAuth}) {

    const [cred, setCred] = useState({
        email : "",
        password: ""
    })

    const handleChange = (e) => {
        let val = e.target.value;

        setCred({
            ...cred,
            [e.target.name] : val,
        })
        // console.log(cred)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch(BASE_URL+API.LOGIN,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body : JSON.stringify(cred)
        })
        .then(res => res.json())
        .then(res => {
            // console.log(res)
            setSession(res.token)
            setAuth(true)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            {/* top banner */}
            <LogoBanner />

            <div className="login_body">
                <div className="page_title">
                    <h1>Sign in</h1>
                    <p>To start using the app</p>
                </div>

                <form className="login_form" onSubmit={handleSubmit}>
                    <div className="d-flex flex-column">
                        <div className="input_group">
                            <label>Email-ID</label>
                            <div className="input_container">
                                <span className="icon">
                                    <EmailOutlinedIcon />
                                </span>
                                <span className="input">
                                    <input type="email" name="email" value={cred.email} placeholder="abc@example.com" onChange={handleChange}/>
                                </span>
                            </div>
                        </div>

                        <div className="input_group">
                            <label>Enter Password</label>
                            <div className="input_container">
                                <span className="icon">
                                    <LockOutlinedIcon />
                                </span>
                                <span className="input">
                                    <input type="password" name="password" value={cred.password} placeholder="Enter password here" onChange={handleChange}/>
                                </span>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="submit_btn">Sign In</button>
                </form>

                <p>Not a member? <Link to='/signup'>Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Login
