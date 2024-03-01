import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/authService';
const user = AuthService.getCurrentUser();


//componentes:
import CustomBlue from './buttons/CustomBlue';
import CustomPurple from './buttons/CustomPurple';
import Pagination from './Pagination';

const Table = ({ titles, tableTitle, btnTitle, data, totalPages, setPage, page }) => {

    return (
        <div className="flex items-center justify-center h-screen text-center">
            <div className="overflow-x-auto shadow-md sm:rounded-lg w-full lg:w-4/5 xl:w-3/4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <caption className="p-5 text-lg font-semibold text-center rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                        Lista de {tableTitle}

                        {user && user.user.is_admin == 1 && (
                            <div className="mt-5">
                                <Link to={'create'}>
                                    <CustomBlue title={btnTitle} />
                                </Link>
                            </div>
                        )}

                    </caption>
                    <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {titles.map((title, index) => (
                                <th key={index} className="px-4 lg:px-6 py-3">{title}</th>
                            ))}

                            {user && (

                                <th scope="col" className="px-4 lg:px-6 py-3">Ação</th>

                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((rowData) => (
                            <tr key={rowData.id} className={`text-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700`}>
                                {Object.entries(rowData).map(([key, value], colIndex) => key !== 'id' && (
                                    <td key={colIndex} className="px-4 lg:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{value}</td>
                                ))}

                                {user && (

                                    <td className="px-2 py-4">
                                        <Link to={`${rowData.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            <CustomPurple title={"Sobre"} />
                                        </Link>
                                    </td>

                                )}

                            </tr>

                        ))}

                    </tbody>

                </table>
                <div className="text-center mb-2 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                    <Pagination totalPages={totalPages} setPage={setPage} page={page} />

                </div>

            </div>
        </div>
    );
};

export default Table;