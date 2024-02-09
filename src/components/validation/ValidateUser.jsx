import React from 'react'
import AuthService from "../../services/authService"

//componentes:
import ErrorScreen from '../ErrorScreen'


const ValidateUser = ({children, }) => {

    const user = AuthService.getCurrentUser();

    return (

        <>
            {!user || user.user.is_admin === 0 ? (
                <ErrorScreen message={'Usuário não autorizado ou não logado'} />
            ) : (
                children
            )
            }
        </>

    )
}

export default ValidateUser