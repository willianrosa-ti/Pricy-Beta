// src/paginas/Cadastro/PaginaCadastro.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. useNavigate está aqui
import './PaginaCadastro.css'; 

const API_URL = 'http://localhost:5275';

const OPCOES_PAIS = [
    { nome: 'Brasil', codigo: '+55', bandeira: '🇧🇷' },
    { nome: 'Estados Unidos', codigo: '+1', bandeira: '🇺🇸' },
    { nome: 'Canadá', codigo: '+1', bandeira: '🇨🇦' },
    { nome: 'Rússia', codigo: '+7', bandeira: '🇷🇺' },
    { nome: 'Alemanha', codigo: '+49', bandeira: '🇩🇪' },
    { nome: 'França', codigo: '+33', bandeira: '🇫🇷' },
    { nome: 'Itália', codigo: '+39', bandeira: '🇮🇹' },
    { nome: 'Reino Unido', codigo: '+44', bandeira: '🇬🇧' },
];

function PaginaCadastro() {
    // ESTADOS
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('fisica');
    const [documento, setDocumento] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [pais, setPais] = useState(OPCOES_PAIS[0]);
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [termosAceitos, setTermosAceitos] = useState(false);
    
    const [erro, setErro] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    
    const navigate = useNavigate(); // Hook para redirecionar

    // FUNÇÃO DE SUBMISSÃO (AGORA ASSÍNCRONA)
    const aoSubmeterCadastro = async (evento) => {
        evento.preventDefault();
        setErro('');
        
        if (senha !== confirmaSenha) {
            setErro('A senha e a confirmação de senha não coincidem.');
            return;
        }
        if (!termosAceitos) {
            setErro('Você deve aceitar os Termos de Serviço.');
            return;
        }

        setIsLoading(true);

        const dadosCadastro = {
            NomeCompleto: nomeCompleto,
            Email: email,
            Senha: senha,
            Login: login,
            Documento: documento,
            TipoPessoa: tipoDocumento.toUpperCase(), // 'fisica' -> 'FISICA'
            DataNascimento: dataNascimento,
            NumeroCelular: `${pais.codigo} ${telefone}`
        };

        try {
            const response = await fetch(`${API_URL}/api/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosCadastro),
            });

            if (response.status === 201) { // 201 Created (Sucesso!)
                alert('Cadastro realizado com sucesso!');
                navigate('/login'); // Redireciona para o login
            
            } else {
                const erroApi = await response.json();
                // Tenta pegar erros de validação do ModelState (se houver)
                if (erroApi.errors) {
                    const primeiraMsgErro = Object.values(erroApi.errors)[0][0];
                    setErro(primeiraMsgErro);
                } else {
                    // Pega erros do Conflict (ex: "E-mail já cadastrado.")
                    setErro(erroApi.message || 'Erro ao cadastrar. Tente novamente.');
                }
            }

        } catch (error) {
            console.error('Erro de conexão:', error);
            setErro('Não foi possível conectar ao servidor. Tente mais tarde.');
        
        } finally {
            setIsLoading(false);
        }
    };

    const handleTelefoneChange = (e) => {
        const input = e.target.value.replace(/\D/g, ''); 
        let formatado = input;
        if (input.length > 2) {
            formatado = `(${input.substring(0, 2)}) ${input.substring(2, 7)}${input.length > 7 ? '-' + input.substring(7, 11) : ''}`;
        } else if (input.length > 0) {
            formatado = `(${input}`;
        }
        setTelefone(formatado);
    };

    const handleChange = (setter) => (e) => {
        if (erro) setErro('');
        setter(e.target.value);
    };

    return (
        <div className="login-caixa">
            <h2>Cadastre-se na <span className="logo-bem">PRYCE</span></h2>

            <form onSubmit={aoSubmeterCadastro}>
                
                {/* --- CAMPOS QUE FALTAVAM --- */}

                <div className="form-grupo">
                    <label htmlFor="nome-completo">Nome Completo:</label>
                    <input type="text" id="nome-completo" value={nomeCompleto} onChange={handleChange(setNomeCompleto)} required disabled={isLoading} />
                </div>
                
                <div className="form-grupo">
                    <label htmlFor="email">E-mail:</label>
                    <input type="email" id="email" value={email} onChange={handleChange(setEmail)} required disabled={isLoading} />
                </div>

                <div className="form-grupo form-tipo-documento">
                    <label>Tipo de Documento:</label>
                    <div className="radio-grupo">
                        <label>
                            <input
                                type="radio"
                                value="fisica"
                                checked={tipoDocumento === 'fisica'}
                                onChange={handleChange(setTipoDocumento)}
                                disabled={isLoading}
                            />
                            Pessoa Física
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="juridica"
                                checked={tipoDocumento === 'juridica'}
                                onChange={handleChange(setTipoDocumento)}
                                disabled={isLoading}
                            />
                            Pessoa Jurídica
                        </label>
                    </div>
                </div>

                <div className="form-grupo">
                    <label htmlFor="documento">{tipoDocumento === 'fisica' ? 'CPF' : 'CNPJ'}:</label>
                    <input 
                        type="text" 
                        id="documento" 
                        value={documento} 
                        onChange={handleChange(setDocumento)} 
                        maxLength={tipoDocumento === 'fisica' ? 14 : 18}
                        required 
                        disabled={isLoading}
                    />
                </div>

                <div className="form-grupo">
                    <label htmlFor="data-nascimento">Data de Nascimento:</label>
                    <input 
                        type="date" 
                        id="data-nascimento" 
                        value={dataNascimento} 
                        onChange={handleChange(setDataNascimento)} 
                        required 
                        disabled={isLoading}
                    />
                </div>
                
                <div className="form-grupo">
                    <label>Telefone e País:</label>
                    <div className="input-telefone-grupo">
                        <select 
                            className="seletor-pais" 
                            value={pais.codigo}
                            onChange={(e) => {
                                const novoPais = OPCOES_PAIS.find(p => p.codigo === e.target.value);
                                setPais(novoPais);
                                if (erro) setErro('');
                            }}
                            disabled={isLoading}
                        >
                            {OPCOES_PAIS.map(p => (
                                <option key={p.nome} value={p.codigo}> 
                                    {p.bandeira} {p.nome} ({p.codigo})
                                </option>
                            ))}
                        </select>
                        <input
                            type="tel"
                            placeholder="(21) 99999-9999"
                            value={telefone}
                            onChange={handleTelefoneChange}
                            required
                            disabled={isLoading}
                        />
                    </div>
                </div>
                
                {/* --- FIM DOS CAMPOS QUE FALTAVAM --- */}


                <div className="form-grupo">
                    <label htmlFor="login">Login/Nome de Usuário:</label>
                    <input type="text" id="login" value={login} onChange={handleChange(setLogin)} required disabled={isLoading} />
                </div>
                
                <div className="form-grupo">
                    <label htmlFor="senha">Senha:</label>
                    <input type="password" id="senha" value={senha} onChange={handleChange(setSenha)} required disabled={isLoading} />
                </div>

                <div className="form-grupo">
                    <label htmlFor="confirma-senha">Confirme a Senha:</label>
                    <input type="password" id="confirma-senha" value={confirmaSenha} onChange={handleChange(setConfirmaSenha)} required disabled={isLoading} />
                </div>
                
                <div className="form-checkbox">
                    <input type="checkbox" id="checkbox-termos" checked={termosAceitos} onChange={e => { setTermosAceitos(e.target.checked); if (erro) setErro(''); }} disabled={isLoading} />
                    <label htmlFor="checkbox-termos">
                        Eu li e concordo com os Termos de Serviço e a <a href="#" className="link-secundario">Política de Privacidade</a> da PRYCE.
                    </label>
                </div>

                {erro && (
                    <p className="mensagem-erro">{erro}</p>
                )}

                <button type="submit" className="botao-primario" disabled={isLoading}>
                    {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>

            <p className="texto-rodapé">
                Já tem uma conta? <Link to="/login" className="link-secundario">Faça Login</Link>
            </p>
        </div>
    );
}

export default PaginaCadastro;