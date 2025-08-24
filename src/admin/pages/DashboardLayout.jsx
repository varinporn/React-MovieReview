import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'
import { Toaster } from 'react-hot-toast'

const DashboardLayout = () => {
  return (
    <div className="flex gap-4 bg-white">
      <Toaster position="bottom-right" reverseOrder={false} />
      <SideBar />
      <Outlet />
    </div>
  )
}

export default DashboardLayout
