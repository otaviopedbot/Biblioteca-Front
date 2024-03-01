import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from "../services/authService"

// Componentes:
import Card from '../components/Card';
import InputField from '../components/InputField';
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
            window.location.reload()
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

    <div className='grid grid-cols-1 grid-rows-1 h-screen'>
      <div className='flex justify-center items-center'>

        <Card title={'Login'}>
          <form onSubmit={handleLogin}>

            <InputField label={"E-mail"} type={"email"} name={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />

            <InputField label={"Senha"} type={"password"} name={"senha"} value={password} onChange={(e) => setPassword(e.target.value)} />


            {/* botões */}

            {!isLoading && (

              <Check />

            )}

            <Link to={'/'}>
              <Return />
            </Link>

            <div className='mb-2'>Não tem uma conta?</div>

            <Link to={'/register'}>
              <CustomPurple title={'Cadastre-se'} />
            </Link>

          </form>
        </Card>

      </div>
    </div>
  );
};

export default Login;
