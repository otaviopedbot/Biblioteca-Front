import React, { useState, useEffect } from 'react';
import { getRent, deleteRent } from '../../requests/rent';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

// componentes:
import Card from '../../components/Card';
import Return from '../../components/buttons/Return'
import Edit from '../../components/buttons/Edit'
import Delete from '../../components/buttons/Delete'
import ValidateData from '../../components/validation/ValidateData';
import ValidateAdmin from '../../components/validation/ValidateAdmin';


const ViewRents = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState([])


  useEffect(() => {

    const showRent = async () => {
      try {
        const result = await getRent(id);
        setData(result);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    showRent();

  }, [id]);


  const removeRent = async () => {
    try {
      const result = await deleteRent(id);
      navigate('/rents')
      toast.warn(`Aluguel de ID: ${data.id} removido com sucesso`)
    } catch (error) {
      console.error('Erro ao obter Aluguel:', error);
    }
  };


  return (
    <ValidateAdmin>
      <ValidateData data={data} message={'Aluguel não encontrado'}>

        <Card title={'Detalhes do Aluguel'}>

          <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400" key={data.id}>
            <li>ID: {data.id}</li>
            <li>Data: {data.date}</li>
            <li>ID Cliente: {data.Rent.id}</li>
            <li>Nome do Cliente: {data.Rent.name}</li>
            <li>ID Livro: {data.book.id}</li>
            <li>Título do Livro: {data.book.title}</li>
          </ul>

          {/* botões: */}

          <Link to={'edit'}>
            <Edit />
          </Link>


          <Link to={'/rents'}>

            <Return />

          </Link>

          <span onClick={() => removeRent(data.id)}>
            <Delete />
          </span>

        </Card>

      </ValidateData>
    </ValidateAdmin>
  );
}

export default ViewRents;
