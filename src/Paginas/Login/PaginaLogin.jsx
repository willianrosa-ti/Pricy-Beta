import React, { useState } from 'react';
import './PaginaLogin.css';

function PaginaLogin() {
  // ... (toda a sua lógica 'useState' e 'aoSubmeterFormulario' fica igual) ...
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [termosAceitos, setTermosAceitos] = useState(false);

  const aoSubmeterFormulario = (evento) => {
    evento.preventDefault(); 
    
    console.log('Email digitado:', email);
    console.log('Senha digitada:', senha);
    console.log('Termos aceitos:', termosAceitos);

    if (termosAceitos) {
      alert('Login enviado! Verifique o console.');
    } else {
      alert('Você precisa aceitar os termos de serviço.');
    }
  };
  
  return (
    <> {/* Fragmento para agrupar o logo e a caixa */}

      {/* MUDANÇA AQUI: O logo agora está FORA da caixa.
        Mudei a classe para 'logo-global' para refletir isso.
      */}
      <span className="logo-pryce">PRYCE</span>

      {/* A caixa de login começa aqui */}
      <div className="login-caixa">
        
        {/* O logo não está mais aqui dentro */}

        <h2>Bem-vindo ao <span className="logo-bem">PRYCE</span></h2> {/* Título principal */}
        
        <form onSubmit={aoSubmeterFormulario}>
          {/* ... (o resto do seu formulário continua igual) ... */}
          <div className="form-grupo">
            <label htmlFor="campo-email">E-mail / Login:</label>
            <input 
              type="text" 
              id="campo-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail / Login"
              required 
            />
          </div>
          
          <div className="form-grupo">
            <label htmlFor="campo-senha">Senha:</label>
            <input 
              type="password" 
              id="campo-senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
              required 
            />
          </div>
          
          <div className="form-checkbox">
            <input 
              type="checkbox" 
              id="checkbox-termos"
              checked={termosAceitos}
              onChange={(e) => setTermosAceitos(e.target.checked)}
            />
            <label htmlFor="checkbox-termos">              
              <a href="#" className="link-secundario">Política de Privacidade</a> PRYCE.
            </label>
          </div>

          <button type="submit" className="botao-primario">
            Continuar
          </button>
        </form>

        <div className="divisor">ou</div>

        <div className="botoes-sociais">
          {/* MUDANÇA AQUI: Adicionamos o SVG para o Google */}
          <a href="#" className="botao-social">
            <svg 
              className="icone-social google-icone" 
              width="24" height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fillRule="evenodd" clipRule="evenodd" d="M11.9997 20C14.1597 20 15.9706 19.2836 17.2942 18.0618L14.7088 16.0545C13.9924 16.5345 13.076 16.8182 11.9997 16.8182C9.91604 16.8182 8.1524 15.4109 7.52331 13.52H4.85059V15.5927C6.16695 18.2073 8.8724 20 11.9997 20Z" fill="#34A853"></path>
              <path fillRule="evenodd" clipRule="evenodd" d="M11.9997 4C13.4087 4 14.7176 4.54545 15.7594 5.48364L18.0617 3.32C16.4251 1.83273 14.2818 1 11.9997 1C8.8724 1 6.16695 2.79273 4.85059 5.40727L7.52331 7.48C8.1524 5.58909 9.91604 4 11.9997 4Z" fill="#EA4335"></path>
              <path fillRule="evenodd" clipRule="evenodd" d="M20 12C20 11.2364 19.8808 10.4636 19.6644 9.73636H11.9997V13.8473H17.2021C16.9258 15.2218 16.0392 16.3564 14.7719 17.1364L17.2942 19.1436C18.7814 17.7055 19.7892 15.9164 19.9573 14H19.9997L20 12Z" fill="#4285F4"></path>
              <path fillRule="evenodd" clipRule="evenodd" d="M4.85059 7.48L4.8415 7.48909C4.30504 8.54182 4 9.72727 4 11C4 11.3364 4.02727 11.6636 4.0728 11.9909L6.75476 14.0727C6.6728 13.7164 6.63633 13.3545 6.63633 13C6.63633 12.0164 6.84542 11.0818 7.23419 10.2509L4.85059 7.48Z" fill="#FBBC04"></path>
            </svg>
            Continuar com o Google
          </a>
          <a href="#" className="botao-social">
             <svg 
              className="icone-social apple-icone" 
              width="24" height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0756 3.64877C15.1861 4.6061 14.7876 5.54843 14.204 6.24214C13.5956 6.92442 12.6209 7.44595 11.6726 7.37879C11.5485 6.45861 12.0291 5.47913 12.5668 4.88187C13.1752 4.20317 14.231 3.68378 15.0756 3.64877ZM18.1084 8.79019C17.9965 8.85395 16.2493 9.84885 16.2687 11.8728C16.2905 14.3233 18.5248 15.1327 18.5511 15.1413C18.5384 15.1985 18.2014 16.3101 17.3644 17.4389C16.665 18.4327 15.931 19.4043 14.7676 19.4214C14.2139 19.4337 13.8401 19.2824 13.4506 19.1248C13.0443 18.9604 12.621 18.7892 11.9587 18.7892C11.2566 18.7892 10.8144 18.9661 10.3881 19.1366C10.0194 19.2841 9.66254 19.4269 9.15964 19.4464C8.05113 19.4857 7.20358 18.3855 6.47861 17.401C5.03018 15.3906 3.90212 11.7342 5.41447 9.24657C6.14771 8.02633 7.48409 7.24118 8.91222 7.21974C9.5412 7.2076 10.1446 7.43792 10.6735 7.63982C11.0781 7.79423 11.439 7.93203 11.7346 7.93203C11.9946 7.93203 12.3456 7.79969 12.7547 7.64548C13.3989 7.40262 14.1871 7.10549 14.9902 7.18545C15.5392 7.20045 17.1035 7.39121 18.1112 8.78862L18.1084 8.79019Z" fill="currentColor"></path>
            </svg>
            {/* Opcional: Ícone da Apple - você pode adicionar o SVG path aqui também */}
            Continue com a Apple
          </a>
        </div>

        <p className="texto-rodapé">
          <a href="#" className="link-secundario">Cadastre-se</a> como empresa.
        </p>

      </div>
    </> /* Fim do Fragmento */
  );
}

export default PaginaLogin;