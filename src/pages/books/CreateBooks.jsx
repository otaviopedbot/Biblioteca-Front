import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postBook } from '../../requests/book';
import { toast } from 'react-toastify';

//componentes:
import Card from '../../components/Card'
import Check from '../../components/buttons/Check'
import Return from '../../components/buttons/Return'
import InputField from '../../components/InputField';
import ValidateAdmin from '../../components/validation/ValidateAdmin';


const CreateBooks = () => {

  const [title, setTitle] = useState("")
  const [page, setPage] = useState("")
  const [quantity, setQuantity] = useState("")
  const [synopsis, setSynopsis] = useState("")
  const [cover, setCover] = useState("")
  const [author_id, setAuthor_id] = useState("")
  const [bookshelve_id, setBookshelve_id] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const saveBook = async (e) => {
    e.preventDefault()

    // if (title === '' || page === '' || quantity === '' || author_id === '' || bookshelve_id === '') {
    //   toast.warn('Preencha todos os campos corretamente')
    //   return;
    // }

    try {
      setIsLoading(true)
      await postBook(title, page, quantity, author_id, bookshelve_id, synopsis, cover)
      toast.success(`Livro ${title} cadastrado com sucesso`);
      navigate('/books')
      setIsLoading(false)
    } catch (error) {
      toast.error(`Erro ao cadastrar Livro: ${error.response.data.message}`);
    } finally {
      setIsLoading(false);
    }
  };


  return (

    <ValidateAdmin>

<div className='grid grid-cols-1 grid-rows-1 h-screen'>
      <div className='flex justify-center items-center'>

      <Card title={'Novo Livro'}>

        <form onSubmit={saveBook}>

          <InputField label={"Título"} type={"text"} name={"title"} value={title} onChange={(e) => setTitle(e.target.value)} />

          <InputField label={"Capa"} type={"text"} name={"cover"} value={cover} onChange={(e) => setCover(e.target.value)} />

          <InputField label={"Sinópse"} type={"text"} name={"synopsis"} value={synopsis} onChange={(e) => setSynopsis(e.target.value)} />

          <InputField label={"Páginas"} type={"number"} name={"pages"} value={page} onChange={(e) => setPage(e.target.value)} />

          <InputField label={"Quantidade"} type={"number"} name={"quantity"} value={quantity} onChange={(e) => setQuantity(e.target.value)} />

          <InputField label={"ID do Autor"} type={"number"} name={"autor_id"} value={author_id} onChange={(e) => setAuthor_id(e.target.value)} />

          <InputField label={"ID da Estante"} type={"number"} name={"bookshelve_id"} value={bookshelve_id} onChange={(e) => setBookshelve_id(e.target.value)} />

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
      </div>

    </ValidateAdmin>
  )
}

export default CreateBooks