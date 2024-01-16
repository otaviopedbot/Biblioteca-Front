import { useState, useEffect } from "react";
import Table from "../../components/Table";
import { getAllAuthors } from '../../requests/author'
import axios from "axios";

const Authors = () => {

  const data = getAllAuthors()

  const titles = ['Nome']

  return (
    <div>

      <Table data={data} titles={titles} tableTitle={'Autores'} />

    </div>
  )
}

export default Authors