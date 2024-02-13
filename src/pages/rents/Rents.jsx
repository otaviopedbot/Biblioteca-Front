import React, { useState, useEffect } from 'react';
import { getAllRents } from '../../requests/rent';
import { toast } from 'react-toastify';

//componentes:
import Table from '../../components/Table';
import ValidateData from '../../components/validation/ValidateData';
import ValidateAdmin from '../../components/validation/ValidateAdmin'

const Rents = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const showRents = async () => {
      try {
        const response = await getAllRents();
        setData(response);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    showRents();
  }, []);
  

  const titles = ['Data', 'ID Livro', 'Título Livro', 'ID Cliente', 'Nome Cliente'];


  return (

    <ValidateAdmin>
      <ValidateData data={data} message={"Não foi possivel obter Aluguéis"}>

        <div>
          <Table data={data} titles={titles} tableTitle={'Alugueis'} btnTitle={'Novo Aluguel'} />
        </div>

      </ValidateData>
    </ValidateAdmin>

  );
};

export default Rents;
