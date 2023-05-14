import React from 'react'
import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import Footer from './Footer'

const UserDashLayout = () => {
  return (
    <>
      <DashHeader />
      <div className='dash-container'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default UserDashLayout