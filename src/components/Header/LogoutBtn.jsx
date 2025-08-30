import React from "react";
import {useDispatch} from 'react-redux'
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";

function LogoutBtn() {

const dispatch=useDispatch()
const logoutHandler= () => {
    authService.logout().then(()=> {
        dispatch(logout())
        window.location.reload()
    })
}

    return(
        <button className="inline-block py-2 px-3 duration-200 hover:bg-red-600 bg-red-500 text-white rounded-md font-medium transition-all text-sm" 
        onClick={logoutHandler} >
            Logout
        </button>
    )
}

export default LogoutBtn