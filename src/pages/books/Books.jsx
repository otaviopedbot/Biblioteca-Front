import React, { useState, useEffect } from 'react';
import { getAllBooks } from '../../requests/book';
import { toast } from 'react-toastify';

//componentes:
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import ValidateData from '../../components/validation/ValidateData'

const Books = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5); // Número de itens por página
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBooks(page, pageSize);
        setData(response.data);
        setTotalPages(Math.ceil(response.total_items / pageSize));
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchData();
  }, [page, pageSize]);

  const titles = ['Título', 'páginas', 'Quantidade', 'Autor', 'Estante'];

  return (

    <ValidateData data={data} message={'Não foi possivel obter Livros'}>

      <Table data={data} titles={titles} tableTitle={'Livros'} btnTitle={'Novo Livro'} totalPages={totalPages} setPage={setPage} page={page} />

    </ValidateData>

  );
};

export default Books;