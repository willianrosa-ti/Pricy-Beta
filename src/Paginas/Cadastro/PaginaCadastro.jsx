// src/paginas/Cadastro/PaginaCadastro.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PaginaCadastro.css';

const OPCOES_PAIS = [
    // ... (Seu array de países continua aqui) ...
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
    // ESTADOS ATUALIZADOS
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('fisica');
    const [documento, setDocumento] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [pais, setPais] = useState(OPCOES_PAIS[0]);
    
    const [login, setLogin] = useState(''); // <<< NOVO ESTADO PARA O LOGIN
    
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [termosAceitos, setTermosAceitos] = useState(false);
    const [erro, setErro] = useState('');

    const aoSubmeterCadastro = (evento) => {
        evento.preventDefault();
        setErro('');

        // --- VALIDAÇÕES SIMPLES ---
        if (!login.trim()) {
            setErro('O campo Login é obrigatório.');
            return;
        }
        
        if (senha !== confirmaSenha) {
            setErro('A senha e a confirmação de senha não coincidem.');
            return;
        }

        if (!termosAceitos) {
            setErro('Você deve aceitar os Termos de Serviço.');
            return;
        }

        // Simulação de envio para a API
        console.log('Dados prontos para API:', {
            nomeCompleto,
            email,
            tipoDocumento,
            documento,
            dataNascimento,
            telefoneCompleto: `${pais.codigo} ${telefone}`,
            login, // <<< NOVO DADO
            senha,
            termosAceitos
        });
        
        alert('Cadastro efetuado! (Pronto para conectar à API)');
    };

    // ... (handleTelefoneChange e handleChange continuam iguais) ...
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
            <h2>Cadastro <span className="logo-bem">PRICY</span></h2>

            <form onSubmit={aoSubmeterCadastro}>
                {/* ... (Campos Nome, Email, Documento, Data Nasc. e Telefone continuam aqui) ... */}
                
                <div className="form-grupo">
                    <label htmlFor="nome-completo">Nome Completo:</label>
                    <input type="text" id="nome-completo" value={nomeCompleto} onChange={handleChange(setNomeCompleto)} required />
                </div>
                
                <div className="form-grupo">
                    <label htmlFor="email">E-mail:</label>
                    <input type="email" id="email" value={email} onChange={handleChange(setEmail)} required />
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
                            />
                            Pessoa Física
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="juridica"
                                checked={tipoDocumento === 'juridica'}
                                onChange={handleChange(setTipoDocumento)}
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
                        >
                            {OPCOES_PAIS.map(p => (
                                <option key={p.codigo} value={p.codigo}>
                                    {p.bandeira} {p.nome} ({p.codigo})
                                </option>
                            ))}
                        </select>
                        <input
                            type="tel"
                            placeholder="(99) 99999-9999"
                            value={telefone}
                            onChange={handleTelefoneChange}
                            required
                        />
                    </div>
                </div>

                {/* <<< NOVO CAMPO: LOGIN/NOME DE USUÁRIO */}
                <div className="form-grupo">
                    <label htmlFor="login">Login:</label>
                    <input type="text" id="login" value={login} onChange={handleChange(setLogin)} required />
                </div>
                
                {/* SENHA */}
                <div className="form-grupo">
                    <label htmlFor="senha">Senha:</label>
                    <input type="password" id="senha" value={senha} onChange={handleChange(setSenha)} required />
                </div>

                {/* CONFIRMAÇÃO DE SENHA */}
                <div className="form-grupo">
                    <label htmlFor="confirma-senha">Confirme a Senha:</label>
                    <input type="password" id="confirma-senha" value={confirmaSenha} onChange={handleChange(setConfirmaSenha)} required />
                </div>
                
                {/* ... (Checkbox, Erro e Botão continuam aqui) ... */}

                <div className="form-checkbox">
                    <input type="checkbox" id="checkbox-termos" checked={termosAceitos} onChange={e => { setTermosAceitos(e.target.checked); if (erro) setErro(''); }}/>
                    <label htmlFor="checkbox-termos">
                        Eu li e concordo com os Termos de Serviço <a href="#" className="link-secundario"></a>da PRYCE.
                    </label>
                </div>

                {erro && (
                    <p className="mensagem-erro">{erro}</p>
                )}

                <button type="submit" className="botao-primario">
                    Cadastrar
                </button>
            </form>

            <p className="texto-rodapé">
                Já tem uma conta? <Link to="/login" className="link-secundario">Faça Login</Link>
            </p>
        </div>
    );
}

export default PaginaCadastro;