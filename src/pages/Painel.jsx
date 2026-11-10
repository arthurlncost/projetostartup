
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { buscarCep } from '../services/viacep';
import { Link } from 'react-router-dom';
import './Painel.css';

export default function Painel() {
  const { user } = useAuth();
  const [local, setLocal] = useState(null);

  const nome = user?.user_metadata?.nome || user?.email;
  const cep = user?.user_metadata?.cep;

  useEffect(() => {
    if (!cep) return;

    buscarCep(cep)
      .then((dados) => setLocal(dados))
      .catch(() => setLocal(null));
  }, [cep]);

  return (
    <main className="painel">
      <section className="painel-boas-vindas">
        <div className="boas-vindas-texto">
          <span className="painel-etiqueta">
            ☀️ SEU ESPAÇO ELETRICITRUS
          </span>

          <h1>Olá, {nome}!</h1>

          <p>
            Que bom ter você por aqui. Vamos descobrir
            como a energia solar pode transformar o seu dia a dia?
          </p>
        </div>

        <div className="boas-vindas-sol" aria-hidden="true">
          ☀️
        </div>
      </section>

      <section className="painel-informacoes">
        <article className="painel-card">
          <div className="painel-icone icone-laranja">⌖</div>
          <div>
            <h2>Sua cidade</h2>
            <p>
              {local
                ? `${local.localidade} - ${local.uf}`
                : 'Localização não informada'}
            </p>
          </div>
        </article>

        <article className="painel-card">
          <div className="painel-icone icone-verde">♻</div>
          <div>
            <h2>Energia limpa</h2>
            <p>Um futuro mais sustentável começa aqui.</p>
          </div>
        </article>

        <article className="painel-card">
          <div className="painel-icone icone-amarelo">♙</div>
          <div>
            <h2>Sua conta</h2>
            <p className="painel-email">{user?.email}</p>
          </div>
        </article>
      </section>

      <section className="painel-explorar">
        <div className="painel-titulo">
          <h2>Explore o Eletricitrus</h2>
          <p>Encontre soluções e descubra o potencial da energia solar.</p>
        </div>

    <div className="painel-atalhos">
      <Link className="atalho-card" to="/calculadora">
        <span className="atalho-emoji">🧮</span>
        <h3>Calculadora Solar</h3>
        <p>Simule sua economia de energia.</p>
        <span className="atalho-link">
          Explorar <span>→</span>
        </span>
      </Link>

      <Link className="atalho-card" to="/fazendas">
        <span className="atalho-emoji">🌱</span>
        <h3>Fazendas Solares</h3>
        <p>Conheça alternativas de energia compartilhada.</p>
        <span className="atalho-link">
          Explorar <span>→</span>
        </span>
      </Link>

      <Link className="atalho-card" to="/placas">
        <span className="atalho-emoji">🔆</span>
        <h3>Placas Solares</h3>
        <p>Descubra opções para aproveitar o sol.</p>
        <span className="atalho-link">
          Explorar <span>→</span>
        </span>
      </Link>
      </div>

      </section>
    </main>
  );
}
