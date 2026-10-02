import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cadastro.css';

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cep: '',
    senha: '',
    confirmarSenha: ''
  });

  // Atualiza os valores do formulário dinamicamente
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica de palavra-passe
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem. Tente novamente!");
      return;
    }

    console.log("Dados prontos para o Supabase e API de CEP:", formData);
  };

  return (
    <div className="cadastro-page">
      <div className="cadastro-container">
        <form onSubmit={handleSubmit} className="cadastro-form">
          <h2>Criar Conta</h2>
          <p>Junte-se ao Eletricitrus e transforme a sua energia</p>
          
          <div className="input-group">
            <label>Nome Completo</label>
            <input type="text" name="nome" placeholder="Ex: João Silva" value={formData.nome} onChange={handleChange} required/>
          </div>

          <div className="input-group">
            <label>E-mail</label>
            <input 
              type="email" name="email" placeholder="exemplo@eletricitrus.com" value={formData.email} onChange={handleChange} required/>
          </div>

          <div className="input-group">
            <label>CEP (Endereço)</label>
            <input type="text" name="cep" placeholder="00000-000" maxLength="9" value={formData.cep} onChange={handleChange} required/>
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input type="password" name="senha" placeholder="********" value={formData.senha} onChange={handleChange} required minLength="6"/>
          </div>

          <div className="input-group">
            <label>Confirmar Senha</label>
            <input type="password" name="confirmarSenha" placeholder="********" value={formData.confirmarSenha} onChange={handleChange} required minLength="6"/>
          </div>

          <button type="submit" className="cadastro-btn">Registar</button>

          <div className="cadastro-footer">
            <p>Já tem uma conta?{' '}<Link to="/login" className="cadastro-link">Entre aqui</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}