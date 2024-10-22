import React from 'react'
import { useProfileContext } from '../../../context/ProfileContext'
import  { useAuthContext } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Image } from 'antd';


export default function Profile() {
  const {data}=useProfileContext()
  const {user}=useAuthContext()

  
  return (
    <main style={{display:'flex',justifyContent:'center',alignItems:"center"}}>
    <div className="card card-side  shadow-xl flex items-center bg-indigo-600  ">
      {/* <div className='rounded-full w-44 h-44 ml-5 flex justify-center items-center  overflow-hidden'>
        {data?.photo ? <img
          src={data?.photo?.url}
          alt="" className=' w-full h-full ' /> : "Click Edit Profie to Add Picture"}
      </div> */}
      <div className="avatar">
        <div className="ring-primary ring-offset-base-100  rounded-full ring ring-offset-2 ml-10">
          {data?.photo ? <Image 
            src={data?.photo?.url}
            alt=""  width={200} height={200}/> : "Click Edit Profie to Add Picture"}
        </div>
      </div>
      <div className="card-body text-violet-100 text-xl text-center">
        <h1 className=" text-center text-2xl text-violet-100 ">PROFILE</h1>
        <h1 className='mt-4  '>Name:{data?.fullname}</h1>
        <h1>Email:{data?.email}</h1>
        <h1>ID:{data?.userId}</h1>
        <div className="card-actions mt-6 ">
          <Link to={`/dashboard/profile/profileedit/${user?.uid}`} className=' text-decoration-none hover:text-violet-100'>Edit Profile</Link>

          <Link to='/passwordupdate' className='ml-20  hover:text-violet-100'>Change Password</Link>
        </div>
      </div>
    </div>


  </main>
  )
}
