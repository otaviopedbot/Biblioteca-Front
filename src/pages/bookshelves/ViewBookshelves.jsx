import React, { useState, useEffect } from 'react';
import { getBookshelve, deleteBookshelve } from '../../requests/bookshelve';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import AuthService from "../../services/authService"
import Swal from "sweetalert2";

// componentes:
import Card from '../../components/Card';
import Return from '../../components/buttons/Return'
import Edit from '../../components/buttons/Edit'
import Delete from '../../components/buttons/Delete'
import ValidateData from '../../components/validation/ValidateData';
import ValidateUser from '../../components/validation/ValidateUser';


const ViewBookshelves = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const user = AuthService.getCurrentUser();
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

    const showBookshelve = async () => {
      try {
        const result = await getBookshelve(id);
        setData(result);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    showBookshelve();

  }, [id]);


  const removeBookshelve = async () => {
    const confirmation = await Swal.fire(configConfirmation);

    if (confirmation.isConfirmed) {
      try {
        await deleteBookshelve(id);
        navigate('/bookshelves')
        toast.success(`Estante ${data.name} removida com sucesso`)
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error)
      }
    }

  };


  return (

    <ValidateData data={data} message={'Estante não encontrada'}>
      <ValidateUser>

      <div className='grid grid-cols-1 grid-rows-1 h-screen'>
      <div className='flex justify-center items-center'>

        <Card title={'Detalhes da Estante'}>

          <ul className="max-w space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400" key={data.id}>
            <li>ID: {data.id}</li>
            <li>Nome: {data.name}</li>
          </ul>

          {/* botões: */}

          {user && user.user.is_admin == 1 && (
            <Link to={'edit'}>
              <Edit />
            </Link>
          )}

          <Link to={'/Bookshelves'}>

            <Return />

          </Link>

          {user && user.user.is_admin == 1 && (
            <span onClick={() => removeBookshelve(data.id)}>
              <Delete />
            </span>
          )}

        </Card>

        </div>
        </div>

      </ValidateUser>
    </ValidateData>

  );
}

export default ViewBookshelves;