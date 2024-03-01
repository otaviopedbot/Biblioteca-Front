import React, { useState, useEffect } from 'react';
import AuthService from "../../services/authService";
import { Link, useNavigate } from 'react-router-dom';
import { getFavorite, deleteFavorite } from '../../requests/favorite';
import Swal from "sweetalert2";
import { toast } from 'react-toastify';

// Componentes
import Card from '../../components/Card';
import Return from '../../components/buttons/Return';
import Edit from '../../components/buttons/Edit';
import ErrorScreen from '../../components/ErrorScreen';

const Profile = () => {
  const user = AuthService.getCurrentUser();
  const [favorites, setFavorites] = useState([]);
  const configConfirmation = {
    title: "Tem certeza?",
    text: "Não é possível reverter esta ação!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, deletar!"
  }

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!user) {
          throw new Error('Usuário não está autenticado');
        }
        const favoritesData = await getFavorite(user.user.id);
        setFavorites(favoritesData);
      } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
      }
    };

    fetchFavorites();
  }, [user]);

  const removeFavorite = async (userId, bookId) => {
    const confirmation = await Swal.fire(configConfirmation);
    if (confirmation.isConfirmed) {
      try {
        await deleteFavorite(userId, bookId);
        // Remover o favorito removido da lista de favoritos do estado
        setFavorites(favorites.filter(favorite => favorite.favorite_id !== bookId));
        toast.success(`Favorito removido com sucesso`);
      } catch (error) {
        toast.error(`Erro ao remover Favorito`);
        console.log(error);
      }
    }
  };

  
  return user ? (

    <div className='grid grid-cols-1 grid-rows-1 h-screen'>
      <div className='flex justify-center items-center'>

        <Card title={`${user.user.username}`}>

          <img className="rounded-lg mx-auto w-1/2" src={user.user.image} alt="User profile image"></img>
          <h1 className='mt-2'>Sobre mim:</h1>

          {!user.user.details ? (
            <h2>Nada informado.</h2>
          ) : (
            <h2>{user.user.details}</h2>
          )}

          <h1>Meus livros favoritos:</h1>

          {favorites.length == 0 ? (
            <p>Ainda sem livros favoritos</p>
          ) : (
            <ul>
              {favorites.map((favorite) => (
                <li key={favorite.favorite_id} className="mt-2 max-w space-y-0 text-gray-500 list-disc list-inside dark:text-gray-400">
                  <Link to={`/books/${favorite.book.id}`}>
                    {favorite.book.title}
                  </Link>
                  <br />
                  <button className='ml-2 text-red-500' onClick={() => removeFavorite(user.user.id, favorite.book.id)}>
                    Apagar
                  </button>
                </li>
              ))}
            </ul>
          )}

          <Link to={'/profile/edit'}>
            <Edit />
          </Link>

          <Link to={'/'}>
            <Return />
          </Link>

        </Card>

      </div>
    </div>

  ) : (
    <ErrorScreen message={'Usuário não encontrado'} />
  );
}

export default Profile;