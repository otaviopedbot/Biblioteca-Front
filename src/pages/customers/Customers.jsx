import React, { useState, useEffect } from 'react';
import { getAllCustomers } from '../../requests/customer';
import { toast } from 'react-toastify';

//componentes:
import Table from '../../components/Table';
import ValidateData from '../../components/validation/ValidateData';
import ValidateAdmin from '../../components/validation/ValidateAdmin'

const Customers = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5); // Número de itens por página
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCustomers(page, pageSize);
        setData(response.data);
        setTotalPages(Math.ceil(response.total_items / pageSize));
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchData();
  }, [page, pageSize]);

  const titles = ['Nome', 'Telefone', 'Endereço'];

  return (

    <ValidateAdmin>
      <ValidateData data={data} message={"Não foi possivel obter Clientes"}>

        <Table data={data} titles={titles} tableTitle={'Clientes'} btnTitle={'Novo Cliente'} totalPages={totalPages} setPage={setPage} page={page} />

      </ValidateData>
    </ValidateAdmin>

  );
};

export default Customers;
