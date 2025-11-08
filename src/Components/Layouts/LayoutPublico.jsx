// src/layouts/LayoutPublico.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import BarraNavegacao from '../BarraNavegacao/BarraNavegacao';

// Este é o layout para páginas de login, cadastro, etc.
function LayoutPublico() {
  return (
    <>
      <BarraNavegacao />
      {/* A classe 'container-pagina' centraliza o conteúdo (Login, Cadastro) */}
      <main className="container-pagina">
        <Outlet /> {/* O <Outlet> renderiza a rota filha (ex: <PaginaLogin />) */}
      </main>
    </>
  );
}

export default LayoutPublico;