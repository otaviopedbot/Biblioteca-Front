import React from 'react';
import { getAllAuthors } from '../../requests/author';
import Table from '../../components/Table';

const Authors = () => {
  const data = getAllAuthors();
  const titles = ['Nome'];

  return (
    !data || data.length === 0 ? (
      <h1>Autor não encontrado</h1>
    ) : (
      <div>
        <Table data={data} titles={titles} tableTitle={'Autores'} />
      </div>
    )
  );
};

export default Authors;
