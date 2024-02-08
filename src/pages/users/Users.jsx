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
    <Card title={`${user.username}`}>

      <img className="rounded-lg" src={user.image}></img>

      <h2>{user.details}</h2>

      <h2>Meus livros favoritos:</h2>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.favorite_id} className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">

            <Link to={`/books/${favorite.book.id}`}>
              {favorite.book.title}
            </Link>

          </li>
        ))}
      </ul>

      <Link to={'/'}>

        <Return />

      </Link>


    </Card>
  ) : (
    <ErrorScreen message={'Usuário não encontrado'} />
  );
};

export default Users;
