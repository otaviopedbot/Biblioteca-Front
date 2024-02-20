import React from 'react'

const Check = ({ size }) => {

    let className = ''

    if (!size) {
        className = `w-6 h-6 text-gray-800 dark:text-white`
    }else{
        className = `w-${size} h-${size} text-gray-800 dark:text-white`
    }

    return (
        <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            <svg
                className={className}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
            </svg>
        </button>
    )
}

export default Check