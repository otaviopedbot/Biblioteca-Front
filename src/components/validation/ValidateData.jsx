import React from 'react'

//componentes:
import ErrorScreen from '../ErrorScreen'

const ValidateData = ({data, children, message }) => {
    return (
        <>
            {!data || data.length === 0 ? (
                <ErrorScreen message={message} />
            ) : (
                children
            )}
        </>
    )
}

export default ValidateData
    