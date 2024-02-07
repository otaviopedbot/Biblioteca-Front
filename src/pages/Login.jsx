import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from "../services/authService"

// Componentes:
import Card from '../components/Card';
import Check from '../components/buttons/Check';
import Return from '../components/buttons/Return';
import CustomPurple from '../components/buttons/CustomPurple';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      toast.warn('Preencha todos os campos corretamente');
      return;
    }

    try {
      await AuthService.Login(email, password).then(
        () => {
          setIsLoading(true);

          const localStorageData = JSON.parse(localStorage.getItem('user'));

          if (localStorageData && localStorageData.user) {
            const { username } = localStorageData.user;
            toast.success(`Usuário ${username} logado com sucesso`);
            navigate('/');
          }

          setIsLoading(false);
        },
        (error) => {
          toast.error(`Erro ao fazer login: ${error.response.data.message}`);
          navigate('/login');
          console.log(error);
          setIsLoading(false);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Card title={'Login'}>
        <form onSubmit={handleLogin}>
          <div className='mb-2'>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='E-mail' />
          </div>

          <div className='mb-2'>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Senha' />
          </div>

          {/* botões */}

          {!isLoading && (

            <Check />

          )}

          <Link to={'/'}>
            <Return />
          </Link>

          <div>Não tem uma conta?</div>

          <Link to={'/register'}>
            <CustomPurple title={'Cadastre-se'} />
          </Link>
        </form>
      </Card>
    </div>
  );
};

export default Login;
