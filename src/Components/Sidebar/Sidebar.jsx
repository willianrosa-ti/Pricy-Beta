// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

// Ícones (SVG simples como exemplo - instale react-icons se preferir)
const IconeDashboard = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const IconeAtivos = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
const IconeOrdens = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
const IconeConta = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconeConfig = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;


function Sidebar() {
  return (
    <nav className="sidebar">
      
      {/* Perfil do Usuário (Topo do Menu) */}
      <div className="sidebar-perfil">
        <img 
          src="https://placehold.co/60x60/FCD535/111?text=WR" 
          alt="Foto do Perfil" 
          className="perfil-avatar"
        />
        <div className="perfil-info">
          <span className="perfil-nome">Willian R Rosa</span>
          <span className="perfil-uid">UID: 1180717033</span>
        </div>
      </div>

      {/* Lista de Navegação Principal */}
      <ul className="sidebar-nav">
        <li>
          <NavLink to="/dashboard" end>
            <IconeDashboard />
            <span>Painel de Controle</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/ativos">
            <IconeAtivos />
            <span>Ativos</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/ordens">
            <IconeOrdens />
            <span>Ordens</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/conta">
            <IconeConta />
            <span>Conta</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/configuracoes">
            <IconeConfig />
            <span>Configurações</span>
          </NavLink>
        </li>
      </ul>

      {/* Botão de Logout (Rodapé do Menu) */}
      <div className="sidebar-footer">
        <button className="botao-logout">
          Sair (Logout)
        </button>
      </div>
    </nav>
  );
}

export default Sidebar;