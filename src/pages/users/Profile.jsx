import React, { useState, useEffect } from 'react';
import AuthService from "../../services/authService";
import Card from '../../components/Card';
import { Link } from 'react-router-dom';
import { getFavorite, deleteFavorite } from '../../requests/favorite';
import Return from '../../components/buttons/Return';
import Edit from '../../components/buttons/Edit';
import ErrorScreen from '../../components/ErrorScreen';
import Config from '../../components/buttons/Config';
import Swal from "sweetalert2";
import { toast } from 'react-toastify';

const Profile = () => {
  const user = AuthService.getCurrentUser();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesData = await getFavorite(user.user.id);
        setFavorites(favoritesData);
      } catch (error) {
        console.error('Erro ao obter favoritos:', error);
      }
    };
    fetchFavorites();
  }, []);

  const removeFavorite = async (userId, favoriteId) => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (confirmation.isConfirmed) {
      try {
        await deleteFavorite(userId, favoriteId);
        // Remover o favorito removido da lista de favoritos do estado
        setFavorites(favorites.filter(favorite => favorite.favorite_id !== favoriteId));
        toast.success(`Favorito removido com sucesso`);
      } catch (error) {
        toast.error(`Erro ao remover Favorito`);
        console.log(error);
      }
    }
  };


  return (!user || !user.user ? (
    <ErrorScreen message={'Usuário não logado'} />
  ) : (
    <Card title={`${user.user.username}`}>
      <img className="rounded-lg" src={user.user.image} alt="User profile image"></img>
      <h1>Sobre mim:</h1>
      <h2>{user.user.details}</h2>
      <h1>Meus livros favoritos:</h1>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.favorite_id} className="mt-2 max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">

            <Link to={`/books/${favorite.book.id}`}>
              {favorite.book.title}
            </Link>

            <br/>

            <button className='ml-2 text-red-500' onClick={() => removeFavorite(user.user.id, favorite.favorite_id)}>
              Apagar
            </button>

            {/* <Link className='ml-2 text-blue-500' to={`/profile/favorites/${favorite.favorite_id}`}>
              Editar
            </Link> */}

          </li>
        ))}
      </ul>

      {/* botões */}
      {user.user.is_admin === 1 && (
        <Link to={'/profile/dashboard'}>
          <Config />
        </Link>
      )}
      <Link to={'/profile/edit'}>
        <Edit />
      </Link>
      <Link to={'/'}>
        <Return />
      </Link>

    </Card>
  ));
}

export default Profile;