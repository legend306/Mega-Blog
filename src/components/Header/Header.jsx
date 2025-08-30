import React from "react";
import {Container,Logo,LogoutBtn} from '../index'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

function Header(){

const authStatus=useSelector((state)=> state.auth.status)
const navigate=useNavigate()

 const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

     return (
    <header className='py-4 shadow-lg bg-gray-800/90 backdrop-blur-md border-b border-gray-700'>
      <Container>
        <nav className='flex items-center'>
          <div className='mr-6'>
            <Link to='/' className='flex items-center space-x-2 hover:opacity-80 transition-opacity'>
              <Logo width='70px' />
              <span className='text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                LegendBlog
              </span>
            </Link>
          </div>
          <ul className='flex ml-auto items-center space-x-2'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='px-4 py-2 duration-200 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-all transform hover:scale-105 font-medium'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header