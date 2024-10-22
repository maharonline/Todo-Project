import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import { useProfileContext } from '../../context/ProfileContext'
import { Space } from 'antd'

export default function Navbar() {
  const { handleLogout } = useAuthContext()
  const {data}=useProfileContext()
  return (
    <header>
      <div className="navbar bg-stone-300">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl">Todo</Link>
        <div className=' mx-auto'>
          <Space>

          <Link to='/table' className='btn btn-outline text-lg'>Table</Link>
          <Link to='/' className='btn btn-outline text-lg'>Add Todo</Link>
          </Space>
        </div>
        </div>

        <div className="flex-none">
          
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={data.photo?.url} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link className="justify-between" to="/profile">Profile <span className="badge">New</span></Link>
              </li>
              <li><Link>Settings</Link></li>
              <li><Link onClick={handleLogout}>Logout</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}
