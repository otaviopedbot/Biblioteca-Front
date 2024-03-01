import React from 'react'
import Card from './Card'

const ErrorScreen = ({ message, children }) => {
  return (

    <div className='grid grid-cols-1 grid-rows-1 h-screen'>
    <div className='flex justify-center items-center'>

    <Card title={'Algo inesparado aconteceu...'}>
      <h2>{message}</h2>
      <h3>{children}</h3>
    </Card>

    </div>
    </div>

  )
}

export default ErrorScreen