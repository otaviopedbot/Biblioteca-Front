import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getBook, updateBook } from '../../requests/book';
import { toast } from 'react-toastify';

//componentes:
import Card from '../../components/Card'
import Check from '../../components/buttons/Check'
import Return from '../../components/buttons/Return'
import InputField from '../../components/InputField';
import ValidateDataAndUser from '../../components/validation/ValidateDataAndUser';


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
        toast.error(error.response.data.message);
      }
    };

    showBook();

  }, [id]);


  const editBook = async (e) => {

    e.preventDefault();

    try {
      setIsLoading(true);
      await updateBook(id, book.title, book.page, book.quantity, book.author_id, book.bookshelve_id)
      toast.success(`Livro ${book.title} editado com sucesso`);
      setIsLoading(false);
      navigate(`/books/${id}`);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (

    <ValidateDataAndUser data={book} message={'Livro não encontrado'} >

      <Card title={'Editar Livro'}>

        <form onSubmit={editBook}>

          <InputField label={"Título"} type={"text"} name={"title"} value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} />

          <InputField label={"Páginas"} type={"number"} name={"page"} value={book.page} onChange={(e) => setBook({ ...book, page: e.target.value })} />

          <InputField label={"Quantidade"} type={"number"} name={"quantity"} value={book.quantity} onChange={(e) => setBook({ ...book, quantity: e.target.value })} />

          <InputField label={"ID do Autor"} type={"number"} name={"author_id"} value={book.author_id} onChange={(e) => setBook({ ...book, author_id: e.target.value })} />

          <InputField label={"ID da Estante"} type={"number"} name={"bookshelve_id"} value={book.author_id} onChange={(e) => setBook({ ...book, bookshelve_id: e.target.value })} />

          {/* botões */}

          {!isLoading && (

            <Check />

          )}

          <Link to={`/Books/${id}`}>
            <Return />
          </Link>

        </form>

      </Card>

    </ValidateDataAndUser>

  )
}

export default EditBooks