import {useState, useEffect} from "react";
import Table from "../components/Table";

const books = () => {

  const url = "http://localhost:3000/books"

  const [books, setBooks] = useState([])

  useEffect(() => {

    async function fetchData(){
      const res = await fetch(url)

      const data = await res.json()

      setBooks(data)
    }

    fetchData();

  },[])

  return (
    <div>

      <Table data={books} title={'Livros'} />

    </div>
  )
}

export default books