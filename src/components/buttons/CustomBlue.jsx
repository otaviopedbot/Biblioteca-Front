import React from 'react'

const CustomBlue = ({title, func}) => {
    return (
        <button type="button" onClick={func} className="text-white bg-gradient-to-br from-blue-500 to-purple-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{title}</button>
    )
}

export default CustomBlue