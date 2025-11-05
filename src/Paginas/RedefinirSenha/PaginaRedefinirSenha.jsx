// src/paginas/RedefinirSenha/PaginaRedefinirSenha.jsx

import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import './PaginaRedefinirSenha.css'; // Reutilizando o CSS

// ⚠️ IMPORTANTE: Use a mesma URL da sua API
const API_URL = 'http://localhost:5275'; // Verifique se é a porta correta

function PaginaRedefinirSenha() {
    // Hooks do React Router
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Estados
    const [token, setToken] = useState(null);
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // 1. Pega o token da URL quando a página carrega
    useEffect(() => {
        const tokenDaUrl = searchParams.get('token');
        if (tokenDaUrl) {
            setToken(tokenDaUrl);
        } else {
            setErro('Token não encontrado na URL.');
        }
    }, [searchParams]);

    const aoSubmeter = async (evento) => {
        evento.preventDefault();
        setErro('');
        setSucesso('');

        // 2. Validação simples no frontend
        if (novaSenha !== confirmaSenha) {
            setErro('As senhas não coincidem.');
            return;
        }
        if (!token) {
            setErro('Token de redefinição inválido.');
            return;
        }

        setIsLoading(true);

        try {
            // 3. Envia o DTO para o novo endpoint da API
            const response = await fetch(`${API_URL}/api/usuarios/redefinir-senha`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Token: token,
                    NovaSenha: novaSenha,
                    ConfirmaNovaSenha: confirmaSenha
                }),
            });

            const data = await response.json();

            if (response.ok) { // 200 OK
                setSucesso(data.message || 'Senha redefinida com sucesso!');
                // 4. Redireciona para o Login após 3 segundos
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                // 400 Bad Request (ex: Token inválido, senha curta)
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
            <h2>Redefinir Senha</h2>
            
            <form onSubmit={aoSubmeter}>
                <div className="form-grupo">
                    <label htmlFor="campo-senha">Nova Senha:</label>
                    <input 
                        type="password" 
                        id="campo-senha"
                        value={novaSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                        required 
                        disabled={isLoading}
                    />
                </div>
                
                <div className="form-grupo">
                    <label htmlFor="campo-confirma-senha">Confirme a Nova Senha:</label>
                    <input 
                        type="password" 
                        id="campo-confirma-senha"
                        value={confirmaSenha}
                        onChange={(e) => setConfirmaSenha(e.target.value)}
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

                <button type="submit" className="botao-primario" disabled={isLoading || sucesso}>
                    {isLoading ? 'Salvando...' : 'Salvar Nova Senha'}
                </button>
            </form>

            <p className="texto-rodapé">
                <Link to="/login" className="link-secundario">Voltar para o Login</Link>
            </p>
        </div>
    );
}

export default PaginaRedefinirSenha;