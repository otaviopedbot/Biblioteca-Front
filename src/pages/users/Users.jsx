import React, { useEffect, useState } from 'react';
import { searchUser } from '../../requests/user';
import Card from '../../components/Card';
import { Link, useParams } from 'react-router-dom';
import Return from '../../components/buttons/Return';
import ErrorScreen from '../../components/ErrorScreen';

const Users = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);

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

  return user ? (
    <Card title={`${user.username}`}>

      <img className="rounded-lg" src={user.image}></img>

      <h2>{user.details}</h2>

      {/* <ul className='className="max-w-md space-y-1 text-white-500 list-disc list-inside dark:text-gray-400"'>
        <li>ID: {user.user.id}</li>
        <li>Nome de usuário: {user.user.username}</li>
        <li>E-mail: {user.user.email}</li>
        <li>Permissões: Administrador: {user.user.is_admin}</li>
      </ul> */}

      {/* botões */}


      <Link to={'/'}>

        <Return />

      </Link>


    </Card>
  ) : (
    <ErrorScreen message={'Usuário não encontrado'} />
  );
};

export default Users;
