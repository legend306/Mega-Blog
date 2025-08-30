import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/configuration";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
  return (
    <div className='w-full py-12'>
        <Container>
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-white mb-4">
                    📚 All Posts
                </h1>
                <p className="text-gray-400 text-lg">
                    Explore all the amazing content from our community
                </p>
            </div>
            {posts.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700 max-w-md mx-auto">
                        <div className="text-6xl mb-6">📚</div>
                        <h2 className="text-2xl font-bold text-white mb-4">No Posts Yet</h2>
                        <p className="text-gray-400">Be the first to create a post!</p>
                    </div>
                </div>
            )}
        </Container>
    </div>
  )
}

export default AllPosts