import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getRent, updateRent } from '../../requests/rent';

//componentes:
import Card from '../../components/Card'
import Check from '../../components/buttons/Check'
import Return from '../../components/buttons/Return'
import { toast } from 'react-toastify';


const EditRents = () => {


  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const [Rent, setRent] = useState({
    date: "",
    customer_id: "",
    book_id: "",
  })


  useEffect(() => {

    const showRent = async () => {
      try {
        const data = await getRent(id);
        setRent({
          date: data.date,
          customer_id: data.customer_id,
          book_id: data.book_id,
        });
      } catch (error) {
        console.error('Erro ao obter Aluguel:', error);
      }
    };

    showRent();

  }, [id]);


  const editRent = async (e) => {

    e.preventDefault();

    try {
      setIsLoading(true);
      updateRent(id, Rent.date, Rent.author_id, Rent.book_id)
      toast.success('Aluguel editado com sucesso');
      setIsLoading(false);
      navigate('/rents/' + id);
    } catch (error) {
      toast.error('Erro ao editar Aluguel');
      console.error(error);
      setIsLoading(false);
    }
  };

  
  return (
    <div>

      <Card title={'Editar Aluguel'}>


        <form onSubmit={editRent}>


          <div className='mb-2'>
            <label htmlFor="date" classdate="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data</label>
            <input type="date" value={Rent.date} onChange={(e) => setRent({ ...Rent, date: e.target.value })} id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Título' />
          </div>

          <div className='mb-2'>
            <label htmlFor="customer_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Cliente</label>
            <input type="number" value={Rent.customer_id} onChange={(e) => setRent({ ...Rent, customer_id: e.target.value })} id="customer_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Páginas' />
          </div>

          <div className='mb-2'>
            <label htmlFor="book_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID Livro</label>
            <input type="number" value={Rent.book_id} onChange={(e) => setRent({ ...Rent, book_id: e.target.value })} id="book_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Quantidade' />
          </div>


          {/* botões */}

          {!isLoading && (

            <Check />

          )}

          <Link to={'/rents/' + id}>
            <Return />
          </Link>

        </form>


      </Card>

    </div>
  )
}

export default EditRents