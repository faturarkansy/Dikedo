import React, { Component } from "react";

export default class Search extends Component {
    render() {
        return (
            <div className="dark:bg-gray-900">
                <label htmlFor="table-search" className="sr-only">
                    Search
                </label>
                <div className="relative mt-1">
                    {/* SVG Icon, removed on small screens */}
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 items-center ps-3 pointer-events-none hidden lg:flex">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>

                    <input
                        type="text"
                        id="table-search"
                        className="block pt-2 pl-3 lg:pl-10 text-xs lg:text-sm text-gray-900 border-2 border-gray-300 rounded-lg w-32 md:w-52 lg:w-80 bg-white focus:ring-cyan-400 focus:border-cyan-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-400 dark:focus:border-cyan-400"
                        placeholder="Search for items"
                    />
                </div>

            </div>
        );
    }
}