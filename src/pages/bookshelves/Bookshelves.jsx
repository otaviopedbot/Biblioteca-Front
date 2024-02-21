import React, { useState, useEffect } from 'react';
import { getAllBookshelves } from '../../requests/bookshelve';
import { toast } from 'react-toastify';

//componentes:
import Table from '../../components/Table';
import ValidateData from '../../components/validation/ValidateData';

const Bookshelves = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5); // Número de itens por página
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBookshelves(page, pageSize);
        setData(response.data);
        setTotalPages(Math.ceil(response.total_items / pageSize));
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchData();
  }, [page, pageSize]);

  const titles = ['Nome'];

  return (

    <ValidateData data={data} message={'Não foi possivel obter Estantes'}>

      <Table data={data} titles={titles} tableTitle={'Estantes'} btnTitle={'Nova Estante'} totalPages={totalPages} setPage={setPage} page={page} />

    </ValidateData>

  );
};

export default Bookshelves;