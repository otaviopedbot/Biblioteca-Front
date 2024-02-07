import {React, useState, useEffect} from 'react'
import AuthService from "../../services/authService"
import Card from '../../components/Card'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getFavorite } from '../../requests/favorite';
import Return from '../../components/buttons/Return'
import Edit from '../../components/buttons/Edit'
import ErrorScreen from '../../components/ErrorScreen'
import Config from '../../components/buttons/Config'

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
  }, [user]);

  return (!user || user.length === 0 ? (

    <ErrorScreen message={'Usuário não logado'} />

  ) : (

    <Card title={`${user.user.username}`}>

      <img className="rounded-lg" src={user.user.image}></img>

      <h1>Sobre mim:</h1>
      <h2>{user.user.details}</h2>

      <h1>Meus livros favoritos:</h1>

      <ul>
        {favorites.map((rowData) => (
          <li key={rowData.id} className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
            {rowData.title} {/* Exemplo: renderizando o título do livro */}
          </li>
        ))}
      </ul>

      {/* botões */}

      {
        user.user.is_admin == 1 && (
          <Link to={'/profile/dashboard'}>

            <Config />

          </Link>
        )
      }

      < Link to={'/profile/edit'} >

        <Edit />

      </Link>

      <Link to={'/'}>

        <Return />

      </Link>


    </Card>

  )

  );

}

export default Profile