import React, { useState, useEffect } from 'react';
import { getBook, deleteBook } from '../../requests/book';
import { getReview, deleteReview, updateReview } from '../../requests/review';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthService from "../../services/authService";
import Swal from "sweetalert2";
import ValidateData from '../../components/validation/ValidateData';
import ValidateUser from '../../components/validation/ValidateUser';

// componentes:
import Card from '../../components/Card';
import Return from '../../components/buttons/Return'
import Edit from '../../components/buttons/Edit'
import Delete from '../../components/buttons/Delete'


const ViewBooks = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState(null);
  const user = AuthService.getCurrentUser();
  const configConfirmation = {
    title: "Tem certeza?",
    text: "Não é possível reverter esta ação!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, deletar!"
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const result = await getBook(id);
        setBook(result);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchBook();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await getReview(id);
        setReviews(result);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchReviews();
  }, [id]);

  const removeBook = async () => {
    const confirmation = await Swal.fire(configConfirmation);
    if (confirmation.isConfirmed) {
      try {
        await deleteBook(id);
        navigate('/books');
        toast.success(`Livro removido com sucesso`);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };

  console.log(reviews)

  return (
    <ValidateData data={book} message={'Livro não encontrado'}>
      <ValidateUser>
        {book && (
          <div className="grid grid-cols-2 grid-rows-1 gap-4 h-screen text-center mt-24 m-8">

            {/* Livro */}

            <div className="p-8 m-4">
              <div className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 text-gray-700 dark:text-white">
                <div className="p-6 text-center">

                  <div className="font-bold text-xl mb-4">{book.title}</div>

                  <h1 className='m-2'>Sinopse:</h1>
                  <h2>{book.synopsis}</h2>

                  <h1 className='m-2'>Informações:</h1>

                  <ul className="space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400" key={book.id}>
                    <li>ID: {book.id}</li>
                    <li>Numero de páginas: {book.page}</li>
                    <li>Quantidade: {book.quantity}</li>
                    <li>Autor(a): {book.author && book.author.name}</li>
                    <li>Estante: {book.bookshelve && book.bookshelve.name}</li>
                  </ul>

                  {/* botões */}
                  {user && user.user.is_admin === 1 && (
                    <Link to={'edit'}>
                      <Edit />
                    </Link>
                  )}

                  <Link to={'/Books'}>
                    <Return />
                  </Link>

                  {user && user.user.is_admin === 1 && (
                    <span onClick={removeBook}>
                      <Delete />
                    </span>
                  )}

                </div>
              </div>
            </div>

            {/* Avaliações */}

            <div className="p-8 m-4">
              <div className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 text-gray-700 dark:text-white">
                <div className="p-6 text-center">

                  <div className="font-bold text-xl mb-4">Avaliações:</div>

                  <div className="space-y-4">
                    {/* Aqui você pode exibir as avaliações do livro */}
                  </div>

                </div>
              </div>
            </div>


          </div>
        )}
      </ValidateUser>
    </ValidateData>
  );
}

export default ViewBooks;