// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Componentes
import BarraNavegacao from './components/BarraNavegacao/BarraNavegacao';


import PaginaLogin from './Paginas/Login/PaginaLogin';
import PaginaSobreNos from './Paginas/SobreNos/SobreNos';
import PaginaComoFunciona from './Paginas/ComoFunciona/ComoFunciona';
import PaginaCadastro from './Paginas/Cadastro/PaginaCadastro';
import PaginaEsqueciSenha from './Paginas/EsqueciSenha/PaginaEsqueciSenha';
import PaginaRedefinirSenha from './Paginas/RedefinirSenha/PaginaRedefinirSenha';

import './App.css'; 



function App() {
  return (
    <>
      <BarraNavegacao /> 
      
      <main className="container-pagina">
        <Routes>
          <Route path="/login" element={<PaginaLogin />} />
          <Route path="/cadastro" element={<PaginaCadastro />} />
              
          <Route path="/esqueci-senha" element={<PaginaEsqueciSenha />} />
          <Route path="/redefinir-senha" element={<PaginaRedefinirSenha />} />

          <Route path="/sobre-nos" element={<PaginaSobreNos />} />
          <Route path="/como-funciona" element={<PaginaComoFunciona />} />
          <Route path="/" element={<PaginaLogin />} /> 
        </Routes>
      </main>
    </>
  );
}

export default App;