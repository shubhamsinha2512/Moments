import React from 'react'
import './style.css'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tag from '../Tags/Tags';

import {Link} from 'react-router-dom';

function MomentRow(props) {

    const {serial} = props
    const {_id, imgUrl, title, tags} = props.moment;

    return (
        <tr className="moment_row">
            <td>{serial}</td>
            <td><img style={{borderRadius:'25px'}} src={`https://source.unsplash.com/random/30x30?sig=${serial}`} /></td>
            {/* <td><img src={imgUrl} /></td> */}
            <td>{title}</td>
            <td>
                {tags && tags.map((t, i)=> <span>{<Tag tag={t} />}</span>)}
            </td>
            <td><Link to="/edit" id={_id}><EditIcon /></Link></td>
            <td  onClick={()=> props.handleDelete(_id)}><DeleteIcon color={'red'} /></td>
        </tr>
    )
}

export default MomentRow
