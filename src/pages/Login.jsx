import React, { useState } from 'react';
<<<<<<< HEAD
import { supabase } from "../services/supabase";
=======
import { Link } from 'react-router-dom';
>>>>>>> origin/master
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("A tentar autenticar o utilizador:", email);
<<<<<<< HEAD
    const { data, error } = await supabase.auth.signInWithPassword({//gnifica que estamos usando o sistema de autenticação do Supabase. // “Supabase, tente fazer login usando e-mail e senha.”
      email: email,
      password: password
    });

    if (error) {
     setMensagem("E-mail ou senha inválidos.");
     return;
   }

    setMensagem("Login realizado com sucesso!");
   };

  /* logica 
  Clicou em "Entrar"
        ↓
handleSubmit()
        ↓
manda email + password
        ↓
      Supabase
      ↙      ↘
   error      data
     ↓          ↓
  deu ruim    login OK*/
=======
    // Aqui entrará a lógica de ligação ao Supabase no futuro
  };
>>>>>>> origin/master

  return (
    <div className="login-page">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
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

          <button type="submit" className="login-btn">Entrar</button>

          {/* Nova secção de links adicionada */}
          <div className="login-footer">
            <p>
              Não tem uma conta?{' '}
              <Link to="/registo" className="login-link">
                Registe-se aqui
              </Link>
            </p>
            <p>
              <Link to="/recuperar-senha" className="login-link-secondary">
                Esqueceu a palavra-passe?
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}