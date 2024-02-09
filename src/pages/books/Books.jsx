import React, { useState, useEffect } from 'react';
import { getAllBooks } from '../../requests/book';
import { toast } from 'react-toastify';

//componentes:
import Table from '../../components/Table';
import ErrorScreen from '../../components/ErrorScreen'

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
  
  return (!data || data.length === 0 ? (

    <ErrorScreen message={'Livros não encontrados'} />

  ) : (

    <div>
      <Table data={data} titles={titles} tableTitle={'Livros'} btnTitle={'Novo Livro'} />
    </div>

  )

  );
};

export default Books;