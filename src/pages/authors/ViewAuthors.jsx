import React, { useState, useEffect } from 'react';
import { getAuthor, deleteAuthor } from '../../requests/author';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

// componentes:
import Card from '../../components/Card';
import Return from '../../components/buttons/Return'
import Edit from '../../components/buttons/Edit'
import Delete from '../../components/buttons/Delete'


const ViewAuthors = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState()


  useEffect(() => {

    const showAuthor = async () => {
      try {
        const result = await getAuthor(id);
        setData(result);
      } catch (error) {
        console.error('Erro ao obter autor:', error);
      }
    };

    showAuthor();

  }, [id]);


  const removeAuthor = async () => {
    try {
      const result = await deleteAuthor(id);
      navigate('/authors')
      toast.warn(`Autor de ID: ${data.id} removido com sucesso`)
    } catch (error) {
      console.error('Erro ao obter autor:', error);
    }
  };



  return (
    <div>

      <Card title={'Detalhes do Autor'}>

        <div>

          {!data || data.length === 0 ? (

            <h1>Autor não encontrado</h1>

          ) : (

            <>

              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400" key={data.id}>
                <li>ID: {data.id}</li>
                <li>Nome: {data.name}</li>
              </ul>

              {/* botões: */}

              <Link to={'edit'}>
                <Edit />
              </Link>


              <Link to={'/authors'}>

                <Return />

              </Link>

              <span onClick={() => removeAuthor(data.id)}>
                <Delete />
              </span>

            </>

          )}

        </div>

      </Card>

    </div>
  );
}

export default ViewAuthors;
