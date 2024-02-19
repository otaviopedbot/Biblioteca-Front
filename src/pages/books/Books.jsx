import React, { useState, useEffect } from 'react';
import { getAllBooks } from '../../requests/book';
import { toast } from 'react-toastify';

//componentes:
import Table from '../../components/Table';
import ValidateData from '../../components/validation/ValidateData'

const Books = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const showBooks = async () => {
      try {
        const response = await getAllBooks();
        setData(response);
      } catch (error) {
        toast.error(error.response.data.message)
      }
    };

    showBooks();
  }, []);

  const titles = ['Título', 'páginas', 'Quantidade', 'ID Autor', 'ID estante'];

  return (

    <ValidateData data={data} message={'Não foi possivel obter Livros'}>

      <div>
        <Table data={data} titles={titles} tableTitle={'Livros'} btnTitle={'Novo Livro'} />
      </div>

    </ValidateData>

  );
};

export default Books;