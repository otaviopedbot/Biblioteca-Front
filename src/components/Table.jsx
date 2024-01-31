import React from 'react';
import { Link } from 'react-router-dom'
import CustomBlue from './buttons/CustomBlue';
import CustomPurple from './buttons/CustomPurple';

const Table = ({ titles, tableTitle, btnTitle, data }) => {

    return (
        <div className="flex items-center justify-center mt-20 mb-20">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-1/2 mt-20">
                <table className="w-full overflow-x-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <caption className="p-5 text-lg font-semibold text-center rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
 
                        Lista de {tableTitle}

                        <div className='mt-5'>

                            <Link to={'create'}>
                                <CustomBlue title={btnTitle} />
                            </Link>

                        </div>

                    </caption>
                    <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {titles.map((title, index) => (
                                <th key={index} className="px-6 py-3">{title}</th>
                            ))}
                            <th scope="col" className="px-6 py-3">Ação</th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.map((rowData) => (

                            <tr key={rowData.id} className={`text-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700`}>

                                {Object.entries(rowData).map(([key, value], colIndex) => key !== 'id' && (
                                    <td key={colIndex} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {value}
                                    </td>
                                ))}

                                <td className="px-6 py-4">
                                    <Link to={`${rowData.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        <CustomPurple title={"Sobre"} />
                                    </Link>
                                </td>

                            </tr>

                        ))}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;