import React, { useState, useEffect } from 'react';
import { getAuthor, deleteAuthor } from '../../requests/author';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import AuthService from "../../services/authService"

// componentes:
import Card from '../../components/Card';
import Return from '../../components/buttons/Return'
import Edit from '../../components/buttons/Edit'
import Delete from '../../components/buttons/Delete'
import ErrorScreen from '../../components/ErrorScreen'


const ViewAuthors = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState()
  const user = AuthService.getCurrentUser();


  useEffect(() => {

    const showAuthor = async () => {
      try {
        const result = await getAuthor(id);
        console.log(user.user.is_admin)
        setData(result);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    showAuthor();

  }, [id]);


  const removeAuthor = async () => {
    try {
      await deleteAuthor(id);
      navigate('/authors')
      toast.warn(`Autor ${data.name} removido com sucesso`)
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


  return (
    <div>

      {!data || data.length === 0 ? (

        <ErrorScreen message={'Autor não encontrado'} />

      ) : (

        <Card title={'Detalhes do Autor'}>

          <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400" key={data.id}>
            <li>ID: {data.id}</li>
            <li>Nome: {data.name}</li>
          </ul>

          {/* botões: */}

          {user.user.is_admin == 1 && (
            <Link to={'edit'}>
              <Edit />
            </Link>
          )}

          <Link to={'/authors'}>

            <Return />

          </Link>

          {user.user.is_admin == 1 && (
            <span onClick={() => removeAuthor(data.id)}>
              <Delete />
            </span>
          )}

        </Card>

      )}

    </div>
  );
}

export default ViewAuthors;
