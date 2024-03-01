import React from 'react';
import Card from '../components/Card';


const Home = () => {

  return (

    <div className="grid grid-cols-1 h-screen text-center m-8">
      <div className='flex justify-center items-start gap-4'>

        <Card title={'Nossa História'} >

          <p>
          A Biblioteca Imaginação foi fundada em 1990 por Samuel Silva, um entusiasta de histórias desde a infância, inspirado pela paixão de compartilhar livros, Samuel transformou um prédio abandonado em um refúgio literário. Ele dedicou anos para arrecadar fundos e mobilizar voluntários. A biblioteca, situada em um bairro tranquilo, é um símbolo de amor pela literatura. Samuel pessoalmente escolheu a decoração, refletindo a magia dos livros. Os corredores são batizados com nomes de gêneros literários, proporcionando uma jornada única aos visitantes. Samuel participava ativamente na comunidade literária, organizando eventos e incentivando autores locais. Seu legado transcende as estantes repletas de livros, incorporado na atmosfera acolhedora e inspiradora para as gerações presentes e futuras.
          </p>

        </Card>

        <Card title={''}>

          <img src="https://www.revistaprosaversoearte.com/content/uploads/2017/01/Kansas-City-Public-Library-Missouri-USA.jpg" className="rounded-lg mx-auto w-full" />

          <p>Rua das Histórias N 123, Bairro da Imaginação, Cidade das Letras</p>

        </Card>

      </div>
    </div>

  )
}

export default Home