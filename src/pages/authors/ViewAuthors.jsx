import React, { useState, useEffect } from 'react';
import { getAuthor } from '../../requests/author';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

// componentes:
import Card from '../../components/Card';
import Return from '../../components/buttons/ReturnPurple'
import Edit from '../../components/buttons/EditBlue'
import Delete from '../../components/buttons/DeleteRed'


const ViewAuthors = () => {
  const { id } = useParams();
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



  console.log(data)


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

              <Delete />

            </>

          )}
        </div>

      </Card>

    </div>
  );
}

export default ViewAuthors;
