import React, { useState, useEffect } from 'react';
import { getCustomer, deleteCustomer } from '../../requests/customer';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

// componentes:
import Card from '../../components/Card';
import Return from '../../components/buttons/Return'
import Edit from '../../components/buttons/Edit'
import Delete from '../../components/buttons/Delete'


const ViewCustomers = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState()


  useEffect(() => {

    const showCustomer = async () => {
      try {
        const result = await getCustomer(id);
        setData(result);
      } catch (error) {
        console.error('Erro ao obter CLiente:', error);
      }
    };

    showCustomer();

  }, [id]);


  const removeCustomer = async () => {
    try {
      const result = await deleteCustomer(id);
      navigate('/Customers')
      toast.warn(`Cliente de ID: ${data.id} removido com sucesso`)
    } catch (error) {
      console.error('Erro ao obter Cliente:', error);
    }
  };



  return (
    <div>

      <Card title={'Detalhes do Cliente'}>

        <div>

          {!data || data.length === 0 ? (

            <h1>Cliente não encontrado</h1>

          ) : (

            <>

              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400" key={data.id}>
                <li>ID: {data.id}</li>
                <li>Nome: {data.name}</li>
                <li>Telefone: {data.phone}</li>
                <li>Endereço: {data.adress}</li>
              </ul>

              {/* botões: */}

              <Link to={'edit'}>
                <Edit />
              </Link>


              <Link to={'/customers'}>

                <Return />

              </Link>

              <span onClick={() => removeCustomer(data.id)}>
                <Delete />
              </span>

            </>

          )}

        </div>

      </Card>

    </div>
  );
}

export default ViewCustomers;
