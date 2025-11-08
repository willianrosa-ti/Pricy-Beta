// src/Paginas/PaginaInicial/PaginaInicial.jsx
import React from 'react';
import './PaginaInicial.css';

function PaginaInicial() {
  
  // Dados mocados (simulados)
  const usuario = {
    nome: "Willian R Rosa",
    nivelVip: "Usuário Regular",
    seguindo: 0,
    seguidores: 0
  };

  return (
    <div className="dashboard-container">
      
      {/* Cabeçalho da Página (Painel de Controle) */}
      <header className="dashboard-header">
        <h1>Painel de Controle</h1>
        
        {/* Informações do Usuário (Nível VIP, etc.) */}
        <div className="info-usuario-header">
          <div className="info-bloco">
            <span>Nível VIP</span>
            <strong>{usuario.nivelVip}</strong>
          </div>
          <div className="info-bloco">
            <span>Seguindo</span>
            <strong>{usuario.seguindo}</strong>
          </div>
          <div className="info-bloco">
            <span>Seguidores</span>
            <strong>{usuario.seguidores}</strong>
          </div>
        </div>
      </header>

      {/* Seção "Comece Agora" (Cards) */}
      <section className="dashboard-secao">
        <h2>Comece agora</h2>

        <div className="dashboard-cards-grid">
          
          {/* Card 1: Verificação */}
          <div className="card-dashboard card-concluido">
            <span className="card-etapa">1</span>
            <h3>Sua verificação foi concluída</h3>
            <div className="card-status">
              <span className="status-icone">✅</span>
              <span>Concluído</span>
            </div>
          </div>

          {/* Card 2: Depósito (Ativo) */}
          <div className="card-dashboard card-ativo">
            <span className="card-etapa">2</span>
            <h3>Compre ou deposite para obter Cashback</h3>
            <p>11d: 11h: 02min</p>
            <div className="card-progresso">
              <span>Progresso de conclusão: ?/</span>
            </div>
            <button className="botao-card-ativo">Depositar</button>
          </div>
          
          {/* Card 3: Trade (Pendente) */}
          <div className="card-dashboard card-pendente">
            <span className="card-etapa">3</span>
            <h3>Trade 10 USDT</h3>
            <p className="card-destaque-pendente">50 USDT</p>
            <div className="card-status">
              <span className="status-icone">⏳</span>
              <span>Pendente</span>
            </div>
          </div>

        </div>
      </section>

      {/* Seção "Saldo Estimado" */}
      <section className="dashboard-secao">
        <h2>Saldo Estimado</h2>
        
        <div className="card-dashboard card-saldo">
          <h3>0.00 <span className="saldo-moeda">USD</span></h3>
          <p>≈ 0.00000000 BTC</p>
          <div className="saldo-botoes">
            <button className="botao-saldo">Depositar</button>
            <button className="botao-saldo botao-secundario">Saque</button>
            <button className="botao-saldo botao-secundario">Dinheiro</button>
          </div>
        </div>
      </section>

    </div>
  );
}

export default PaginaInicial;