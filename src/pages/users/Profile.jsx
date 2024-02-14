import React, { useState, useEffect } from 'react';
import AuthService from "../../services/authService";
import { Link } from 'react-router-dom';
import { getFavorite, deleteFavorite } from '../../requests/favorite';
import Swal from "sweetalert2";
import { toast } from 'react-toastify';

//componentes:
import ValidateUser from '../../components/validation/ValidateUser'
import Config from '../../components/buttons/Config';
import Card from '../../components/Card';
import Return from '../../components/buttons/Return';
import Edit from '../../components/buttons/Edit';


const Profile = () => {
  const user = AuthService.getCurrentUser();
  const [favorites, setFavorites] = useState();
  const configConfirmation = {
    title: "Tem certeza?",
    text: "Não é possivel reverter esta ação!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, deletar!"
  }

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesData = await getFavorite(user.user.id);
        setFavorites(favoritesData);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchFavorites();
  }, [favorites]);

  const removeFavorite = async (userId, favoriteId) => {
    const confirmation = await Swal.fire(configConfirmation);

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



  return (

    <ValidateUser>



      <Card title={`${user.user.username}`}>

        <img className="rounded-lg mx-auto w-1/2" src={user.user.image} alt="User profile image"></img>

        <h1>Sobre mim:</h1>
        <h2>{user.user.details}</h2>
        <h1>Meus livros favoritos:</h1>


        {!Array.isArray(favorites) ? (
          <p>a</p>
        ) : (
          <ul>
            {favorites.map((favorite) => (
              <li key={favorite.favorite_id} className="mt-2 max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                <Link to={`/books/${favorite.book.id}`}>
                  {favorite.book.title}
                </Link>
                <br />
                <button className='ml-2 text-red-500' onClick={() => removeFavorite(user.user.id, favorite.favorite_id)}>
                  Apagar
                </button>
              </li>
            ))}
          </ul>
        )}



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



    </ValidateUser>

  );
}

export default Profile;