import { useState,useEffect } from 'react'
import {useDispatch} from "react-redux"
import authService from './appwrite/auth'
import {login,logout} from "./store/authSlice"
import './App.css'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom';

function App() {
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()

  useEffect(()=>{
  authService.getCurrentUser()
  .then((userData)=>{
    if (userData) {
      dispatch(login(userData))
    } else {
      dispatch(logout())
    }
  })
  .finally(()=> setLoading(false))

  },[])

console.log(import.meta.env.VITE_APPWRITE_URL)
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white'>
      <div className='w-full block'>
        <Header />
        <main className='flex-grow'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black'>
      <div className='text-center'>
        <div className='animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4'></div>
        <p className='text-white text-lg'>Loading...</p>
      </div>
    </div>
  )
}

export default App
