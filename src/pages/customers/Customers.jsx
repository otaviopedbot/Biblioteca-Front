import { useState, useEffect } from "react";
import Table from "../../components/Table";
import axios from "axios";

const customers = () => {

  const url = "http://localhost:3000/customers"

  const [customers, setCustomers] = useState();

  const getCustomer = async () => {
    try {
      const res = await axios.get(url)
      setCustomers(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCustomer()
  }, [])


const title = ["Nome", "Telefone", "Endereço"]

  return (
    <div>

      <Table data={customers} titles={title} tableTitle={'Clientes'} />

    </div>
  )
}

export default customers