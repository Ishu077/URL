import React from 'react'
import HomePage from './pages/HomePage'
import LoginForm from './components/LoginForm'
import AuthPage from './pages/AuthPage'
import { Outlet } from '@tanstack/react-router'
import Navbar from './components/NavBar'
//this is app.js!!
const RootLayout = () => {
  return (
    <>
      <Navbar/>
      <div className="pt-16"> {/* pt-16 matches h-16 (64px) of Navbar */}
        <Outlet />{/* This will render the child routes like HomePage, AuthPage, etc.  present in the rootlayout!*/}
      </div>
    </>
  )
}

export default RootLayout