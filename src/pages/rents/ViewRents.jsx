import React, { useState, useEffect } from 'react';
import { getRent, deleteRent } from '../../requests/rent';
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


const ViewRents = () => {
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

    const showRent = async () => {
      try {
        const result = await getRent(id);
        setData(result);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    showRent();

  }, [id]);

  const removeRent = async () => {
    const confirmation = await Swal.fire(configConfirmation);

    if (confirmation.isConfirmed) {
      try {
        await deleteRent(id);
        navigate('/rents')
        toast.warn(`Aluguel ${data.id} removido com sucesso`)
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error)
      }
    }

  };


  return (

    <ValidateAdmin>
      <ValidateData data={data} message={'Aluguel não encontrado'}>

      <div className='grid grid-cols-1 grid-rows-1 h-screen'>
      <div className='flex justify-center items-center'>

        <Card title={'Detalhes do Aluguel'}>

          {data.id && (

            <ul className="max-w space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400" key={data.id}>
              <li>ID: {data.id}</li>
              <li>Data: {data.date}</li>
              <li>ID Cliente: {data.customer.id}</li>
              <li>Nome do Cliente: {data.customer.name}</li>
              <li>ID Livro: {data.book.id}</li>
              <li>Título do Livro: {data.book.title}</li>
            </ul>

          )}

          {/* botões: */}

          <Link to={'edit'}>
            <Edit />
          </Link>


          <Link to={'/rents'}>

            <Return />

          </Link>

          <span onClick={() => removeRent(data.id)}>
            <Delete />
          </span>

        </Card>

        </div>
        </div>

      </ValidateData>
    </ValidateAdmin>

  );
}

export default ViewRents;
