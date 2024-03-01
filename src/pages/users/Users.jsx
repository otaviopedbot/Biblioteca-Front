import React, { useEffect, useState } from 'react';
import { searchUser } from '../../requests/user';
import Card from '../../components/Card';
import { Link, useParams } from 'react-router-dom';
import Return from '../../components/buttons/Return';
import ErrorScreen from '../../components/ErrorScreen';
import { getFavorite } from '../../requests/favorite';

const Users = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await searchUser(username);
        setUser(userData);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        setUser(null);
      }
    };

    fetchUser();
  }, [username]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesData = await getFavorite(user.id);
        setFavorites(favoritesData);
      } catch (error) {
        console.error('Erro ao obter favoritos:', error);
      }
    };
    fetchFavorites();
  }, [user]);

  return user ? (

    <div className='grid grid-cols-1 grid-rows-1 h-screen'>
      <div className='flex justify-center items-center'>

        <Card title={`${user.username}`}>
          <img className="rounded-lg mx-auto w-1/2" src={user.image} alt="User profile image"></img>
          <h1>Sobre mim:</h1>
          <h2>{user.details}</h2>
          <h1>Meus livros favoritos:</h1>

          {favorites.length == 0 ? (
            <p>Ainda sem livros favoritos</p>
          ) : (
            <ul>
              {favorites.map((favorite) => (
                <li key={favorite.favorite_id} className="mt-2 max-w space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                  <Link to={`/books/${favorite.book.id}`}>
                    {favorite.book.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {/* Botões */}
          <Link to={'/'}>
            <Return />
          </Link>
        </Card>

      </div>
    </div>

  ) : (
    <ErrorScreen message={'Usuário não encontrado'} />
  );
};

export default Users;