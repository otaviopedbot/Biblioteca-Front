import React, { useState, useEffect } from 'react';
import { getAllCustomers } from '../../requests/customer';
import { toast } from 'react-toastify';

//componentes:
import Table from '../../components/Table';
import ValidateData from '../../components/validation/ValidateData';
import ValidateAdmin from '../../components/validation/ValidateAdmin'

const Customers = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const showCustomers = async () => {
      try {
        const response = await getAllCustomers();
        setData(response);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    showCustomers();
  }, []);


  const titles = ['Nome', 'Telefone', 'Endereço'];


  return (

    <ValidateAdmin>
      <ValidateData data={data} message={"Não foi possivel obter Clientes"}>

        <div>
          <Table data={data} titles={titles} tableTitle={'Clientes'} btnTitle={'Novo Cliente'} />
        </div>

      </ValidateData>
    </ValidateAdmin>

  );
};

export default Customers;
