import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from "../services/supabase";
import './Cadastro.css';

export default function Cadastro() {
  const navigate = useNavigate();
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

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.senha !== formData.confirmarSenha) {
    alert("As senhas não coincidem. Tente novamente!");
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.senha,
    options: {
      data: { nome: formData.nome, cep: formData.cep,  tipo: 'cliente' }
    }
  });

  if (error) {
    if (error.message.includes('already registered')) {
      alert("Esse e-mail já tem conta. Entre pela tela de login.");
    } else {
      alert("Erro ao criar conta: " + error.message);
    }
    return;
  }

  if (data.session) {
    navigate('/painel');   // logou junto com o cadastro: vai direto
  } else {
    alert("Conta criada! Confira seu e-mail para confirmar o cadastro.");
    navigate('/login');
  }
};

  return (
    <div className="cadastro-page">
      <div className="cadastro-container">

        <form onSubmit={handleSubmit} className="cadastro-form">

          <h2>Criar Conta</h2>
          <p>Junte-se ao Eletricitrus e transforme a sua energia</p>

          <div className="input-group">
            <label>Nome Completo</label>

            <input
              type="text"
              name="nome"
              placeholder="Ex: João Silva"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>E-mail</label>

            <input
              type="email"
              name="email"
              placeholder="exemplo@eletricitrus.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>CEP (Endereço)</label>

            <input
              type="text"
              name="cep"
              placeholder="00000-000"
              maxLength="9"
              value={formData.cep}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Senha</label>

            <input
              type="password"
              name="senha"
              placeholder="********"
              value={formData.senha}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          <div className="input-group">
            <label>Confirmar Senha</label>

            <input
              type="password"
              name="confirmarSenha"
              placeholder="********"
              value={formData.confirmarSenha}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          <button type="submit" className="cadastro-btn">
            Registar
          </button>

          <div className="cadastro-footer">
            <p>
              Já tem uma conta?{' '}
              <Link to="/login" className="cadastro-link">
                Entre aqui
              </Link>
            </p>
          </div>

        </form>

      </div>
    </div>
  );
}