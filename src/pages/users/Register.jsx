import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postUser } from '../../requests/user';

//componentes:
import Card from '../../components/Card'
import Check from '../../components/buttons/Check'
import Return from '../../components/buttons/Return'
import { toast } from 'react-toastify';


const Login = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const saveUser = (e) => {

    e.preventDefault()

    if (username === '' || email === '' || password === '') {
      toast.warn('Preencha todos os campos corretamente')
      return;
    }

    try {
      setIsLoading(true)
      postUser(email, password)
      toast.success(`Usuário ${username} cadastrado com sucesso`);
      navigate('/')
      setIsLoading(false)

    } catch (error) {
      toast.error(`Erro ao cadastrar Usuário: ${error.message}`);
      console.log(error)
      setIsLoading(false)
    }

  }


  return (
    <div>

      <Card title={'Register'}>


        <form onSubmit={saveUser}>

        <div className='mb-2'>
            <label htmlFor="email" classemail="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Username' />
          </div>

          <div className='mb-2'>
            <label htmlFor="email" classemail="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
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

          <Link to={'/login'}>
            <Return />
          </Link>

        </form>


      </Card>

    </div>
  )
}

export default Login