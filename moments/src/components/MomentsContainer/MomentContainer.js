import React, {useState, useEffect} from 'react'
import MomentRow from '../MomentRow/MomentRow'
import './style.css'

//API
import {BASE_URL, API} from '../../utils/API'

import {getSession} from '../../utils/session_utils'

function MomentContainer() {

    const [moments, setMoments] = useState([])

    const getAllMoments = async ()=>{
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
            setMoments(res)
        })
        .catch(err => console.log(err))
    }

    const deleteMoment = async (id)=>{
        let token = getSession();

        await fetch(BASE_URL+API.MOMENTS+`/${id}`, {
            method:'DELETE',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({token:token})
        })
        .then(res => res.json())
        .then(res => {
            // console.log(res)
            refresh()
        })
        .catch(err => console.log(err))
    }

    const refresh = ()=>{
        getAllMoments()
    }

    useEffect(()=>{
        getAllMoments()
    }, [])

    return (
        <div className="moment_container">
            <table className="moment_table">
                <thead>
                    <th>Sr. No</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Tags</th>
                    <th colSpan="2">Action</th>
                </thead>
                <tbody>
                    {moments && moments.map((m, i)=>
                        {return <MomentRow 
                            key={m._id}
                            serial={i+1}
                            moment={m}
                            handleDelete={deleteMoment}
                        />}
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default MomentContainer
