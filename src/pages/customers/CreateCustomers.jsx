import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postCustomer } from '../../requests/customer';

//componentes:
import Card from '../../components/Card'
import Check from '../../components/buttons/Check'
import Return from '../../components/buttons/Return'
import { toast } from 'react-toastify';
import InputField from '../../components/InputField';
import ValidateAdmin from '../../components/validation/ValidateAdmin';


const CreateCustomers = () => {

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [adress, setAdress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const saveCustomer = async (e) => {
    e.preventDefault()

    if (name === '' || phone === '' || adress === '') {
      toast.warn('Preencha todos os campos corretamente')
      return;
    }

    try {
      setIsLoading(true)
      await postCustomer(name, phone, adress)
      toast.success(`Cliente ${name} cadastrado com sucesso`);
      navigate('/customers')
      setIsLoading(false)
    } catch (error) {
      toast.error(`Erro ao cadastrar Cliente: ${error.response.data.message}`);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };


  return (

    <ValidateAdmin>

      <Card title={'Novo Cliente'}>

        <form onSubmit={saveCustomer}>

          <InputField label={"Nome"} type={"text"} name={"name"} value={name} onChange={(e) => setName(e.target.value)} />

          <InputField label={"Telefone"} type={"text"} name={"phone"} value={phone} onChange={(e) => setPhone(e.target.value)} />

          <InputField label={"Endereço"} type={"text"} name={"adress"} value={adress} onChange={(e) => setAdress(e.target.value)} />

          {/* botões */}

          {!isLoading && (

            <Check />

          )}

          <Link to={'/customers'}>
            <Return />
          </Link>

        </form>

      </Card>

    </ValidateAdmin>
  )
}

export default CreateCustomers