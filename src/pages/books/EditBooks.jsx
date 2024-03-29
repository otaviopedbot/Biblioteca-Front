import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getBook, updateBook } from '../../requests/book';
import { toast } from 'react-toastify';

//componentes:
import Card from '../../components/Card'
import Check from '../../components/buttons/Check'
import Return from '../../components/buttons/Return'
import InputField from '../../components/InputField';
import ValidateData from '../../components/validation/ValidateData';
import ValidateAdmin from '../../components/validation/ValidateAdmin';


const EditBooks = () => {

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const [book, setBook] = useState({
    title: "",
    page: "",
    quantity: "",
    author_id: "",
    bookshelve_id: "",
    synopsis: "",
    cover: ""

  })

  useEffect(() => {

    const showBook = async () => {
      try {
        const data = await getBook(id);
        setBook({
          title: data.title,
          page: data.page,
          quantity: data.quantity,
          synopsis: data.synopsis,
          author_id: data.author.id,
          bookshelve_id: data.bookshelve.id,
          cover: data.cover
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
      await updateBook(id, book.title, book.page, book.quantity, book.author_id, book.bookshelve_id, book.synopsis, book.cover)
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

    <ValidateData data={book} message={'Livro não encontrado'} >
      <ValidateAdmin>

        <div className='grid grid-cols-1 grid-rows-1 h-screen'>
          <div className='flex justify-center items-center'>

            <Card title={'Editar Livro'}>

              <form onSubmit={editBook}>

                <InputField label={"Título"} type={"text"} name={"title"} value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} />

                <InputField label={"Sinópse"} type={"textarea"} name={"synopsis"} value={book.synopsis} onChange={(e) => setBook({ ...book, synopsis: e.target.value })} />

                <InputField label={"Capa"} type={"text"} name={"cover"} value={book.cover} onChange={(e) => setBook({ ...book, cover: e.target.value })} />

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

          </div>
        </div>

      </ValidateAdmin>
    </ValidateData>

  )
}

export default EditBooks