import React, { useState, useEffect } from 'react';
import { getBookshelve, deleteBookshelve } from '../../requests/bookshelve';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

// componentes:
import Card from '../../components/Card';
import Return from '../../components/buttons/Return'
import Edit from '../../components/buttons/Edit'
import Delete from '../../components/buttons/Delete'


const ViewBookshelves = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [data, setData] = useState()


  useEffect(() => {

    const showBookshelve = async () => {
      try {
        const result = await getBookshelve(id);
        setData(result);
      } catch (error) {
        console.error('Erro ao obter Estante:', error);
      }
    };

    showBookshelve();

  }, [id]);


  const removeBookshelve = async () => {
    try {
      const result = await deleteBookshelve(id);
      navigate('/bookshelves')
      toast.warn(`Estante ${data.name} removida com sucesso`)
    } catch (error) {
      console.error('Erro ao obter Estante:', error);
    }
  };


  let cardName = 'Detalhes da Estante'


  return (
    <div>

      <Card title={cardName}>

        <div>

          {!data || data.length === 0 ? (

            <h1>Estante não encontrada</h1>

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


              <Link to={'/Bookshelves'}>

                <Return />

              </Link>

              <span onClick={() => removeBookshelve(data.id)}>
                <Delete />
              </span>

            </>

          )}

        </div>

      </Card>

    </div>
  );
}

export default ViewBookshelves;
