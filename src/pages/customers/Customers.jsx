import React, { useState, useEffect } from 'react';
import { getAllCustomers } from '../../requests/customer';
import Table from '../../components/Table';

const Customers = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const showCustomers = async () => {
      try {
        const response = await getAllCustomers();
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    showCustomers();
  }, []);


  const titles = ['Nome', 'Telefone', 'Endereço'];

  
  return (!data || data.length === 0 ? (

    <h1 className='flex items-center justify-center h-screen flex-col px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white'>
      Nenhum dado disponível.
    </h1>

  ) : (

    <div>
      <Table data={data} titles={titles} tableTitle={'Clientes'} btnTitle={'Novo Cliente'} />
    </div>

  )

  );
};

export default Customers;
