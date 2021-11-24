import React from 'react'
import './style.css'

import Header from '../../components/Header/Header'
import SideNav from '../../components/SideNav/SideNav'
import TitleBar from '../../components/TitleBar/TitleBar'
import MomentContainer from '../../components/MomentsContainer/MomentContainer'

function Dashboard() {
    return (
        <div className="dashboard">
            <SideNav />
            <div className="right">
                <Header />
                <TitleBar title="Moments" />
                <MomentContainer />
            </div>
        </div>
    )
}

export default Dashboard
