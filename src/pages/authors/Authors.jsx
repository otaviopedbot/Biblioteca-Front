import React, { useState, useEffect } from 'react';
import { getAllAuthors } from '../../requests/author';
import Table from '../../components/Table';

const Authors = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const showAuthors = async () => {
      try {
        const response = await getAllAuthors();
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    showAuthors();
  }, []);

  const titles = ['Nome'];


  return (!data || data.length === 0 ? (

    <h1 className='flex items-center justify-center h-screen flex-col px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white'>
      Nenhum dado disponível.
    </h1>

  ) : (

    <div>
      <Table data={data} titles={titles} tableTitle={'Autores'} btnTitle={'Novo Autor'} />
    </div>

  )

  );
};

export default Authors;
