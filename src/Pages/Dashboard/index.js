import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Header from '../../components/Header'
import Table from './Table'
import Profile from './Profile'
import PasswordUpdate from './Passwordupdate'
// import PasswordUpdate from './Passwordupdate/index's

export default function Dashboard() {
  return (
    <>
    <Header/>
    <Routes>
        <Route path='/'  element={<Home/>}/>
        <Route path='/table'  element={<Table/>}/>
        <Route path='/profile'  element={<Profile/>}/>
        <Route path='/passwordupdate'  element={<PasswordUpdate/>}/>
    </Routes>
    </>
  )
}
