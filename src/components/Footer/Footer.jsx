import React from "react";
import {Link} from "react-router-dom"
import Logo from "../Logo";

function Footer() {
    return (
        <section className="relative overflow-hidden py-12 bg-gray-900 border-t border-gray-700">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-6 inline-flex items-center space-x-3">
                                <Logo width="100px" />
                                <span className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                                    LegendBlog
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">
                                    &copy; Copyright 2025. All Rights Reserved by LegendBlog.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-blue-400">
                                Company
                            </h3>
                            <ul>
                                <li className="mb-3">
                                    <Link
                                        className="text-base font-medium text-gray-300 hover:text-blue-400 transition-colors duration-200"
                                        to="/"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <Link
                                        className="text-base font-medium text-gray-300 hover:text-blue-400 transition-colors duration-200"
                                        to="/"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <Link
                                        className="text-base font-medium text-gray-300 hover:text-blue-400 transition-colors duration-200"
                                        to="/"
                                    >
                                        Affiliate Program
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium text-gray-300 hover:text-blue-400 transition-colors duration-200"
                                        to="/"
                                    >
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-purple-400">
                                Support
                            </h3>
                            <ul>
                                <li className="mb-3">
                                    <Link
                                        className="text-base font-medium text-gray-300 hover:text-purple-400 transition-colors duration-200"
                                        to="/"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <Link
                                        className="text-base font-medium text-gray-300 hover:text-purple-400 transition-colors duration-200"
                                        to="/"
                                    >
                                        Help
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <Link
                                        className="text-base font-medium text-gray-300 hover:text-purple-400 transition-colors duration-200"
                                        to="/"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium text-gray-300 hover:text-purple-400 transition-colors duration-200"
                                        to="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-6 text-xs font-semibold uppercase text-green-400">
                                Legals
                            </h3>
                            <ul>
                                <li className="mb-3">
                                    <Link
                                        className="text-base font-medium text-gray-300 hover:text-green-400 transition-colors duration-200"
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <Link
                                        className="text-base font-medium text-gray-300 hover:text-green-400 transition-colors duration-200"
                                        to="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium text-gray-300 hover:text-green-400 transition-colors duration-200"
                                        to="/"
                                    >
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer