import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postRent } from '../../requests/rent';

//componentes:
import Card from '../../components/Card'
import Check from '../../components/buttons/Check'
import Return from '../../components/buttons/Return'
import { toast } from 'react-toastify';
import InputField from '../../components/InputField';
import ValidateAdmin from '../../components/validation/ValidateAdmin';


const CreateRents = () => {

  const [date, setDate] = useState("")
  const [customer_id, setCustomer_id] = useState("")
  const [book_id, setBook_id] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const saveRent = async (e) => {
    e.preventDefault()

    if (date === '' || customer_id === '' || book_id === '') {
      toast.warn('Preencha todos os campos corretamente')
      return;
    }

    try {
      setIsLoading(true)
      await postRent(date, customer_id, book_id)
      toast.success(`Aluguel na data ${date} cadastrado com sucesso`);
      navigate('/Rents')
      setIsLoading(false)
    } catch (error) {
      toast.error(`Erro ao cadastrar Aluguel: ${error.response.data.message}`);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };


  return (

    <ValidateAdmin>

      <Card title={'Novo Aluguel'}>

        <form onSubmit={saveRent}>

          <InputField label={"Data"} type={"date"} name={"date"} value={date} onChange={(e) => setDate(e.target.value)} />

          <InputField label={"ID do Cliente"} type={"number"} name={"customer_id"} value={customer_id} onChange={(e) => setCustomer_id(e.target.value)} />

          <InputField label={"ID do Livro"} type={"number"} name={"book_id"} value={book_id} onChange={(e) => setBook_id(e.target.value)} />

          {/* botões */}

          {!isLoading && (

            <Check />

          )}

          <Link to={'/rents'}>
            <Return />
          </Link>

        </form>

      </Card>

    </ValidateAdmin>
  )
}

export default CreateRents