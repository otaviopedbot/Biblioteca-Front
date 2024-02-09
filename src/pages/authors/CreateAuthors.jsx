import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postAuthor } from '../../requests/author';
import { toast } from 'react-toastify';

//componentes:
import Card from '../../components/Card'
import Check from '../../components/buttons/Check'
import Return from '../../components/buttons/Return'
import InputField from '../../components/InputField';
import ValidateUser from '../../components/validation/ValidateUser';


const CreateAuthors = () => {

  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const saveAuthor = async (e) => {
    e.preventDefault();

    if (name === "") {
      toast.warn('Preencha todos os campos corretamente');
      return;
    }

    try {
      setIsLoading(true);
      await postAuthor(name);
      toast.success(`Autor ${name} cadastrado com sucesso`);
      navigate('/authors');
      setIsLoading(false)
    } catch (error) {
      toast.error(`Erro ao cadastrar Autor: ${error.response.data.message}`);
    } finally {
      setIsLoading(false);
    }
  };


  return (

    <ValidateUser>

      <Card title={'Novo Autor'}>

        <form onSubmit={saveAuthor}>

          <InputField label={"Nome"} type={"text"} name={"name"} value={name} onChange={(e) => setName(e.target.value)} />

          {/* botões */}

          {!isLoading && (

            <Check />

          )}

          <Link to={'/authors'}>
            <Return />
          </Link>

        </form>

      </Card>

    </ValidateUser>
  )
}

export default CreateAuthors