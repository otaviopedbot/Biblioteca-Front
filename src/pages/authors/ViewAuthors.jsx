import React from 'react';
import { getAuthor } from '../../requests/author';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

// components
import Card from '../../components/Card';
import Return from '../../components/buttons/Return'
import Edit from '../../components/buttons/Edit'
import Delete from '../../components/buttons/Delete'


const ViewAuthors = () => {
  const { id } = useParams();
  const data = getAuthor(id);

  console.log(data);

  return (
    <div>

      <Card title={'Detalhes do Autor'}>

        <div>
          {!data || data.length === 0 ? (

            <h1>Autor não encontrado</h1>

          ) : (

            <>
              {data.map((author) => (


                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400" key={author.id}>
                  <li>ID: {author.id}</li>
                  <li>Nome: {author.name}</li>
                </ul>


              ))}

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
