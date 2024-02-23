import React, { useState, useEffect } from 'react';
import { getBook, deleteBook } from '../../requests/book';
import { getReview, deleteReview, updateReview, postReview } from '../../requests/review';
import { postFavorite, deleteFavorite } from '../../requests/favorite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthService from "../../services/authService";
import Swal from "sweetalert2";

//componentes:
import ValidateData from '../../components/validation/ValidateData'
import ValidateUser from '../../components/validation/ValidateUser';
import Return from '../../components/buttons/Return'
import Edit from '../../components/buttons/Edit'
import Check from '../../components/buttons/Check'
import Delete from '../../components/buttons/Delete'
import Pagination from '../../components/Pagination'
import InputField from '../../components/InputField'
import Favorite from '../../components/buttons/Favorite';
import DropDown from '../../components/DropDown';
import CustomBlue from '../../components/buttons/CustomBlue';


const ViewBooks = () => {

  const [body, setBody] = useState("")
  const [rate, setRate] = useState(0)
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [book, setBook] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(2); //Número de itens por página
  const [totalPages, setTotalPages] = useState(0);
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
  const configConfirmationFavorite = {
    title: "Livro já favoritado!",
    text: "Deseja remover dos favoritos?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, remover!"
  };
  const configSynopsis = {
    title: "Sinopse",
    text: book.synopsis,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Voltar"
  }


  useEffect(() => {
    const showBook = async () => {
      try {
        const result = await getBook(id);
        setBook(result)
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    showBook();

  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReview(id, page, pageSize);
        setData(response.data.data);
        setTotalPages(Math.ceil(response.data.total_items / pageSize));
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchReviews();
  }, [page, pageSize]);

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

  const saveReview = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      console.log(id, user.user.id, body, rate)
      await postReview(id, user.user.id, body, rate)
      toast.success(`Livro ${book.title} avaliado com sucesso`);
      setPage(1)
      setIsLoading(false)
      window.location.reload()
    } catch (error) {
      toast.error(`Erro ao avaliar Livro: ${error.response.data.message}`);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  const removeReview = async () => {
    const confirmation = await Swal.fire(configConfirmation);
    if (confirmation.isConfirmed) {
      try {
        await deleteReview(id, user.user.id);
        setPage(1)
        toast.success(`Avaliação apagada com sucesso`);
        window.location.reload()
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };

  const handleFavorite = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await postFavorite(user.user.id, id)
      toast.success(`Livro ${book.title} favoritado com sucesso`);
      setIsLoading(false)
    } catch (error) {

      const confirmation = await Swal.fire(configConfirmationFavorite);
      if (confirmation.isConfirmed) {
        try {

          await deleteFavorite(user.user.id, id);

          toast.success(`Favorito removido com sucesso`);

        } catch (error) {

          toast.error(`Erro ao remover Favorito`);
          console.log(error);

        }
      }

    } finally {
      setIsLoading(false);
    }

  };

  const teste = async () => {
    await Swal.fire(configSynopsis);
  }


  console.log(book)

  return (
    <ValidateUser>
      <ValidateData data={book} message={'Livro não encontrado'}>

        <div className="grid grid-cols-2 grid-rows-1 gap-4 h-screen text-center mt-24 m-8">

          {/* Livro */}

          <div className="p-8 m-4">
            <div className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 text-gray-700 dark:text-white">
              <div className="p-6 text-center">
                <div className="font-bold text-xl mb-4">{book.title}</div>

                {book.cover ? (

                  <>

                    <img className="rounded-lg mx-auto w-1/3 mb-4" src={book.cover}></img>

                    <span onClick={teste}>
                      <CustomBlue title={'Ver Sinopse'} />
                    </span>

                  </>

                ) : (

                  <>

                    <h1>Sinopse:</h1>
                    <h2>{book.synopsis}</h2>

                  </>


                )}


                <h1 className='m-2'>Informações:</h1>
                <ul className="space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400" key={book.id}>
                  <li>ID: {book.id}</li>
                  <li>Numero de páginas: {book.page}</li>
                  <li>Quantidade disponível: {book.quantity}</li>
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

                {user && !isLoading && (
                  <span onClick={handleFavorite}>
                    <Favorite />
                  </span>
                )}

              </div>
            </div>
          </div>

          {/* Avaliações / comentários */}

          <div className="p-8 m-4">
            <div className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 text-gray-700 dark:text-white">

              {/* avaliações */}

              <div className="p-6 text-center">
                <div className="font-bold text-xl mb-4">Avaliações</div>

                {book.length != 0 && !data ? (
                  <p>Nenhuma avaliação registrada para este livro ainda.</p>
                ) : (

                  <div className="space-y-4">
                    {data.map((review) => (
                      <div key={review.id} className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-700 text-gray-700 dark:text-white p-2">
                        <h1>Usuário:<Link className="hover:text-blue-500 font-bold" to={`/users/${review.username}`}> {review.username}</Link></h1>

                        <p>Nota: {review.rating}/10</p>

                        <p>{review.body}</p>

                        {user.user.id === review.user_id && (
                          <span onClick={removeReview}>
                            <Delete size={4} />
                          </span>
                        )}

                      </div>
                    ))}

                    <Pagination totalPages={totalPages} setPage={setPage} page={page} />
                  </div>
                )}

              </div>

              {/* formulário */}

              <div className='px-6 pb-6'>

                <div className="font-bold text-xl mb-4">Escreva uma avaliação</div>

                <form onSubmit={saveReview}>

                  <InputField label={"Criar avaliação"} type={"textarea"} name={"body"} value={body} onChange={(e) => setBody(e.target.value)} />

                  <p className="block text-sm font-medium text-gray-900 dark:text-white">Nota de 0 a 10</p>

                  <div className="flex items-center space-x-4 justify-center">

                    <InputField type={"range"} name={"Rate"} value={rate} onChange={(e) => setRate(e.target.value)} />

                    {/* botões */}

                    {!isLoading && (
                      <Check />
                    )}

                  </div>

                </form>

              </div>


            </div>
          </div>
        </div>


      </ValidateData>
    </ValidateUser>
  );
}

export default ViewBooks;
