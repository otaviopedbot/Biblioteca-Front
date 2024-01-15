import { useState, useEffect } from "react";
import Table from "../components/Table";
import axios from "axios";

const bookshelves = () => {

  const url = "http://localhost:3000/bookshelves"

  const [bookshelves, setBookshelvess] = useState();

  const getBookshelves = async () => {
    try {
      const res = await axios.get(url)
      setBookshelvess(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBookshelves()
  }, [])


  const title = ['Nome']

  return (
    <div>

      <Table data={bookshelves} titles={title} tableTitle={'Estantes'} />

    </div>
  )
}

export default bookshelves