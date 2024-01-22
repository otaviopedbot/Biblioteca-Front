import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postCustomer } from '../../requests/customer';

//componentes:
import Card from '../../components/Card'
import Check from '../../components/buttons/Check'
import Return from '../../components/buttons/Return'
import { toast } from 'react-toastify';


const CreateCustomers = () => {


  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [adress, setAdress] = useState("")


  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const saveCustomer = (e) => {

    e.preventDefault()

    if (name === '' || phone === '' || adress === '') {
      toast.warn('Preencha todos os campos corretamente')
      return;
    }

    try {
      setIsLoading(true)
      postCustomer(name, phone, adress)
      toast.success(`Cliente ${name} cadastrado com sucesso`);
      navigate('/customers')
      setIsLoading(false)

    } catch (error) {
      toast.error(`Erro ao cadastrar Cliente: ${error.message}`);
      console.log(error)
      setIsLoading(false)
    }

  }


  return (
    <div>

      <Card title={'Novo Cliente'}>


        <form onSubmit={saveCustomer}>

          <div className='mb-2'>
            <label htmlFor="title" classtitle="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Nome' />
          </div>

          <div className='mb-2'>
            <label htmlFor="page" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone</label>
            <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} id="page" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Telefone' />
          </div>

          <div className='mb-2'>
            <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Endereço</label>
            <input type="number" value={adress} onChange={(e) => setAdress(e.target.value)} id="quantity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Endereço' />
          </div>


          {/* botões */}

          {!isLoading && (

            <Check />

          )}

          <Link to={'/customers'}>
            <Return />
          </Link>

        </form>


      </Card>

    </div>
  )
}

export default CreateCustomers