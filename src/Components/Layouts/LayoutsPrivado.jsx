// src/layouts/LayoutPrivado.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar'; // O NOVO MENU
import './Layouts.css'; // CSS para o layout do dashboard

// Este é o layout para o dashboard (logado)
function LayoutPrivado() {
  return (
    <div className="layout-privado">
      <Sidebar />
      
      {/* O 'conteudo-principal' é a área à direita do menu */}
      <main className="conteudo-principal">
        <Outlet /> {/* O <Outlet> renderiza a rota filha (ex: <PaginaInicial />) */}
      </main>
    </div>
  );
}

export default LayoutPrivado;