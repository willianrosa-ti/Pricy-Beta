// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts (NOVOS)
import LayoutPublico from './Components/Layouts/LayoutPublico';
import LayoutPrivado from './Components/Layouts/LayoutsPrivado';

// Páginas Públicas
import PaginaLogin from './Paginas/Login/PaginaLogin';
import PaginaSobreNos from './Paginas/SobreNos/SobreNos';
import PaginaComoFunciona from './Paginas/ComoFunciona/ComoFunciona';
import PaginaCadastro from './Paginas/Cadastro/PaginaCadastro';
import PaginaEsqueciSenha from './Paginas/EsqueciSenha/PaginaEsqueciSenha';
import PaginaRedefinirSenha from './Paginas/RedefinirSenha/PaginaRedefinirSenha';
import PaginaVerificarCodigo from './Paginas/VerificarCodigo/PaginaVerificarCodigo'; 
import PaginaVerificarEmail from './Paginas/VerificarEmail/PaginaVerificarEmail'; 
import PaginaInicial from './Paginas/PaginaInicial/PaginaInicial';

import './App.css'; 

function App() {
  return (
    <>

      
      <Routes>
        

        <Route element={<LayoutPublico />}>
          <Route path="/login" element={<PaginaLogin />} />
          <Route path="/cadastro" element={<PaginaCadastro />} />
          <Route path="/verificar-codigo" element={<PaginaVerificarCodigo />} /> 
          <Route path="/verificar-email" element={<PaginaVerificarEmail />} /> 
          <Route path="/esqueci-senha" element={<PaginaEsqueciSenha />} />
          <Route path="/redefinir-senha" element={<PaginaRedefinirSenha />} />
          <Route path="/sobre-nos" element={<PaginaSobreNos />} />
          <Route path="/como-funciona" element={<PaginaComoFunciona />} />
          <Route path="/" element={<PaginaLogin />} /> 
        </Route>
        

        {/* --- ROTAS PRIVADAS --- 
            Todas as rotas aqui dentro usarão o LayoutPrivado
            (Sidebar na esquerda, conteúdo principal na direita)
        */}
        <Route element={<LayoutPrivado />}>
          <Route path="/dashboard" element={<PaginaInicial />} />
          
          {/* Adicione suas outras rotas logadas aqui no futuro: */}
          {/* <Route path="/dashboard/ativos" element={<PaginaAtivos />} /> */}
          {/* <Route path="/dashboard/ordens" element={<PaginaOrdens />} /> */}
          {/* <Route path="/dashboard/conta" element={<PaginaConta />} /> */}

        </Route>

      </Routes>
    </>
  );
}

export default App;