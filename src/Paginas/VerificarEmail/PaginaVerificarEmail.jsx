import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './PaginaVerificarEmail.css'; 

// Este arquivo é mantido apenas como rota de fallback ou para futura revalidação de e-mail por link.
// Ele NÃO está mais sendo usado no fluxo de cadastro.

const API_URL = 'http://localhost:5275'; 

function PaginaVerificarEmail() {
    const [searchParams] = useSearchParams();
    
    const [status, setStatus] = useState('Verificando...'); 
    const [mensagem, setMensagem] = useState('Este é um link antigo, verifique se seu e-mail já foi ativado.');
    const [isLoading, setIsLoading] = useState(false);

    // Esta lógica não deve mais ser executada, pois o fluxo foi movido para POST /verificar-email
    // Mantenha-a em modo 'display' apenas para a rota existir.

    const renderContent = () => {
        // Simulação de status
        if (status === 'Sucesso') {
            return (
                <>
                    <div className="icone-sucesso">✅</div>
                    <h3 className="texto-sucesso">Verificação Antiga Concluída!</h3>
                    <p>{mensagem}</p>
                    <Link to="/login" className="botao-primario link-login-verificacao">Ir para o Login</Link>
                </>
            );
        }

        // status === 'Erro'
        return (
            <>
                <div className="icone-erro">❌</div>
                <h3 className="texto-erro">Falha na Verificação</h3>
                <p>O link de verificação direta não é mais suportado. Use o código que enviamos por e-mail.</p>
                <Link to="/cadastro" className="botao-primario link-login-verificacao link-secundario-cadastro">Tentar Novo Cadastro</Link>
            </>
        );
    };

    return (
        <div className="login-caixa email-verificacao-caixa">
            <h2>Ativação da Conta PRYCE (Link Antigo)</h2>
            {renderContent()}
        </div>
    );
}

export default PaginaVerificarEmail;