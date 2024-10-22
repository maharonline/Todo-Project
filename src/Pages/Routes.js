import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import Auth from './Auth'
import PrivateRoute from '../components/PrivateRoute'
import { useAuthContext } from '../context/AuthContext'
import Edit from './Dashboard/Edit'
import EditProfile from './Dashboard/EditProfile/EditProfile'

export default function Index() {
  const {isAuthenticated}=useAuthContext()
  return (
    <>

    <Routes>
        {/* <Route path='/' /> */}
        <Route path='auth/*' element={!isAuthenticated?<Auth/>:<Navigate to="/"/>}/>
        <Route path='/*' element={<PrivateRoute Component={Dashboard}/>}/>
        <Route path='/dashboard/edit/:uid' element={<Edit/>}/>
        <Route path='/dashboard/profile/profileedit/:uid' element={<EditProfile/>}/>
    </Routes>
    
    </>
  )
}
