import React, { useState, useEffect } from 'react';
import { getAuthor, deleteAuthor } from '../../requests/author';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import AuthService from "../../services/authService"
import Swal from "sweetalert2";

//componentes:
import Card from '../../components/Card';
import Return from '../../components/buttons/Return'
import Edit from '../../components/buttons/Edit'
import Delete from '../../components/buttons/Delete'
import ValidateData from '../../components/validation/ValidateData';
import ValidateUser from '../../components/validation/ValidateUser';


const ViewAuthors = () => {

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
    const showAuthor = async () => {
      try {
        const result = await getAuthor(id);
        setData(result);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    showAuthor();

  }, [id]);

  const removeAuthor = async () => {
    const confirmation = await Swal.fire(configConfirmation);

    if (confirmation.isConfirmed) {
      try {
        await deleteAuthor(id);
        navigate('/authors');
        toast.success(`Autor ${data.name} removido com sucesso`);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error)
      }
    }

  };


  return (
    <ValidateUser>
      <ValidateData data={data} message={'Autor não encontrado'}>

      <div className='grid grid-cols-1 grid-rows-1 h-screen'>
      <div className='flex justify-center items-center'>

        <Card title={'Detalhes do Autor'}>

          <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400" key={data.id}>
            <li>ID: {data.id}</li>
            <li>Nome: {data.name}</li>
          </ul>

          {/* botões: */}
          {user && user.user.is_admin == 1 && (
            <Link to={'edit'}>
              <Edit />
            </Link>
          )}

          <Link to={'/authors'}>
            <Return />
          </Link>

          {user && user.user.is_admin == 1 && (
            <span onClick={() => removeAuthor(data.id)}>
              <Delete />
            </span>
          )}

        </Card>

        </div>
        </div>

      </ValidateData>
    </ValidateUser> 

  );
}

export default ViewAuthors;