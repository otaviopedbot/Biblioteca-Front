import {useState, useEffect} from "react";
import Table from "../components/Table";

const bookshelves = () => {

  const url = "http://localhost:3000/bookshelves"

  const [bookshelves, setBookshelves] = useState([])

  useEffect(() => {

    async function fetchData(){
      const res = await fetch(url)

      const data = await res.json()

      setBookshelves(data)
    }

    fetchData();

  },[])

  return (
    <div>

      <Table data={bookshelves} title={'Estantes'} />

    </div>
  )
}

export default bookshelves