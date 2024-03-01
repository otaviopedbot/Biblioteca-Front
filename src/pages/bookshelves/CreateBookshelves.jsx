import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postBookshelve } from '../../requests/bookshelve';
import { toast } from 'react-toastify';

//componentes:
import Card from '../../components/Card'
import Check from '../../components/buttons/Check'
import Return from '../../components/buttons/Return'
import InputField from '../../components/InputField';
import ValidateAdmin from '../../components/validation/ValidateAdmin';


const CreateBookshelves = () => {

  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const saveBookshelve = async (e) => {
    e.preventDefault()

    if (name === "") {
      toast.warn('Preencha todos os campos corretamente')
      return;
    }

    try {
      setIsLoading(true)
      await postBookshelve(name)
      toast.success(`Estante ${name} cadastrada com sucesso`);
      navigate('/Bookshelves')
      setIsLoading(false)
    } catch (error) {
      toast.error(`Erro ao cadastrar Estante: ${error.response.data.message}`);
      console.log(error)
      setIsLoading(false)
    } finally {
      setIsLoading(false);
    }
  };


  return (

    <ValidateAdmin>

<div className='grid grid-cols-1 grid-rows-1 h-screen'>
      <div className='flex justify-center items-center'>

      <Card title={'Nova Estante'}>

        <form onSubmit={saveBookshelve}>

          <InputField label={"Nome"} type={"text"} name={"name"} value={name} onChange={(e) => setName(e.target.value)} />

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
      </div>

    </ValidateAdmin>

  )
}

export default CreateBookshelves