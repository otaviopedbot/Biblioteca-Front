import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postRent } from '../../requests/rent';

//componentes:
import Card from '../../components/Card'
import Check from '../../components/buttons/Check'
import Return from '../../components/buttons/Return'
import { toast } from 'react-toastify';


const CreateRents = () => {


  const [date, setDate] = useState("")
  const [customer_id, setCustomer_id] = useState("")
  const [book_id, setBook_id] = useState("")


  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const saveRent = (e) => {

    e.preventDefault()

    if (date === '' || customer_id === '' || book_id === '') {
      toast.warn('Preencha todos os campos corretamente')
      return;
    }

    try {
      setIsLoading(true)
      postRent(date, customer_id, book_id)
      toast.success(`Aluguel na data ${date} cadastrado com sucesso`);
      navigate('/Rents')
      setIsLoading(false)

    } catch (error) {
      toast.error(`Erro ao cadastrar Aluguel: ${error.message}`);
      setIsLoading(false)
    }

  }


  return (
    <div>

      <Card title={'Novo Aluguel'}>


        <form onSubmit={saveRent}>

          <div className='mb-2'>
            <label htmlFor="date" classtitle="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Data' />
          </div>

          <div className='mb-2'>
            <label htmlFor="customer_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID do cliente</label>
            <input type="number" value={customer_id} onChange={(e) => setCustomer_id(e.target.value)} id="customer_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='ID do cliente' />
          </div>

          <div className='mb-2'>
            <label htmlFor="book_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID do livro</label>
            <input type="number" value={book_id} onChange={(e) => setBook_id(e.target.value)} id="book_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='ID do livro' />
          </div>


          {/* botões */}

          {!isLoading && (

            <Check />

          )}

          <Link to={'/rents'}>
            <Return />
          </Link>

        </form>


      </Card>

    </div>
  )
}

export default CreateRents