import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getBookshelve, updateBookshelve } from '../../requests/bookshelve';

//componentes:
import Card from '../../components/Card'
import Check from '../../components/buttons/Check'
import Return from '../../components/buttons/Return'
import { toast } from 'react-toastify';


const EditBookshelves = () => {


  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const [bookshelve, setBookshelve] = useState({
    name: "",
  })


  useEffect(() => {

    const showBookshelve = async () => {
      try {
        const data = await getBookshelve(id);
        setBookshelve({
          name: data.name
        });
      } catch (error) {
        console.error('Erro ao obter Estante:', error);
      }
    };

    showBookshelve();

  }, [id]);


  const editBookshelve = async (e) => {

    e.preventDefault();

    try {
      setIsLoading(true);
      updateBookshelve(id, bookshelve.name)
      toast.success('Estante editada com sucesso');
      setIsLoading(false);
      navigate('/Bookshelves/' + id);
    } catch (error) {
      toast.error('Erro ao editar Estante');
      console.error(error);
      setIsLoading(false);
    }
  };

  
  return (
    <div>

      <Card title={'Editar Estante'}>


        <form onSubmit={editBookshelve}>


          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
            <input type="text" value={bookshelve.name} onChange={(e) => setBookshelve({ ...bookshelve, name: e.target.value })} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Nome' />
          </div>

          {/* botões */}

          {!isLoading && (

            <Check />

          )}

          <Link to={'/Bookshelves/' + id}>
            <Return />
          </Link>

        </form>


      </Card>

    </div>
  )
}

export default EditBookshelves