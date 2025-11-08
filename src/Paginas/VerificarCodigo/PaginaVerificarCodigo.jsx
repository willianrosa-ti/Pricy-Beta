import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import '../VerificarEmail/PaginaVerificarEmail.css'; // Reutiliza o CSS

const API_URL = 'http://localhost:5275'; 
const TEMPO_EXPIRACAO_MINUTOS = 2;
const TEMPO_COOLDOWN_SEGUNDOS = 60;

function PaginaVerificarCodigo() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [codigo, setCodigo] = useState('');
    
    // 1. ESTADO DO TIMER: Inicializa LENDO o sessionStorage
    const initialTime = parseInt(sessionStorage.getItem('pryce_tempo_restante')) || (TEMPO_EXPIRACAO_MINUTOS * 60);
    const [tempoRestante, setTempoRestante] = useState(initialTime);
    
    const [podeReenviar, setPodeReenviar] = useState(true);
    const [cooldown, setCooldown] = useState(0); 
    
    // Estados de feedback
    const [status, setStatus] = useState('Pendente');
    const [mensagem, setMensagem] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);

    // Efeito 1: Configurar E-MAIL e ler/iniciar o tempo
    useEffect(() => {
        const emailDaUrl = searchParams.get('email');
        if (emailDaUrl) {
            setEmail(emailDaUrl);
            setMensagem(`Enviamos um código de 6 dígitos para ${emailDaUrl}.`);
            
            // Se o tempo salvo for inválido ou muito antigo, reseta para 15 minutos
            if (initialTime <= 0 || initialTime > (TEMPO_EXPIRACAO_MINUTOS * 60)) {
                setTempoRestante(TEMPO_EXPIRACAO_MINUTOS * 60);
            }

        } else {
            setStatus('Erro');
            setMensagem('E-mail não encontrado. Volte ao cadastro.');
        }
    }, [searchParams]);

    // Efeito 2: TIMER (Contagem regressiva e salvamento no sessionStorage)
    useEffect(() => {
        if (status === 'Sucesso') return;

        if (tempoRestante <= 0) {
            setTempoRestante(0);
            setPodeReenviar(true);
            sessionStorage.removeItem('pryce_tempo_restante');
            return;
        }

        // Salva o tempo restante no sessionStorage a cada tick
        sessionStorage.setItem('pryce_tempo_restante', tempoRestante.toString());

        const timerId = setInterval(() => {
            setTempoRestante(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [tempoRestante, status]);
    
    // Efeito 3: COOLDOWN
    useEffect(() => {
        if (cooldown <= 0) {
            setPodeReenviar(true);
            return;
        }
        
        const cooldownId = setInterval(() => {
            setCooldown(prevCooldown => prevCooldown - 1);
        }, 1000);

        return () => clearInterval(cooldownId);
    }, [cooldown]);


    // --- FUNÇÃO PARA FORMATAR O TEMPO ---
    const formatarTempo = (totalSegundos) => {
        const minutos = Math.floor(totalSegundos / 60);
        const segundos = totalSegundos % 60;
        return `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    };

    // --- FUNÇÃO PARA SUBMETER O CÓDIGO ---
    const aoSubmeterCodigo = async (evento) => {
        evento.preventDefault();
        setMensagem('');
        setStatus('Pendente');
        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/usuarios/verificar-email`, {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Email: email, Codigo: codigo }),
            });

            const data = await response.json();

            if (response.ok) { // Status 200 OK
                setStatus('Sucesso');
                setMensagem(data.message || 'Conta ativada! Redirecionando para o login...');
                setTempoRestante(0);
                sessionStorage.removeItem('pryce_tempo_restante'); // Limpa ao finalizar com sucesso
                
                setTimeout(() => {
                    navigate('/login');
                }, 3000);

            } else { // 400 Bad Request
                setStatus('Erro');
                setMensagem(data.message || 'Ocorreu um erro.');
            }

        } catch (error) {
            console.error('Erro de conexão:', error);
            setStatus('Erro');
            setMensagem('Não foi possível conectar ao servidor.');
        } finally {
            setIsLoading(false);
        }
    };

    // --- FUNÇÃO PARA REENVIAR O CÓDIGO (CORRIGIDA) ---
    const aoReenviarCodigo = async () => {
        // Limpa feedback antes de tentar reenviar (CORREÇÃO 1)
        setMensagem('');
        setStatus('Pendente');
        
        setIsResending(true);
        setPodeReenviar(false);

        try {
            const response = await fetch(`${API_URL}/api/usuarios/reenviar-codigo`, {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Email: email }),
            });

            const data = await response.json();
            
            if (response.ok) { 
                setMensagem(data.message || `Um novo código foi enviado para ${email}.`);
                
                // REINICIA O TIMER e o COOLDOWN (CORREÇÃO 2)
                const novoTempoInicial = TEMPO_EXPIRACAO_MINUTOS * 60;
                setTempoRestante(novoTempoInicial); 
                sessionStorage.setItem('pryce_tempo_restante', novoTempoInicial.toString());
                
                setCooldown(TEMPO_COOLDOWN_SEGUNDOS);

            } else { 
                setMensagem(data.message || 'Falha ao reenviar código.');
            }

        } catch (error) {
            console.error('Erro de conexão:', error);
            setMensagem('Não foi possível conectar ao servidor para reenviar.');
        } finally {
            setIsResending(false);
        }
    };


    return (
        <div className="login-caixa email-verificacao-caixa">
            <h2>Verifique seu E-mail</h2>
            <p className="texto-instrucao">{mensagem}</p>
            
            {(status !== 'Sucesso' && email) && (
                <div className="contador-tempo">
                    {tempoRestante > 0 ? (
                        <p className="texto-timer">O código expira em: 
                            <span className="timer-valor"> {formatarTempo(tempoRestante)}</span>
                        </p>
                    ) : (
                        <p className="texto-timer-expirado">O código expirou. Por favor, reenvie.</p>
                    )}
                </div>
            )}
            
            <form onSubmit={aoSubmeterCodigo}>
                <div className="form-grupo">
                    <label htmlFor="campo-codigo">Código de 6 dígitos:</label>
                    <input 
                        type="text" 
                        id="campo-codigo"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ''))}
                        maxLength={6}
                        required 
                        disabled={isLoading || status === 'Sucesso' || isResending}
                    />
                </div>

                {/* Mensagens de Feedback */}
                {status === 'Erro' && (<p className="mensagem-erro">{mensagem}</p>)}
                {status === 'Sucesso' && (<p className="mensagem-sucesso">{mensagem}</p>)}

                <button type="submit" className="botao-primario" disabled={isLoading || status === 'Sucesso' || isResending}>
                    {isLoading ? 'Verificando...' : 'Verificar Código'}
                </button>
            </form>
            
            {/* Botão de Reenvio */}
            <div className="reenviar-grupo">
                <button 
                    onClick={aoReenviarCodigo}
                    className="link-secundario"
                    disabled={isResending || isLoading || status === 'Sucesso' || !email || !podeReenviar || cooldown > 0}
                >
                    {isResending ? 'Reenviando...' : 
                     cooldown > 0 ? `Aguarde ${cooldown}s` :
                     'Reenviar Código'}
                </button>
            </div>
            
        </div>
    );
}

export default PaginaVerificarCodigo;