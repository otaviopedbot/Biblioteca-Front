import React from 'react'
import Card from './Card'

const ErrorScreen = ({ message, children }) => {
  return (
    <Card title={'Algo inesparado aconteceu...'}>
      <h2>{message}</h2>
      <h3>{children}</h3>
    </Card>
  )
}

export default ErrorScreen