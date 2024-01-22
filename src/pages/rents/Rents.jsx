import React, { useState, useEffect } from 'react';
import { getAllRents } from '../../requests/rent';
import Table from '../../components/Table';

const Rents = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const showRents = async () => {
      try {
        const response = await getAllRents();
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    showRents();
  }, []);


  const titles = ['Data', 'ID Autor', 'ID Livro'];

  
  return (!data || data.length === 0 ? (

    <h1 className='flex items-center justify-center h-screen flex-col px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white'>
      Nenhum dado disponível.
    </h1>

  ) : (

    <div>
      <Table data={data} titles={titles} tableTitle={'Alugueis'} btnTitle={'Novo Aluguel'} />
    </div>

  )

  );
};

export default Rents;
