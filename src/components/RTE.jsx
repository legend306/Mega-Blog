import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';


export default function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-2 pl-1 text-gray-300 font-medium'>{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            skin: 'oxide-dark',
                            content_css: 'dark',
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                            content_style: `
                                body { 
                                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
                                    font-size: 16px;
                                    line-height: 1.6;
                                    color: #e5e7eb;
                                    background-color: #1f2937;
                                    margin: 1rem;
                                }
                                h1, h2, h3, h4, h5, h6 { color: #f9fafb; margin-top: 1.5em; margin-bottom: 0.5em; }
                                p { margin-bottom: 1em; }
                                a { color: #60a5fa; }
                                blockquote { border-left: 4px solid #3b82f6; padding-left: 1rem; margin: 1.5rem 0; color: #9ca3af; }
                                code { background-color: #374151; color: #f9fafb; padding: 0.2rem 0.4rem; border-radius: 0.25rem; }
                                pre { background-color: #111827; padding: 1rem; border-radius: 0.5rem; }
                            `
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />

        </div>
    )
}
