import React from 'react';
import CustomBlue from './buttons/CustomBlue';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    return (
        <div className="pagination mt-2">
            {pageNumbers.map(number => (
                <CustomBlue title={number} key={number} onClick={() => onPageChange(number)} className={currentPage === number ? 'active' : ''}>
                    {number}
                </CustomBlue>
            ))}
        </div>
    );
};

export default Pagination; // Certifique-se de que esta linha esteja presente no arquivo
