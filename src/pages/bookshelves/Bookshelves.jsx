import React, { useState, useEffect } from 'react';
import { getAllBookshelves } from '../../requests/bookshelve';
import { toast } from 'react-toastify';

//componentes:
import Table from '../../components/Table';
import ValidateData from '../../components/validation/ValidateData';

const Bookshelves = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const showBookshelves = async () => {
      try {
        const response = await getAllBookshelves();
        setData(response);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    showBookshelves();
  }, []);

  const titles = ['Nome'];

  return (

    <ValidateData data={data} message={'Não foi possivel obter Estantes'}>

      <div>
        <Table data={data} titles={titles} tableTitle={'Estantes'} btnTitle={'Nova Estante'} />
      </div>

    </ValidateData>

  );
};

export default Bookshelves;