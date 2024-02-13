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
  const [author_id, setAuthor_id] = useState("")
  const [bookshelve_id, setBookshelve_id] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const saveBook = async (e) => {
    e.preventDefault()

    if (title === '' || page === '' || quantity === '' || author_id === '' || bookshelve_id === '') {
      toast.warn('Preencha todos os campos corretamente')
      return;
    }

    try {
      setIsLoading(true)
      await postBook(title, page, quantity, author_id, bookshelve_id)
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

      <Card title={'Novo Livro'}>

        <form onSubmit={saveBook}>

          <InputField label={"Título"} type={"text"} name={"title"} value={title} onChange={(e) => setTitle(e.target.value)} />

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

    </ValidateAdmin>
  )
}

export default CreateBooks