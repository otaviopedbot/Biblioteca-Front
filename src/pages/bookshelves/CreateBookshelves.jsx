import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postBookshelve } from '../../requests/bookshelve';

//componentes:
import Card from '../../components/Card'
import Check from '../../components/buttons/Check'
import Return from '../../components/buttons/Return'
import { toast } from 'react-toastify';


const CreateBookshelves = () => {

  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const saveBookshelve = (e) => {

    e.preventDefault()

    if (name === "") {
      toast.warn('Preencha todos os campos corretamente')
      return;
    }

    try {
      setIsLoading(true)
      postBookshelve(name)
      toast.success(`Estante ${name} cadastrada com sucesso`);
      navigate('/Bookshelves')
      setIsLoading(false)

    } catch (error) {
      toast.error(`Erro ao cadastrar Estante: ${error.message}`);
      console.log(error)
      setIsLoading(false)
    }

  }


  return (
    <div>

      <Card title={'Nova Estante'}>


        <form onSubmit={saveBookshelve}>

          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Nome' />
          </div>

          {/* botões */}

          {!isLoading && (

            <Check />

          )}

          <Link to={'/bookshelves'}>
            <Return />
          </Link>

        </form>


      </Card>

    </div>
  )
}

export default CreateBookshelves