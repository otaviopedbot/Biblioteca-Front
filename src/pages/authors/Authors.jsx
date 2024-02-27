import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { getAllAuthors } from '../../requests/author';
import { toast } from 'react-toastify';


//componentes:
import Table from '../../components/Table';
import ValidateData from '../../components/validation/ValidateData';

const Authors = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5); // Número de itens por página
  const [totalPages, setTotalPages] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllAuthors(page, pageSize);
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

      <ValidateData data={data} message={'Não foi possivel obter Autores'} >

        <Table data={data} titles={titles} totalPages={totalPages} setPage={setPage} page={page} btnTitle={'Novo Autor'} tableTitle={'Autores'} />

      </ValidateData >

  )
};

export default Authors;