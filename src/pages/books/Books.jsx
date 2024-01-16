import { useState, useEffect } from "react";
import Table from "../../components/Table";
import axios from "axios";

const books = () => {

  const url = "http://localhost:3000/books"

  const [books, setBooks] = useState();

  const getBooks = async () => {
    try {
      const res = await axios.get(url)
      setBooks(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBooks()
  }, [])

  const title = ['Título', 'páginas', 'Quantidade', 'ID autor', 'ID estante']

  return (
    <div>

      <Table data={books} titles={title} tableTitle={'Livros'} />

    </div>
  )
}

export default books