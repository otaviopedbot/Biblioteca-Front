import {useState, useEffect} from "react";
import Table from "../components/Table";

const Author = () => {

  const url = "http://localhost:3000/authors"

  const [authors, setAuthors] = useState([])

  useEffect(() => {

    async function fetchData(){
      const res = await fetch(url)

      const data = await res.json()

      setAuthors(data)
    }

    fetchData();

  },[])

  return (
    <div>

      <Table data={authors} title={'Autores'} />

    </div>
  )
}

export default Author