import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getAuthor, updateAuthor } from '../../requests/author';
import AuthService from "../../services/authService"
import { toast } from 'react-toastify';


//componentes:
import Card from '../../components/Card'
import Check from '../../components/buttons/Check'
import ErrorScreen from '../../components/ErrorScreen'
import Return from '../../components/buttons/Return'


const EditAuthors = () => {

  const user = AuthService.getCurrentUser();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const [author, setAuthor] = useState({
    name: "",
  })


  useEffect(() => {

    const showAuthor = async () => {
      try {
        const data = await getAuthor(id);
        setAuthor({
          name: data.name
        });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    showAuthor();

  }, [id]);


  const editAuthor = async (e) => {

    e.preventDefault();

    try {
      setIsLoading(true);
      await updateAuthor(id, author.name)
      toast.success(`Autor ${author.name} atualizado com sucesso`);
      navigate('/authors');
    } catch (error) {
      toast.error(`Erro ao atualizar Autor: ${error.response.data.message}`);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div>

      {!author || user.user.is_admin == 0 ? (

        <ErrorScreen message={'Autor não encontrado'} />

      ) : (

        <Card title={'Editar Autor'}>

          <form onSubmit={editAuthor}>


            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
              <input type="text" value={author.name} onChange={(e) => setAuthor({ ...author, name: e.target.value })} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Nome' />
            </div>

            {/* botões */}

            {!isLoading && (

              <Check />

            )}

            <Link to={'/authors/' + id}>
              <Return />
            </Link>

          </form>

        </Card>

      )}

    </div >
  )
}

export default EditAuthors