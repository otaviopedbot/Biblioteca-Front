import React, { useState, useEffect } from 'react';
import { getAllAuthors } from '../requests/author';

//componentes:
import CustomBlue from './buttons/CustomBlue';

const Pagination = ({totalPages, setPage, page}) => {
    // const [data, setData] = useState([]);
    // const [page, setPage] = useState(1);
    // const [pageSize] = useState(5); // Número de itens por página
    // const [totalPages, setTotalPages] = useState(0);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await getAllAuthors(page, pageSize);
    //             setData(response.data);
    //             setTotalPages(Math.ceil(response.data.total_items / pageSize));
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, [page, pageSize]);


    return (
        <div>

            {/* <ul>
                {data.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul> */}


            <CustomBlue
                title={
                    <svg class="w-[12px] h-[12px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                    </svg>
                }
                func={() => setPage(prevPage => prevPage - 1)} disabled={page === 1} />


            <span className='mr-2 font-semibold text-white'>{page}/{totalPages}</span>

            <CustomBlue
                title={
                    <svg class="w-[12px] h-[12px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                    </svg>
                }
                func={() => setPage(prevPage => prevPage + 1)} disabled={page === totalPages} />



        </div>
    );
};

export default Pagination;
