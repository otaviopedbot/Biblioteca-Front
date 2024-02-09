import React from 'react'
import AuthService from "../../services/authService"

//componentes:
import ErrorScreen from '../ErrorScreen'


const ValidateDataAndUser = ({ data, message, children, }) => {

    const user = AuthService.getCurrentUser();

    return (
        
        <>
            {!data ? (
                <ErrorScreen message={message} />
            ) : (
                !user || user.user.is_admin === 0 ? (
                    <ErrorScreen message={'Usuário não autorizado ou não logado'} />
                ) : (

                    children

                )
            )}
        </>

    )
}

export default ValidateDataAndUser