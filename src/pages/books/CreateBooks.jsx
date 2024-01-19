import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postBook } from '../../requests/book';

//componentes:
import Card from '../../components/Card'
import Check from '../../components/buttons/Check'
import Return from '../../components/buttons/Return'
import { toast } from 'react-toastify';


const CreateBooks = () => {

  const [title, setTitle] = useState("")
  const [page, setPage] = useState("")
  const [quantity, setQuantity] = useState("")
  const [author_id, setAuthor_id] = useState("")
  const [bookshelve_id, setBookshelve_id] = useState("")


  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const saveBook = (e) => {

    e.preventDefault()

    if (title === '' || page === '' || quantity === '' || author_id === '' || bookshelve_id === '') {
      toast.warn('Preencha todos os campos corretamente')
      return;
    }

    try {
      setIsLoading(true)
      postBook(title, page, quantity, author_id, bookshelve_id)
      toast.success(`Livro ${title} cadastrado com sucesso`);
      navigate('/books')
      setIsLoading(false)

    } catch (error) {
      toast.error('Erro ao cadastrar Livro');
      console.log(error)
      setIsLoading(false)
    }

  }


  return (
    <div>

      <Card title={'Novo Livro'}>


        <form onSubmit={saveBook}>

          <div className='mb-2'>
            <label htmlFor="title" classtitle="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Título</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Título' />
          </div>

          <div className='mb-2'>
            <label htmlFor="page" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Páginas</label>
            <input type="number" value={page} onChange={(e) => setPage(e.target.value)} id="page" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Páginas' />
          </div>

          <div className='mb-2'>
            <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantidade</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Quantidade' />
          </div>

          <div className='mb-2'>
            <label htmlFor="author_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID do Autor</label>
            <input type="number" value={author_id} onChange={(e) => setAuthor_id(e.target.value)} id="author_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='ID Autor' />
          </div>

          <div>
            <label htmlFor="bookshelve_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID da Estante</label>
            <input type="number" value={bookshelve_id} onChange={(e) => setBookshelve_id(e.target.value)} id="bookshelve_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='ID Estante' />
          </div>

          {/* botões */}

          {!isLoading && (

            <Check />

          )}

          <Link to={'/Books'}>
            <Return />
          </Link>

        </form>


      </Card>

    </div>
  )
}

export default CreateBooks