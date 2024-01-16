import React from 'react'
import Card from '../components/Card'
import Table from '../components/Table';

const Home = () => {


const data =
  {
  id:1,
  firstName: "John",
  lastName: "Doe",
  age: 50,
  quantity: 200
};

const title = ['bosta', 'mijo', 'teste']


  return (
    <div>
      <h1>Home</h1>
      <Card title={'Exibindo Livro'} data={data}  />


    </div>
  )
}

export default Home 