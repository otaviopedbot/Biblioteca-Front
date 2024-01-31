import React from 'react'
import Card from './Card'

const ErrorScreen = ({ message }) => {
  return (
    <Card title={'Algo inesparado aconteceu...'}>
      <h2>{message}</h2>
    </Card>
  )
}

export default ErrorScreen