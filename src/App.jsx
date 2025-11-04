// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Componentes
import BarraNavegacao from './components/BarraNavegacao/BarraNavegacao';


import PaginaLogin from './Paginas/Login/PaginaLogin';
import PaginaSobreNos from './Paginas/SobreNos/SobreNos';
import PaginaComoFunciona from './Paginas/ComoFunciona/ComoFunciona';
import PaginaCadastro from './Paginas/Cadastro/PaginaCadastro';

import './App.css'; 



function App() {
  return (
    <>
      <BarraNavegacao /> 
      
      <main className="container-pagina">
        <Routes>
          {/* Rota para a página de Login */}
          <Route path="/login" element={<PaginaLogin />} />

          <Route path="/cadastro" element={<PaginaCadastro />} />

          {/* Rota para "Sobre Nós" */}
          <Route path="/sobre-nos" element={<PaginaSobreNos />} />
          
          {/* Rota para "Como Funciona" */}
          <Route path="/como-funciona" element={<PaginaComoFunciona />} />

          {/* Rota Padrão (quando acessa "/") */}
          {/* Decida qual será sua Home. Vou manter o Login por enquanto: */}
          <Route path="/" element={<PaginaLogin />} /> 
        </Routes>
      </main>
    </>
  );
}

export default App;