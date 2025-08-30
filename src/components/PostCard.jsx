import React from "react";
import appwriteService from "../appwrite/configuration"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {

    return (
        <Link to={`/post/${$id}`} className='block group'>
            <div className='w-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20'>
                <div className='w-full justify-center mb-4 overflow-hidden rounded-lg'>
                    <img 
                        src={appwriteService.getFilePreview(featuredImage)} 
                        alt={title}
                        className='rounded-lg w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110' 
                    />
                </div>
                <h2 className='text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200 line-clamp-2'>
                    {title}
                </h2>
                <div className='mt-2 flex items-center text-gray-400 text-sm'>
                    <span>📖 Read more</span>
                    <span className='ml-auto'>→</span>
                </div>
            </div>
        </Link>
    )
}


export default PostCard