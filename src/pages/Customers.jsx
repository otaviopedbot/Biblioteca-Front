import {useState, useEffect} from "react";
import Table from "../components/Table";

const customers = () => {

  const url = "http://localhost:3000/customers"

  const [customers, setCustomers] = useState([])

  useEffect(() => {

    async function fetchData(){
      const res = await fetch(url)

      const data = await res.json()

      setCustomers(data)
    }

    fetchData();

  },[])

  return (
    <div>

      <Table data={customers} title={'Clientes'} />

    </div>
  )
}

export default customers