import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getRent, updateRent } from '../../requests/rent';
import { toast } from 'react-toastify';

//componentes:
import Card from '../../components/Card'
import Check from '../../components/buttons/Check'
import Return from '../../components/buttons/Return'
import InputField from '../../components/InputField';
import ValidateData from '../../components/validation/ValidateData';
import ValidateAdmin from '../../components/validation/ValidateAdmin';


const EditRents = () => {

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [rent, setRent] = useState({
    date: "",
    customer_id: "",
    book_id: "",
  })

  useEffect(() => {

    const showRent = async () => {
      try {
        const data = await getRent(id);
        setRent({
          date: data.date,
          customer_id: data.customer.id,
          book_id: data.book.id,
        });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    showRent();

  }, [id]);

  const editRent = async (e) => {

    e.preventDefault();

    try {
      setIsLoading(true);
      await updateRent(id, rent.date, rent.customer_id, rent.book_id)
      toast.success(`Aluguel do Cliente de is ${rent.customer_id} editado com sucesso`);
      setIsLoading(false);
      navigate(`/rents/${id}`);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };



  return (

    <ValidateAdmin>
      <ValidateData data={rent} message={'Aluguel não encontrado'}>

        <Card title={'Editar Aluguel'}>

          <form onSubmit={editRent}>

            <InputField
              label={"Data"}
              type={"date"}
              name={"date"}
              value={rent.date}
              onChange={(e) => setRent({ ...rent, date: e.target.value })}
            />

            <InputField
              label={"ID Cliente"}
              type={"number"}
              name={"customer_id"}
              value={rent.customer_id}
              onChange={(e) => setRent({ ...rent, customer_id: e.target.value })}
            />

            <InputField
              label={"ID Livro"}
              type={"number"}
              name={"book_id"}
              value={rent.book_id}
              onChange={(e) => setRent({ ...rent, book_id: e.target.value })}
            />

            {/* botões */}

            {!isLoading && (
              <Check />
            )}

            <Link to={'/rents/' + id}>
              <Return />
            </Link>

          </form>

        </Card>

      </ValidateData>
    </ValidateAdmin>
  )
}

export default EditRents