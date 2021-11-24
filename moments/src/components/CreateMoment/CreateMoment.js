import React, {useState, useEffect} from 'react'
import './style.css'

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

//API
import {BASE_URL, API} from '../../utils/API'
import {getSession} from '../../utils/session_utils'


function CreateMoment() {

    const [newMoment, setNewMoment] = useState({
        title:"",
        tags:[],
        imageUrl:"",
    })

    const handleChange = (e) => {
        let val = e.target.value;
        
        setNewMoment({
            ...newMoment,
            [e.target.name] : val
        })
        console.log(newMoment)
    }

    const handleTag = (e) => {
        let val = e.target.value

        let tags = val.split(",")

        setNewMoment({
            ...newMoment,
            tags : [...tags]
        })

        // console.log(newMoment)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let token = getSession()

        if(token){

            await fetch(BASE_URL+API.MOMENTS,{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body : JSON.stringify({
                    token:token,
                    ...newMoment
                })
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setNewMoment({
                    title:"",
                    tags:[],
                    imageUrl:"",
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    return (
        <div className="create_moment">
            <form className="create_moment_form" onSubmit={handleSubmit}>
                <div className="form_group">
                    <label>Title</label>
                    <div className="title">
                        <input style={{width:'100%'}}  name="title" value={newMoment.title} onChange={handleChange} />   
                    </div>
                </div>

                <div className="below">
                    <div className="bleft">
                        <div className="form_group">
                            <label>Tags</label>
                            <div className="title">
                                <input style={{width:'100%'}}  name="tags" value={newMoment.tags} onChange={handleTag} />   
                            </div>
                        </div>
                    </div>

                    <div className="bright">
                        <div className="drag_drop">
                            <FileUploadOutlinedIcon size="30" />
                            <span>Drag and drop the file</span>
                            <b>OR</b>
                            {/* <input type="file" accept=".jpeg .jpg .png" hidden /> */}
                            <button className="browse_image_btn">Browse</button>
                        </div>
                    </div>
                </div>

                <button type="submit" className="moment_create_btn">Submit</button>
            </form>
        </div>
    )
}

export default CreateMoment
