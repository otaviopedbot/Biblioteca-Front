import React from 'react'
import AuthService from "../../services/authService"

//componentes:
import ErrorScreen from '../ErrorScreen'

const ValidateUser = ({ children }) => {
  
  const user = AuthService.getCurrentUser();

  return (
    <>
      {!user ? (
        <ErrorScreen message={'Nenhum usuário Logado'} />
      ) : (

        children
        
      )}
    </>
  )
}

export default ValidateUser