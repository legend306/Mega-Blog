import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import appwriteService from "../appwrite/configuration";
import {Container, PostCard} from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-16 mt-8 text-center">
                <Container>
                    <div className="flex flex-wrap justify-center">
                        <div className="p-8 w-full max-w-2xl">
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700">
                                <div className="text-6xl mb-6">
                                    {authStatus ? "📚" : "🔒"}
                                </div>
                                <h1 className="text-3xl font-bold text-white mb-4">
                                    {authStatus ? "No posts available" : "Welcome to MegaBlog"}
                                </h1>
                                <p className="text-gray-400 text-lg">
                                    {authStatus ? "Be the first to create a post!" : "Login to read amazing posts from our community"}
                                </p>
                                {!authStatus && (
                                    <div className="mt-6">
                                        <Link to="/login" className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                                            Get Started →
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-12'>
            <Container>
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        🎆 Latest Posts
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Discover amazing content from our community
                    </p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home