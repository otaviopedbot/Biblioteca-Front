import React from 'react'

//componentes:
import Card from '../components/Card'


const Home = () => {

  return (
    <div>

    <Card title={'Home / Sobre'} >

    <h1>Projeto FrontEnd utilizando React.js</h1>

    <h2>Clique <a href='https://github.com/otaviopedbot/Biblioteca-CRUD-Express' className='hover:text-blue-500'>aqui</a> para ver o repositório do BackEnd</h2>

    </Card>

    </div>
  )
}

export default Home 