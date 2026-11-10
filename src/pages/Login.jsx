import React, { useState } from 'react';
import { supabase } from "../services/supabase";
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [aba, setAba] = useState('cliente');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMensagem('');

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    setMensagem("E-mail ou senha inválidos.");
    return;
  }

  const tipoConta = data.user.user_metadata?.tipo ?? 'cliente';

  // entrou pela porta errada: desloga e avisa
  if (tipoConta !== aba) {
    await supabase.auth.signOut();
    setMensagem(
      tipoConta === 'vendedor'
        ? 'Esta conta é de vendedor. Use a aba "Sou vendedor".'
        : 'Esta conta é de cliente. Use a aba "Sou cliente".'
    );
    return;
  }

  navigate(tipoConta === 'vendedor' ? '/vendedor' : '/painel');
};

  return (
    <div className="login-page">
      <div className="login-container">

        <form onSubmit={handleSubmit} className="login-form">

          <div className="login-abas">
            <button type="button"
              className={aba === 'cliente' ? 'login-aba ativa' : 'login-aba'}
              onClick={() => setAba('cliente')}>
              Sou cliente
            </button>
            <button type="button"
              className={aba === 'vendedor' ? 'login-aba ativa' : 'login-aba'}
              onClick={() => setAba('vendedor')}>
              Sou vendedor
            </button>
          </div>

    '<h2>{aba === 'cliente' ? 'Entrar como cliente' : 'Entrar como vendedor'}</h2>

          <h2>Entrar no Eletricitrus</h2>
          <p>Aceda à sua conta de energia solar</p>

          <div className="input-group">
            <label>E-mail</label>

            <input
              type="email"
              placeholder="exemplo@eletricitrus.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Palavra-passe</label>

            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {mensagem && (
            <p>{mensagem}</p>
          )}

          <button type="submit" className="login-btn">
            Entrar
          </button>

          {/* Nova secção de links adicionada */}
          <div className="login-footer">

            <p>
              Não tem uma conta?{' '}
              <Link to="/registo" className="login-link">
                Registe-se aqui
              </Link>
            </p>

            <p>
              <Link
                to="/recuperar-senha"
                className="login-link-secondary"
              >
                Esqueceu a palavra-passe?
              </Link>
            </p>
            <p>
              {aba === 'cliente' ? 'Não tem uma conta? ' : 'Quer anunciar? '}
              <Link to={aba === 'cliente' ? '/registo' : '/cadastro-empresa'} className="login-link">
                {aba === 'cliente' ? 'Registe-se aqui' : 'Cadastre sua empresa'}
              </Link>
            </p>

          </div>

        </form>

      </div>
    </div>
  );
}