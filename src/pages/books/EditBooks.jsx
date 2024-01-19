import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getBook, updateBook } from '../../requests/book';

//componentes:
import Card from '../../components/Card'
import Check from '../../components/buttons/Check'
import Return from '../../components/buttons/Return'
import { toast } from 'react-toastify';


const EditBooks = () => {


  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const [book, setBook] = useState({
    title: "",
    page: "",
    quantity: "",
    author_id: "",
    bookshelve_id: ""
  })


  useEffect(() => {

    const showBook = async () => {
      try {
        const data = await getBook(id);
        setBook({
          title: data.title,
          page: data.page,
          quantity: data.quantity,
          author_id: data.author_id,
          bookshelve_id: data.bookshelve_id
        });
      } catch (error) {
        console.error('Erro ao obter Livro:', error);
      }
    };

    showBook();

  }, [id]);


  const editBook = async (e) => {

    e.preventDefault();

    try {
      setIsLoading(true);
      updateBook(id, book.title, book.page, book.quantity, book.author_id, book.bookshelve_id)
      toast.success('Livro editado com sucesso');
      setIsLoading(false);
      navigate('/books/' + id);
    } catch (error) {
      toast.error('Erro ao editar Livro');
      console.error(error);
      setIsLoading(false);
    }
  };

  
  return (
    <div>

      <Card title={'Editar Livro'}>


        <form onSubmit={editBook}>


          <div className='mb-2'>
            <label htmlFor="title" classtitle="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Título</label>
            <input type="text" value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Título' />
          </div>

          <div className='mb-2'>
            <label htmlFor="page" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Páginas</label>
            <input type="number" value={book.page} onChange={(e) => setBook({ ...book, page: e.target.value })} id="page" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Páginas' />
          </div>

          <div className='mb-2'>
            <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantidade</label>
            <input type="number" value={book.quantity} onChange={(e) => setBook({ ...book, quantity: e.target.value })} id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Quantidade' />
          </div>

          <div className='mb-2'>
            <label htmlFor="author_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID do Autor</label>
            <input type="number" value={book.author_id} onChange={(e) => setBook({ ...book, author_id: e.target.value })} id="author_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='ID Autor' />
          </div>

          <div>
            <label htmlFor="bookshelve_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID da Estante</label>
            <input type="number" value={book.bookshelve_id} onChange={(e) => setBook({ ...book, bookshelve_id: e.target.value })} id="bookshelve_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='ID Estante' />
          </div>



          {/* botões */}

          {!isLoading && (

            <Check />

          )}

          <Link to={'/Books/' + id}>
            <Return />
          </Link>

        </form>


      </Card>

    </div>
  )
}

export default EditBooks