import React from 'react';

const Table = ({ data, title }) => {
    
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center mt-20 mb-20">
                <h1>Nenhum dado disponível.</h1>
            </div>
        );
    }

    const tableData = data[0];

    return (
        <div className="flex items-center justify-center mt-20 mb-20">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-1/2">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <caption className="p-5 text-lg font-semibold text-center rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                        Lista de {title}
                    </caption>
                    <thead className="text-center text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {tableData.name ? <th scope="col" className="px-6 py-3">Nome</th> : null}
                            {tableData.title ? <th scope="col" className="px-6 py-3">Título</th> : null}
                            {tableData.date ? <th scope="col" className="px-6 py-3">Data</th> : null}
                            {tableData.phone ? <th scope="col" className="px-6 py-3">Telefone</th> : null}
                            {tableData.adress ? <th scope="col" className="px-6 py-3">Endereço</th> : null}
                            {tableData.page ? <th scope="col" className="px-6 py-3">Páginas</th> : null}
                            {tableData.quantity ? <th scope="col" className="px-6 py-3">Exemplares qtd</th> : null}
                            {tableData.customer_id ? <th scope="col" className="px-6 py-3">Cliente ID</th> : null}
                            {tableData.book_id ? <th scope="col" className="px-6 py-3">Livro ID</th> : null}
                            {tableData.author_id ? <th scope="col" className="px-6 py-3">Autor ID</th> : null}
                            {tableData.bookshelve_id ? <th scope="col" className="px-6 py-3">Estante ID</th> : null}
                            <th scope="col" className="px-6 py-3">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((rowData) => (
                            <tr key={rowData.id} className={`text-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700`}>

                                {tableData.name &&
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {rowData.name}
                                    </th>
                                }
                                {tableData.title &&
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {rowData.title}
                                    </th>
                                }
                                {tableData.date &&
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {rowData.date}
                                    </th>
                                }
                                {tableData.phone &&
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {rowData.phone}
                                    </th>
                                }
                                {tableData.adress &&
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {rowData.adress}
                                    </th>
                                }
                                {tableData.page &&
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {rowData.page}
                                    </th>
                                }
                                {tableData.quantity &&
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {rowData.quantity}
                                    </th>
                                }
                                {tableData.customer_id &&
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {rowData.customer_id}
                                    </th>
                                }
                                {tableData.book_id &&
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {rowData.book_id}
                                    </th>
                                }
                                {tableData.author_id &&
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {rowData.author_id}
                                    </th>
                                }
                                {tableData.bookshelve_id &&
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {rowData.bookshelve_id}
                                    </th>
                                }
                                
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        Ver
                                    </a>
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-2">
                                        Editar
                                    </a>
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