import React, { useState, useEffect } from 'react';
import { getBook, deleteBook } from '../../requests/book';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

// componentes:
import Card from '../../components/Card';
import Return from '../../components/buttons/Return'
import Edit from '../../components/buttons/Edit'
import Delete from '../../components/buttons/Delete'


const ViewBooks = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState()


  useEffect(() => {

    const showBook = async () => {
      try {
        const result = await getBook(id);
        setData(result);
      } catch (error) {
        console.error('Erro ao obter Livro:', error);
      }
    };

    showBook();

  }, [id]);


  const removeBook = async () => {
    try {
      const result = await deleteBook(id);
      navigate('/books')
      toast.warn(`Livro ${data.title} removido com sucesso`)
    } catch (error) {
      console.error('Erro ao obter Livro:', error);
    }
  };


  let cardName = 'Detalhes do Livro'


  return (
    <div>

      <Card title={cardName}>

        <div>

          {!data || data.length === 0 ? (

            <h1>Livro não encontrado</h1>

          ) : (

            <>

              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400" key={data.id}>
                <li>ID: {data.id}</li>
                <li>Título: {data.title}</li>
                <li>Paginas: {data.page}</li>
                <li>Quantidade: {data.quantity}</li>
                <li>ID do Autor: {data.author_id}</li>
                <li>ID da Estante: {data.bookshelve_id}</li>
              </ul>

              {/* botões: */}

              <Link to={'edit'}>
                <Edit />
              </Link>


              <Link to={'/Books'}>

                <Return />

              </Link>

              <span onClick={() => removeBook(data.id)}>
                <Delete />
              </span>

            </>

          )}

        </div>

      </Card>

    </div>
  );
}

export default ViewBooks;
