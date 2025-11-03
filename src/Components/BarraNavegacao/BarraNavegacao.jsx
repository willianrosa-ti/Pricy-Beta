import React from 'react';
import { NavLink } from 'react-router-dom'; // Importa o NavLink
import './BarraNavegacao.css';

function BarraNavegacao() {
  return (
    <nav className="barra-navegacao">
      {/* 1. Logo na Esquerda */}
      <NavLink to="/" className="logo-navbar">
        PRYCE
      </NavLink>

      {/* 2. Links na Direita */}
      <div className="links-navegacao">
        <NavLink 
          to="/como-funciona"
          className={({ isActive }) => (isActive ? 'link-ativo' : '')}
        >
          COMO FUNCIONA
        </NavLink>
        
        <NavLink 
          to="/sobre-nos"
          className={({ isActive }) => (isActive ? 'link-ativo' : '')}
        >
          SOBRE NÓS
        </NavLink>
        
        <NavLink 
          to="/login"
          className={({ isActive }) => (isActive ? 'link-ativo' : '')}
        >
          LOGIN
        </NavLink>
      </div>
    </nav>
  );
}

export default BarraNavegacao;