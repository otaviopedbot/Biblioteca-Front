import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getCustomer, updateCustomer } from '../../requests/customer';

//componentes:
import Card from '../../components/Card'
import Check from '../../components/buttons/Check'
import Return from '../../components/buttons/Return'
import { toast } from 'react-toastify';


const EditCustomers = () => {


  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    adress: "",
  })


  useEffect(() => {

    const showCustomer = async () => {
      try {
        const data = await getCustomer(id);
        setCustomer({
          name: data.name,
          phone: data.phone,
          adress: data.adress,
        });
      } catch (error) {
        console.error('Erro ao obter Cliente:', error);
      }
    };

    showCustomer();

  }, [id]);


  const editCustomer = async (e) => {

    e.preventDefault();

    try {
      setIsLoading(true);
      updateCustomer(id, customer.name, customer.phone, customer.adress)
      toast.success('Cliente editado com sucesso');
      setIsLoading(false);
      navigate('/customers/' + id);
    } catch (error) {
      toast.error('Erro ao editar Cliente');
      console.error(error);
      setIsLoading(false);
    }
  };

  
  return (
    <div>

      <Card title={'Editar Cliente'}>


        <form onSubmit={editCustomer}>


          <div className='mb-2'>
            <label htmlFor="name" classtitle="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
            <input type="text" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Nome' />
          </div>

          <div className='mb-2'>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone</label>
            <input type="tel" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Telefone' />
          </div>

          <div className='mb-2'>
            <label htmlFor="adress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Endereço</label>
            <input type="text" value={customer.adress} onChange={(e) => setCustomer({ ...customer, adress: e.target.value })} id="adress" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Endereço' />
          </div>



          {/* botões */}

          {!isLoading && (

            <Check />

          )}

          <Link to={'/customers/' + id}>
            <Return />
          </Link>

        </form>


      </Card>

    </div>
  )
}

export default EditCustomers