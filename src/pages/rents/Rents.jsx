import { useState, useEffect } from "react";
import Table from "../../components/Table";
import axios from "axios";

const rents = () => {

  const url = "http://localhost:3000/rents"

  const [rents, setRents] = useState();

  const getRent = async () => {
    try {
      const res = await axios.get(url)
      setRents(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRent()
  }, [])



const title = ['Data', 'ID cliente', 'ID livro']

  return (
    <div>

      <Table data={rents} titles={title} tableTitle={'Emprestimos'} />

    </div>
  )
}

export default rents