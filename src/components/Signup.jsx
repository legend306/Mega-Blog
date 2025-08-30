import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from './index'
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from 'react-hook-form'
import { login  } from '../store/authSlice'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center py-12 px-4">
        <div className='mx-auto w-full max-w-lg bg-gray-800/50 backdrop-blur-sm rounded-2xl p-10 border border-gray-700 shadow-2xl'>
            <div className="mb-6 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">🎆 Join MegaBlog</h2>
                <p className="text-gray-400">Create your account</p>
            </div>
            <p className="text-center text-base text-gray-400 mb-6">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-blue-400 hover:text-blue-300 transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6 text-center">
                    ⚠️ {error}
                </div>
            )}

            <form onSubmit={handleSubmit(create)} className='space-y-6'>
                <Input
                    label="👤 Full Name"
                    placeholder="Enter your full name"
                    {...register("name", {
                        required: true,
                    })}
                />
                <Input
                    label="📧 Email"
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                />
                <Input
                    label="🔒 Password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: true,
                    })}
                />
                <Button type="submit" className="w-full mt-8">
                    ✨ Create Account
                </Button>
            </form>
        </div>
    </div>
  )
}

export default Signup