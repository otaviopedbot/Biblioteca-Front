import React, { useState, useEffect } from 'react';
import { getAllAuthors } from '../../requests/author';
import { toast } from 'react-toastify';

//componentes:
import Table from '../../components/Table';
import ValidateData from '../../components/validation/ValidateData';

const Authors = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const showAuthors = async () => {
      try {
        const response = await getAllAuthors();
        setData(response);
      } catch (error) {
        toast.error(error.response.data.message)
      }
    };

    showAuthors();
  }, []);

  const titles = ['Nome'];

  return (

    <ValidateData data={data} message={"Não foi possivel obter autores"}>

      <div>
        <Table data={data} titles={titles} tableTitle={'Autores'} btnTitle={'Novo Autor'} />
      </div>
      
    </ValidateData>

  )
};

export default Authors;