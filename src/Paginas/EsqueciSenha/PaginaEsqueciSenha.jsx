// src/paginas/EsqueciSenha/PaginaEsqueciSenha.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PaginaEsqueciSenha.css'; // Reutilizando o CSS do Login

// ⚠️ IMPORTANTE: Use a mesma URL da sua API
const API_URL = 'http://localhost:5275'; // Verifique se é a porta correta

function PaginaEsqueciSenha() {
    const [email, setEmail] = useState('');
    
    // Estados de feedback
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState(''); // Para a mensagem verde
    const [isLoading, setIsLoading] = useState(false);

    const aoSubmeter = async (evento) => {
        evento.preventDefault();
        setErro('');
        setSucesso('');
        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/usuarios/esqueci-senha`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Email: email }),
            });

            const data = await response.json();

            if (response.ok) { // Status 200 OK
                // A API sempre retorna OK, mesmo se o e-mail não existir
                setSucesso(data.message || 'Link de recuperação enviado.');
            } else {
                // Erro de validação (ex: e-mail inválido)
                setErro(data.message || 'Ocorreu um erro.');
            }

        } catch (error) {
            console.error('Erro de conexão:', error);
            setErro('Não foi possível conectar ao servidor.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-caixa">
            <h2>Recuperar Senha</h2>
            <p className="texto-instrucao">
                Digite seu e-mail cadastrado. Enviaremos um link para você redefinir sua senha.
            </p>
            
            <form onSubmit={aoSubmeter}>
                <div className="form-grupo">
                    <label htmlFor="campo-email">E-mail:</label>
                    <input 
                        type="email" 
                        id="campo-email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (erro) setErro('');
                            if (sucesso) setSucesso('');
                        }}
                        placeholder="seu.email@exemplo.com"
                        required 
                        disabled={isLoading}
                    />
                </div>

                {/* Mensagem de Erro (Vermelha) */}
                {erro && (
                    <p className="mensagem-erro">{erro}</p>
                )}

                {/* Mensagem de Sucesso (Verde) */}
                {sucesso && (
                    <p className="mensagem-sucesso">{sucesso}</p>
                )}

                <button type="submit" className="botao-primario" disabled={isLoading}>
                    {isLoading ? 'Enviando...' : 'Enviar Link'}
                </button>
            </form>

            <p className="texto-rodapé">
                Lembrou da senha? <Link to="/login" className="link-secundario">Faça Login</Link>
            </p>
        </div>
    );
}

export default PaginaEsqueciSenha;