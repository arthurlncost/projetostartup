import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import './Cadastro.css';

export default function CadastroEmpresa() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    empresa: '', email: '', cep: '', senha: '', confirmarSenha: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((anterior) => ({ ...anterior, [name]: value }));
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
        data: { tipo: 'vendedor', nome: formData.empresa, cep: formData.cep }
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

        if (!data.session) {
        alert("Conta criada! Confira seu e-mail para confirmar o cadastro.");
        navigate('/login');
        return;
      }

      const { error: erroEmpresa } = await supabase.from('empresas').insert({
        nome: formData.empresa,
        cep: formData.cep,
        user_id: data.user.id,    // liga a empresa à conta de login
      });

      if (erroEmpresa) {
        alert("Conta criada, mas não foi possível salvar a empresa: " + erroEmpresa.message);
        return;
      }

      navigate('/vendedor');
  };

  return (
    <div className="cadastro-page">
      <div className="cadastro-container">
        <form onSubmit={handleSubmit} className="cadastro-form">
          <h2>Cadastrar minha empresa</h2>
          <p>Anuncie placas, serviços e fazendas solares no Eletricitrus</p>

          <div className="input-group">
            <label>Nome da empresa</label>
            <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>E-mail</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>CEP da empresa</label>
            <input type="text" name="cep" placeholder="00000-000" maxLength="9" value={formData.cep} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input type="password" name="senha" value={formData.senha} onChange={handleChange} required minLength="6" />
          </div>

          <div className="input-group">
            <label>Confirmar senha</label>
            <input type="password" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} required minLength="6" />
          </div>

          <button type="submit" className="cadastro-btn">Cadastrar empresa</button>

          <div className="cadastro-footer">
            <p>
              Já tem conta?{' '}
              <Link to="/login" className="cadastro-link">Entre aqui</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}