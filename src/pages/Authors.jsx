import { useState, useEffect } from "react";
import Table from "../components/Table";
import axios from "axios";

const Authors = () => {

  const [authors, setAuthors] = useState();

  const url = "http://localhost:3000/authors"

  const getAuthors = async () => {
    try{
      const res = await axios.get(url)
      setAuthors(res.data)
    }catch (error){
      console.log(error)
    }
  }

  useEffect(() => {
    getAuthors()
  }, [])

  const title = ['Nome']

  return (
    <div>

      <Table data={authors} titles={title} tableTitle={'Autores'} />

    </div>
  )
}

export default Authors