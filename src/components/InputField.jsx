import React from 'react';

const InputField = ({ label, type, name, value, onChange }) => {
    // Verifica se o tipo é "textarea" e renderiza um textarea
    if (type === 'textarea') {
        return (
            <div className='mb-2'>
                <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
                <textarea value={value} onChange={onChange} id={name} name={name} rows="4" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={label}></textarea>
            </div>
        );
    }
    // Se o tipo for "range", renderiza um input range
    if (type === 'range') {
        return (
            <div className='mb-2'>
                <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
                <input type={type} min="0" max="10" value={value} onChange={onChange} id={name} name={name} className="appearance-none bg-gray-200 h-4 rounded-full w-full mt-1 focus:outline-none dark:bg-gray-600" />
                <output className="text-gray-700 dark:text-white mt-1 ml-2">{value}</output>
            </div>
        );
    }
    // Se o tipo não for "textarea" nem "range", renderiza um input normal
    return (
        <div className='mb-2'>
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input type={type} value={value} onChange={onChange} id={name} name={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={label} />
        </div>
    );
}

export default InputField;
