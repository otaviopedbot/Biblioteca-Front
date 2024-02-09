import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getBookshelve, updateBookshelve } from '../../requests/bookshelve';
import { toast } from 'react-toastify';

//componentes:
import Card from '../../components/Card'
import Check from '../../components/buttons/Check'
import Return from '../../components/buttons/Return'
import InputField from '../../components/InputField';
import ValidateDataAndUser from '../../components/validation/ValidateDataAndUser';


const EditBookshelves = () => {

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const [bookshelve, setBookshelve] = useState({
    name: "",
  })

  useEffect(() => {

    const showBookshelve = async () => {
      try {
        const data = await getBookshelve(id);
        setBookshelve({
          name: data.name
        });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    showBookshelve();

  }, [id]);


  const editBookshelve = async (e) => {

    e.preventDefault();

    try {
      setIsLoading(true);
      await updateBookshelve(id, bookshelve.name)
      toast.success(`Autor ${author.name} atualizado com sucesso`);
      setIsLoading(false);
      navigate(`/Bookshelves/${id}`);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (

    <ValidateDataAndUser data={bookshelve} message={'Estante não encontrada'}>

      <Card title={'Editar Estante'}>

        <form onSubmit={editBookshelve}>

          <InputField label={"Nome"} type={"text"} name={"name"} value={bookshelve.name} onChange={(e) => setBookshelve({ ...bookshelve, name: e.target.value })} />

          {/* botões */}

          {!isLoading && (

            <Check />

          )}

          <Link to={'/Bookshelves/' + id}>
            <Return />
          </Link>

        </form>

      </Card>

    </ValidateDataAndUser>
    
  )
}

export default EditBookshelves