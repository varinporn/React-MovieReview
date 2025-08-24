import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'

const DashboardLayout = () => {
  return (
    <div className='flex gap-4 bg-white'>
      <SideBar />
      <Outlet />
    </div>
  )
}

export default DashboardLayout
