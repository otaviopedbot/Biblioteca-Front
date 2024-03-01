import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getCustomer, updateCustomer } from '../../requests/customer';
import { toast } from 'react-toastify';

//componentes:
import Card from '../../components/Card'
import Check from '../../components/buttons/Check'
import Return from '../../components/buttons/Return'
import InputField from '../../components/InputField';
import ValidateData from '../../components/validation/ValidateData';
import ValidateAdmin from '../../components/validation/ValidateAdmin';


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
        toast.error(error.response.data.message);
      }
    };

    showCustomer();

  }, [id]);


  const editCustomer = async (e) => {

    e.preventDefault();

    try {
      setIsLoading(true);
      await updateCustomer(id, customer.name, customer.phone, customer.adress)
      toast.success(`Cliente ${customer.name} editado com sucesso`);
      setIsLoading(false);
      navigate(`/customers/${id}`);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (

    <ValidateAdmin>
      <ValidateData data={customer} message={'Cliente não encontrado'}>

      <div className='grid grid-cols-1 grid-rows-1 h-screen'>
      <div className='flex justify-center items-center'>

        <Card title={'Editar Cliente'}>

          <form onSubmit={editCustomer}>

            <InputField
              label={"Nome"}
              type={"text"}
              name={"name"}
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            />

            <InputField
              label={"Telefone"}
              type={"tel"}
              name={"phone"}
              value={customer.phone}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
            />

            <InputField
              label={"Endereço"}
              type={"text"}
              name={"adress"}
              value={customer.adress}
              onChange={(e) => setCustomer({ ...customer, adress: e.target.value })}
            />

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
        </div>

      </ValidateData>
    </ValidateAdmin>

  )
}

export default EditCustomers