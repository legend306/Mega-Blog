import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from 'react-hook-form'


function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")

        try {
            const session = await authService.login(data)

            if (session) {
                const userData = await authService.getCurrentUser()

                if (userData) {
                    dispatch(authLogin(userData))
                }

                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }




   return (
    <div className='flex items-center justify-center w-full py-12 px-4'>
        <div className='mx-auto w-full max-w-lg bg-gray-800/50 backdrop-blur-sm rounded-2xl p-10 border border-gray-700 shadow-2xl'>
            <div className="mb-6 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">🔑 Welcome Back</h2>
                <p className="text-gray-400">Sign in to your account</p>
            </div>
            <p className="text-center text-base text-gray-400 mb-6">
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className="font-medium text-blue-400 hover:text-blue-300 transition-all duration-200 hover:underline"
                >
                    Sign Up
                </Link>
            </p>
            {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6 text-center">
                    ⚠️ {error}
                </div>
            )}
            <form onSubmit={handleSubmit(login)} className='space-y-6'>
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
                <Button
                    type="submit"
                    className="w-full mt-8"
                >
                    🚀 Sign In
                </Button>
            </form>
        </div>
    </div>
  )
}

export default Login