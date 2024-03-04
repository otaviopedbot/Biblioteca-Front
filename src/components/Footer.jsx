'use client';

import { Footer } from 'flowbite-react';
import { useMediaQuery } from 'react-responsive';

export default function Component() {
  const isMobile = useMediaQuery({ maxWidth: 768 }); // Defina a largura máxima para dispositivos móveis aqui

  if (isMobile) {
    return null; // Retorna null para desabilitar o footer em dispositivos móveis
  }

  return (
    <Footer container className='sticky'>
      <Footer.Copyright href="https://github.com/otaviosbms" by="Otávio Sbms" year={2024} />
      <Footer.LinkGroup>
        {/* Adicione links aqui, se necessário */}
      </Footer.LinkGroup>
    </Footer>
  );
}