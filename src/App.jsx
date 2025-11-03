import React from 'react';
// Importação global de estilos (se houver)
import './App.css'; 
// Importação da nossa nova página de login
import PaginaLogin from './../src/Paginas/Login/PaginaLogin';

function App() {
  return (
    <div className="App">
      {/* Renderiza a página de login */}
      <PaginaLogin />
    </div>
  );
}

export default App;