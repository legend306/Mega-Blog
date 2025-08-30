import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/configuration";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import config from "../../config/config"

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();
    const authState = useSelector((state) => state.auth);
    const userData = useSelector((state) => state.auth.userData);
    
    console.log("🔍 Full auth state:", authState);
    console.log("👤 userData:", userData);

    const submit = async (data) => {
        console.log("Submit triggered!", data);
        console.log("Database:", config.appwriteDatabaseId);
        console.log("Collection:", config.appwriteCollectionId);
        console.log("🧠 userData:", userData);

        if (!userData || !userData.$id) {
            alert("User not logged in. Please login to submit a post.");
            return;
        }

        setIsLoading(true);
        try {
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            console.error("Error submitting post:", error);
            alert("Error submitting post. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                    <h2 className="text-2xl font-bold text-white">
                        {post ? "✏️ Edit Post" : "📝 Create New Post"}
                    </h2>
                </div>
                
                <form onSubmit={handleSubmit(submit)} className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content Section */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="space-y-2">
                                <Input
                                    label="📝 Title"
                                    placeholder="Enter your post title..."
                                    className={`transition-all duration-200 ${errors.title ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
                                    {...register("title", { 
                                        required: "Title is required",
                                        minLength: { value: 3, message: "Title must be at least 3 characters" }
                                    })}
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm flex items-center gap-1">
                                        ⚠️ {errors.title.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Input
                                    label="🔗 Slug"
                                    placeholder="post-url-slug"
                                    className={`transition-all duration-200 ${errors.slug ? 'border-red-500 focus:border-red-500' : 'focus:border-blue-500'}`}
                                    {...register("slug", { required: "Slug is required" })}
                                    onInput={(e) => {
                                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                                    }}
                                />
                                {errors.slug && (
                                    <p className="text-red-500 text-sm flex items-center gap-1">
                                        ⚠️ {errors.slug.message}
                                    </p>
                                )}
                            </div>

                            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                                <RTE 
                                    label="📄 Content" 
                                    name="content" 
                                    control={control} 
                                    defaultValue={getValues("content")} 
                                />
                            </div>
                        </div>

                        {/* Sidebar Section */}
                        <div className="space-y-6">
                            {/* Image Upload Section */}
                            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    🖼️ Featured Image
                                </label>
                                
                                <div className="space-y-4">
                                    <input
                                        type="file"
                                        accept="image/png, image/jpg, image/jpeg, image/gif"
                                        className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-all duration-200"
                                        {...register("image", { required: !post ? "Featured image is required" : false })}
                                        onChange={(e) => {
                                            handleImageChange(e);
                                            register("image").onChange(e);
                                        }}
                                    />
                                    
                                    {errors.image && (
                                        <p className="text-red-500 text-sm flex items-center gap-1">
                                            ⚠️ {errors.image.message}
                                        </p>
                                    )}

                                    {/* Image Preview */}
                                    {(imagePreview || (post && post.featuredImage)) && (
                                        <div className="relative group">
                                            <img
                                                src={imagePreview || appwriteService.getFilePreview(post.featuredImage)}
                                                alt={post?.title || "Preview"}
                                                className="w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-200 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                                                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    📷 Preview
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Status Section */}
                            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                                <Select
                                    options={["active", "inactive"]}
                                    label="📊 Status"
                                    className="transition-all duration-200 focus:border-blue-500"
                                    {...register("status", { required: true })}
                                />
                            </div>

                            {/* Submit Button */}
                            <Button 
                                type="submit" 
                                disabled={isLoading}
                                bgColor={post ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"} 
                                className="w-full py-3 font-semibold text-white rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                        {post ? "Updating..." : "Publishing..."}
                                    </>
                                ) : (
                                    <>
                                        {post ? "✅ Update Post" : "🚀 Publish Post"}
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}