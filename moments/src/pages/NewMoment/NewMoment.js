import React from 'react'
import './style.css'

import Header from '../../components/Header/Header'
import SideNav from '../../components/SideNav/SideNav'
import TitleBar from '../../components/TitleBar/TitleBar'
import CreateMoment from '../../components/CreateMoment/CreateMoment'

function NewMoment() {
    return (
        <div className="new_moment">
            <SideNav />
            <div className="right">
                <Header />
                <TitleBar title="Add New Moment" />
                <CreateMoment />
            </div>
        </div>
    )
}

export default NewMoment
