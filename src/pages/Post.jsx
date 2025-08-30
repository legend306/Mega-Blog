import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/configuration";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-12">
            <Container>
                <article className="max-w-4xl mx-auto">
                    {/* Featured Image Section */}
                    <div className="w-full mb-8 relative">
                        {post.featuredImage && (
                            <div className="relative overflow-hidden rounded-2xl border border-gray-700 shadow-2xl">
                                <img
                                    src={appwriteService.getFilePreview(post.featuredImage)}
                                    alt={post.title}
                                    className="w-full h-96 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            </div>
                        )}

                        {isAuthor && (
                            <div className="absolute top-4 right-4 flex gap-3">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <button className="px-4 py-2 bg-blue-600/90 hover:bg-blue-700 text-white text-sm font-medium rounded-lg backdrop-blur-sm transition-all duration-200 shadow-lg hover:shadow-xl">
                                        Edit
                                    </button>
                                </Link>
                                <button 
                                    onClick={deletePost}
                                    className="px-4 py-2 bg-red-600/90 hover:bg-red-700 text-white text-sm font-medium rounded-lg backdrop-blur-sm transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Title Section */}
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center text-gray-400 text-sm">
                            <span className="mr-4">📅 {new Date().toLocaleDateString()}</span>
                            <span className="mr-4">👤 Author</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                post.status === 'active' 
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                            }`}>
                                {post.status === 'active' ? '✅ Published' : '📝 Draft'}
                            </span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                        <div className="prose prose-invert prose-lg max-w-none">
                            <div className="text-gray-300 leading-relaxed">
                                {parse(post.content)}
                            </div>
                        </div>
                    </div>
                </article>
            </Container>
        </div>
    ) : (
        <div className="py-12 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                <p className="text-white text-lg">Loading post...</p>
            </div>
        </div>
    );
}