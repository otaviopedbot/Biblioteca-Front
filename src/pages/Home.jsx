import React from 'react';
import Card from '../components/Card';


const Home = () => {

  return (

    <div className="grid grid-cols-2 grid-rows-1 p-8 gap-8">

      <div>
        <Card title={'Nossa História'} size={'full'}>

          <p>
            A Biblioteca Imaginação foi fundada em 1990 por Samuel Silva, um homem apaixonado por histórias desde sua infância. Samuel cresceu em um lar onde os livros eram tesouros sagrados, e sua vontade de compartilhar essa paixão com a comunidade foi o que o motivou a criar a biblioteca.
            <br />
            Ao longo dos anos, Samuel trabalhou incansavelmente para arrecadar fundos e mobilizar voluntários, conseguindo transformar um antigo prédio abandonado em um oásis literário. Seu objetivo era oferecer um refúgio para os amantes da leitura, onde pudessem escapar para mundos imaginários e encontrar conforto nas páginas dos livros.
          </p>

          <p>
            A Biblioteca Imaginação, localizada em um bairro tranquilo, tornou-se um símbolo de dedicação e amor pela literatura. Samuel escolheu pessoalmente a decoração, garantindo que cada detalhe refletisse a magia contida nos livros que preenchiam as estantes.
            <br />
            Dentro da biblioteca, os corredores foram batizados em homenagem a diferentes gêneros literários, proporcionando uma jornada única aos visitantes. Samuel acreditava que a literatura tinha o poder de unir as pessoas e enriquecer suas vidas, e sua visão foi incorporada em cada aspecto da Biblioteca Imaginação Literária.
            <br />
            Samuel não apenas fundou a biblioteca, mas também participou ativamente da comunidade literária, organizando eventos, palestras e incentivando a participação de autores locais. Seu legado vive não apenas nas estantes repletas de livros, mas na atmosfera acolhedora e inspiradora que ele criou para as gerações presentes e futuras.
          </p>

        </Card>
      </div>

      <div>
        <Card title={''} size={'full'}>

          <img src="https://www.revistaprosaversoearte.com/content/uploads/2017/01/Kansas-City-Public-Library-Missouri-USA.jpg" className="rounded-lg mx-auto w-full" />

          <p>Rua das Histórias N 123, Bairro da Imaginação, Cidade das Letras</p>

        </Card>
      </div>

    </div>

  )
}

export default Home