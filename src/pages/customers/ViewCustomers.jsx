import React, { useState, useEffect } from 'react';
import { getCustomer, deleteCustomer } from '../../requests/customer';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import Swal from "sweetalert2";

//componentes:
import Card from '../../components/Card';
import Return from '../../components/buttons/Return'
import Edit from '../../components/buttons/Edit'
import Delete from '../../components/buttons/Delete'
import ValidateData from '../../components/validation/ValidateData';
import ValidateAdmin from '../../components/validation/ValidateAdmin';


const ViewCustomers = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const configConfirmation = {
    title: "Tem certeza?",
    text: "Não é possivel reverter esta ação!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, deletar!"
  }

  useEffect(() => {

    const showCustomer = async () => {
      try {
        const result = await getCustomer(id);
        setData(result);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    showCustomer();

  }, [id]);


  const removeCustomer = async () => {
    const confirmation = await Swal.fire(configConfirmation);

    if (confirmation.isConfirmed) {
      try {
        await deleteCustomer(id);
        navigate('/Customers')
        toast.warn(`Cliente ${data.name} removido com sucesso`)
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error)
      }
    }

  };


  return (
    <ValidateAdmin>
      <ValidateData data={data} message={'Autor não encontrado'}>


        <Card title={'Detalhes do Cliente'}>

          <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400" key={data.id}>
            <li>ID: {data.id}</li>
            <li>Nome: {data.name}</li>
            <li>Telefone: {data.phone}</li>
            <li>Endereço: {data.adress}</li>
          </ul>

          {/* botões: */}

          <Link to={'edit'}>
            <Edit />
          </Link>


          <Link to={'/customers'}>
            <Return />
          </Link>


          <span onClick={() => removeCustomer(data.id)}>
            <Delete />
          </span>


        </Card>


      </ValidateData>
    </ValidateAdmin>

  );
}

export default ViewCustomers;
