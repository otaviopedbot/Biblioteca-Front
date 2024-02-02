import React from 'react'
import AuthService from "../../services/authService"
import Card from '../../components/Card'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Return from '../../components/buttons/Return'
import Edit from '../../components/buttons/Edit'
import Delete from '../../components/buttons/Delete'

const Profile = () => {

  const user = AuthService.getCurrentUser();

  return (

    <Card title={`Perfil de ${user.user.username}`}>

      <img src={user.user.image}></img>

      <h2>{user.user.details}</h2>

      <ul className='className="max-w-md space-y-1 text-white-500 list-disc list-inside dark:text-gray-400"'>
        <li>ID: {user.user.id}</li>
        <li>Nome de usuário: {user.user.username}</li>
        <li>E-mail: {user.user.email}</li>
        <li>Permissões: Administrador: {user.user.is_admin}</li>
      </ul>

      {/* botões */}


          <Link to={'/'}>

            <Return />

          </Link>


    </Card>

  )
}

export default Profile