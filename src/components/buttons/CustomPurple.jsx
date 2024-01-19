import React from 'react'

const CustomPurple = ({ title }) => {
    return (

        <button
            type="button"
            className="mt-5 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{title}
        </button>
    )

}

export default CustomPurple