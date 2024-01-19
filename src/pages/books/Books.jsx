import React, { useState, useEffect } from 'react';
import { getAllBooks } from '../../requests/book';
import Table from '../../components/Table';

const Books = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const showBooks = async () => {
      try {
        const response = await getAllBooks();
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    showBooks();
  }, []);


  const titles = ['Título', 'páginas', 'Quantidade', 'ID Autor', 'ID estante'];

  
  return (!data || data.length === 0 ? (

    <h1 className='flex items-center justify-center h-screen flex-col px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white'>
      Nenhum dado disponível.
    </h1>

  ) : (

    <div>
      <Table data={data} titles={titles} tableTitle={'Livros'} btnTitle={'Novo Livro'} />
    </div>

  )

  );
};

export default Books;
