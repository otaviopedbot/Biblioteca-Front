import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getAuthor, updateAuthor } from '../../requests/author';
import { toast } from 'react-toastify';

//componentes:
import Card from '../../components/Card'
import Check from '../../components/buttons/Check'
import Return from '../../components/buttons/Return'
import InputField from '../../components/InputField';
import ValidateDataAndUser from '../../components/validation/ValidateDataAndUser';


const EditAuthors = () => {

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [author, setAuthor] = useState({
    name: "",
  })

  useEffect(() => {

    const showAuthor = async () => {
      try {
        const data = await getAuthor(id);
        setAuthor({
          name: data.name
        });
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    showAuthor();

  }, [id]);


  const editAuthor = async (e) => {

    e.preventDefault();

    try {
      setIsLoading(true);
      await updateAuthor(id, author.name)
      toast.success(`Autor ${author.name} atualizado com sucesso`);
      setIsLoading(false);
      navigate(`/authors/${id}`);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (

    <ValidateDataAndUser data={author} message={'Autor não encontrado'}>

      <Card title={'Editar Autor'}>

        <form onSubmit={editAuthor}>

          <InputField
            label={"Nome"}
            type={"text"}
            name={"name"}
            value={author.name}
            onChange={(e) => setAuthor({ ...author, name: e.target.value })}
          />

          {/* botões */}

          {!isLoading && (
            <Check />
          )}

          <Link to={`/authors/${id}`}>
            <Return />
          </Link>

        </form>

      </Card>

    </ValidateDataAndUser>

  );
}

export default EditAuthors