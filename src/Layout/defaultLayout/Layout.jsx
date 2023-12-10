import React from 'react'
import './layout.css'
import Sidebar from '../../components/sidebar/sidebar'
import Navbar from '../../components/header/Navbar'

const Layout = ({children}) => {
  return (
    <div className='layout'>
        <Sidebar />
        <div className='container'>
            <Navbar/>
            <div className='content'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Layout