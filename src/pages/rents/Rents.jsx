import React, { useState, useEffect } from 'react';
import { getAllRents } from '../../requests/rent';
import { toast } from 'react-toastify';

//componentes:
import Table from '../../components/Table';
import ValidateData from '../../components/validation/ValidateData';
import ValidateAdmin from '../../components/validation/ValidateAdmin'

const Rents = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5); // Número de itens por página
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllRents(page, pageSize);
        setData(response.data);
        setTotalPages(Math.ceil(response.total_items / pageSize));
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchData();
  }, [page, pageSize]);

  const titles = ['Data', 'Título do Livro', 'Nome Cliente'];

  return (

    <ValidateAdmin>
      <ValidateData data={data} message={"Não foi possivel obter Aluguéis"}>

        <Table data={data} titles={titles} tableTitle={'Alugueis'} btnTitle={'Novo Aluguel'} totalPages={totalPages} setPage={setPage} page={page} />

      </ValidateData>
    </ValidateAdmin>

  );
};

export default Rents;
