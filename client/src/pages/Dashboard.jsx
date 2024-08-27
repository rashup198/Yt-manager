import React from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Sidebar from '../componets/core/dashboard/Sidebar'


const Dashboard = () => {

    const {loading:authLoading} = useSelector(state => state.auth)
    const {loading:profileLoading} = useSelector(state => state.auth)

    if(profileLoading || authLoading){
        return(
            <h1 className='mt-[150px] text-center text-white'>Loading...</h1>
        )
    }


  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)] text-white'>
        <Sidebar/>
        <div className="h-[calc(100vh-3.5rem)] overflow-auto">
            <div className="mx-auto w-11/12 max-w-[1000px] py-10">
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
