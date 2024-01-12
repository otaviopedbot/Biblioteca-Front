import {useState, useEffect} from "react";
import Table from "../components/Table";

const rents = () => {

  const url = "http://localhost:3000/rents"

  const [rents, setRents] = useState([])

  useEffect(() => {

    async function fetchData(){
      const res = await fetch(url)

      const data = await res.json()

      setRents(data)
    }

    fetchData();

  },[])

  return (
    <div>

      <Table data={rents} title={'Emprestimos'} />

    </div>
  )
}

export default rents