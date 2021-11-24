import React, {useState, useEffect} from 'react'
import LogoBanner from '../../components/LogoBanner/LogoBanner'
import './style.css'

import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import {Link} from 'react-router-dom'

import {BASE_URL, API} from '../../utils/API'

function Signup(props) {


    const [userDetails, setUserDetails] = useState({
        firstName:"",
        lastName:"",
        mobile:"",
        email:"",
        city:"",
        password:""
    })

    const handleChange = (e)=>{
        let val = e.target.value;

        setUserDetails({
            ...userDetails,
            [e.target.name]:val
        })

        // console.log("User Details", userDetails)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await fetch(BASE_URL+API.SIGNUP,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body : JSON.stringify(userDetails)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            {/* top banner */}
            <LogoBanner />

            <div className="signup_body">
                <div className="page_title">
                    <h1>Sign Up</h1>
                    <p>To be a member</p>
                </div>

                <form className="signup_form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="input_group d-flex justify-content-between">
                            <label>First Name</label>
                            <div className="input_container">
                                <span className="icon">
                                    <PersonOutlineOutlinedIcon />
                                </span>
                                <span className="input">
                                    <input type="text" name="firstName" value={userDetails.firstName} placeholder="First Name" onChange={handleChange} />
                                </span>
                            </div>
                        </div>

                        <div className="input_group">
                            <label>Last Name</label>
                            <div className="input_container">
                                <span className="icon">
                                    <PersonOutlineOutlinedIcon />
                                </span>
                                <span className="input">
                                    <input type="text" name="lastName" value={userDetails.lastName} placeholder="Last Name" onChange={handleChange} />
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input_group">
                            <label>Mobile No.</label>
                            <div className="input_container">
                                <span className="icon">
                                    <PersonOutlineOutlinedIcon />
                                </span>
                                <span className="input">
                                    <input type="text" name="mobile" value={userDetails.mobile} placeholder="Mobile No." onChange={handleChange} />
                                </span>
                            </div>
                        </div>

                        <div className="input_group">
                            <label>Email-ID</label>
                            <div className="input_container">
                                <span className="icon">
                                    <EmailOutlinedIcon />
                                </span>
                                <span className="input">
                                    <input type="email" name="email" value={userDetails.email} placeholder="Email Id" onChange={handleChange} />
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input_group">
                            <label>City</label>
                            <div className="input_container">
                                <span className="icon">
                                    <PersonOutlineOutlinedIcon />
                                </span>
                                <span className="input">
                                    <input type="text" name="city" value={userDetails.city} placeholder="City" onChange={handleChange} />
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
                                    <input type="password" name="password" value={userDetails.password} placeholder="Password" onChange={handleChange} />
                                </span>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="submit_btn">
                        Sign Up
                    </button>
                </form>

                <p>Already a member? <Link to='/login'>Sign In</Link></p>
            </div>
        </div>
    )
}

export default Signup
