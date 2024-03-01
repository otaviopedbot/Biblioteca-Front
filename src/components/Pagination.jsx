//componentes:
import CustomBlue from './buttons/CustomBlue';

const Pagination = ({ totalPages, setPage, page }) => {


    return (

        <div className='mt-2'>

            <CustomBlue
                title={
                    <svg className="w-[12px] h-[12px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                    </svg>
                }
                func={() => setPage(prevPage => prevPage - 1)} disabled={page === 1} />


            <span className='mr-2 font-semibold text-white'>{page}/{totalPages}</span>

            <CustomBlue
                title={
                    <svg className="w-[12px] h-[12px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                    </svg>
                }
                func={() => setPage(prevPage => prevPage + 1)} disabled={page === totalPages} />

        </div>
    );

};

export default Pagination;
