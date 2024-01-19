import React, { useState, useEffect } from 'react';
import { getAllBookshelves } from '../../requests/bookshelve';
import Table from '../../components/Table';

const Bookshelves = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const showBookshelves = async () => {
      try {
        const response = await getAllBookshelves();
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    showBookshelves();
  }, []);

  const titles = ['Nome'];


  return (!data || data.length === 0 ? (

    <h1 className='flex items-center justify-center h-screen flex-col px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white'>
      Nenhum dado disponível.
    </h1>

  ) : (

    <div>
      <Table data={data} titles={titles} tableTitle={'Estantes'} btnTitle={'Nova Estante'} />
    </div>

  )

  );
};

export default Bookshelves;
