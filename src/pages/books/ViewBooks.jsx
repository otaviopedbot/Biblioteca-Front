import React, { useState, useEffect } from 'react';
import { getBook, deleteBook } from '../../requests/book';
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
ValidateUser


const ViewBooks = () => {
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

    const showBook = async () => {
      try {
        const result = await getBook(id);
        setData(result);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    showBook();

  }, [id]);


  const removeBook = async () => {
    const confirmation = await Swal.fire(configConfirmation);

    if (confirmation.isConfirmed) {
      try {
        await deleteBook(id);
        navigate('/books')
        toast.success(`Livro de ID: ${data.title} removido com sucesso`)
      } catch (error) {
        console.error(error.response.data.message);
        console.log(error)
      }
    }

  };


  return (

    <ValidateData data={data} message={'Livro não encontrado'}>
      <ValidateUser>

        <Card title={'Detalhes do Livro'}>

          <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400" key={data.id}>
            <li>ID: {data.id}</li>
            <li>Título: {data.title}</li>
            <li>Paginas: {data.page}</li>
            <li>Quantidade: {data.quantity}</li>
            <li>ID do Autor: {data.author_id}</li>
            <li>ID da Estante: {data.bookshelve_id}</li>
          </ul>

          {/* botões: */}

          {user && user.user.is_admin == 1 && (
            <Link to={'edit'}>
              <Edit />
            </Link>
          )}

          <Link to={'/Books'}>

            <Return />

          </Link>

          {user && user.user.is_admin == 1 && (
            <span onClick={() => removeBook(data.id)}>
              <Delete />
            </span>
          )}

        </Card>

      </ValidateUser>
    </ValidateData>

  );
}

export default ViewBooks;
