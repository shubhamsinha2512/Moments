import React, {useState, useEffect} from 'react'
import './style.css'

import Header from '../../components/Header/Header'
import SideNav from '../../components/SideNav/SideNav'
import TitleBar from '../../components/TitleBar/TitleBar'
import CreateMoment from '../../components/CreateMoment/CreateMoment'

import {BASE_URL, API} from '../../utils/API'
import {getSession} from '../../utils/session_utils'

function EditMoment({id}) {

    const [moment, setMoment] = useState(null)

    const getMoment = async ()=>{
        let token = getSession();

        await fetch(BASE_URL+API.MOMENTS, {
            method:'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
        })
        .then(res => res.json())
        .then(res => {
            // console.log(res)
            setMoment(res)
        })
        .catch(err => console.log(err))
    }


    return (
        <div className="edit_moment">
            <SideNav />
            <div className="right">
                <Header />
                <TitleBar title="Edit Moment" />
                {<CreateMoment />}
            </div>
        </div>
    )
}

export default EditMoment
