import React from 'react'

const Return = ({ size }) => {

    let className = ''

    if (!size) {
        className = `w-6 h-6 text-gray-800 dark:text-white`
    } else {
        className = `w-${size} h-${size} text-gray-800 dark:text-white`
    }

    return (
        <button
            type="button"
            className="mt-5 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            <svg
                className={className}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 7 3-3-3-3m0 12H5.5a4.5 4.5 0 1 1 0-9H14" />
            </svg>
        </button>
    )
}

export default Return