import React, { useState, useEffect } from 'react';
import { getAllAuthors } from '../../requests/author';
import { toast } from 'react-toastify';
import Table from '../../components/Table';
import ErrorScreen from '../../components/ErrorScreen'

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


  return (!data || data.length === 0 ? (

    <ErrorScreen message={'Autores não encontrados'} />

  ) : (

    <div>
      <Table data={data} titles={titles} tableTitle={'Autores'} btnTitle={'Novo Autor'} />
    </div>

  )

  );
};

export default Authors;
