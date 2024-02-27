import React from 'react'
import AuthService from '../../services/authService'
import { Link } from 'react-router-dom'

//componentes:
import ErrorScreen from '../ErrorScreen'
import CustomBlue from '../buttons/CustomBlue'


const ValidateData = ({ data, children, message }) => {

    const user = AuthService.getCurrentUser();

    return (
        <>
            {!data || data.length === 0 ? (

                <ErrorScreen message={message}>

                    {user && user.user.is_admin == 1 && (
                        <div className="mt-5">
                            <h3 className='mb-2'>Crie seu primeiro registro</h3>
                            <Link to={'create'}>
                                <CustomBlue title={'Novo'} />
                            </Link>
                        </div>
                    )}

                </ErrorScreen>

            ) : (
                children
            )}
        </>
    )
}

export default ValidateData
