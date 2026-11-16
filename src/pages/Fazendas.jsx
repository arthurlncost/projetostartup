import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { capaBlog, artigosFazendas, fontesBlog } from '../data/blogFazendas';
import './Fazendas.css';

function formatarPreco(valor) {
  return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// se o arquivo da imagem ainda não existe, esconde a figura inteira
function esconderFigura(e) {
  const figura = e.currentTarget.closest('figure');
  if (figura) figura.style.display = 'none';
}

// tempo de leitura: total de palavras dos textos dividido por 200 por minuto
const palavras = artigosFazendas.reduce((total, artigo) => {
  const texto = [...artigo.paragrafos, ...(artigo.lista ?? [])].join(' ');
  return total + texto.split(/\s+/).length;
}, 0);
const minutosLeitura = Math.max(1, Math.round(palavras / 200));

export default function Fazendas() {
  const [anuncios, setAnuncios] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      const { data, error } = await supabase
        .from('anuncios')
        .select('id, titulo, descricao, cidade, preco, empresas(nome)')
        .eq('categoria', 'fazenda')
        .eq('ativo', true)
        .order('criado_em', { ascending: false });

      if (error) console.error(error);
      else setAnuncios(data);
      setCarregando(false);
    }
    carregar();
  }, []);

  return (
    <div className="fazendas-container">
      <article className="post">
        <header className="post-cabecalho">
          <span className="post-etiqueta">Guia</span>
          <h1>Fazendas solares: o guia completo</h1>
          <p className="post-subtitulo">
            O que são, como funcionam, onde ficam e por que importam para o planeta.
          </p>
          <div className="post-info">
            <span>Por Eletricitrus</span>
            <span>{minutosLeitura} min de leitura</span>
          </div>
          <a href="#parceiras" className="post-botao">Ver fazendas parceiras ↓</a>
        </header>

        {capaBlog.imagem && (
          <figure className="post-capa">
            <img src={capaBlog.imagem} alt={capaBlog.legenda} onError={esconderFigura} />
            {(capaBlog.legenda || capaBlog.credito) && (
              <figcaption>
                {capaBlog.legenda}
                {capaBlog.credito && <span> · {capaBlog.credito}</span>}
              </figcaption>
            )}
          </figure>
        )}

        {artigosFazendas.map((artigo) => (
          <section className="blog-secao" id={artigo.id} key={artigo.id}>
            {artigo.imagem && (
              <figure className="post-figura">
                <img src={artigo.imagem} alt={artigo.legenda || artigo.titulo} loading="lazy" onError={esconderFigura} />
                {(artigo.legenda || artigo.credito) && (
                  <figcaption>
                    {artigo.legenda}
                    {artigo.credito && <span> · {artigo.credito}</span>}
                  </figcaption>
                )}
              </figure>
            )}

            <div className="post-texto">
              <h2>{artigo.titulo}</h2>

              {artigo.paragrafos.map((paragrafo, i) => (
                <p key={i}>{paragrafo}</p>
              ))}

              {artigo.lista && (
                <ul>
                  {artigo.lista.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}

              {artigo.curiosidade && (
                <aside className="blog-curiosidade">
                  <strong>Você sabia?</strong> {artigo.curiosidade}
                </aside>
              )}
            </div>
          </section>
        ))}

        <footer className="blog-fontes">
          <h3>Fontes</h3>
          <ul>
            {fontesBlog.map((fonte) => (
              <li key={fonte.url}>
                <a href={fonte.url} target="_blank" rel="noopener noreferrer">{fonte.nome}</a>
              </li>
            ))}
          </ul>
        </footer>
      </article>

      <section id="parceiras" className="mkt-secao">
        <h2>Fazendas parceiras</h2>
        <p>Anúncios cadastrados pelas próprias empresas.</p>

        {carregando ? (
          <p>Carregando anúncios...</p>
        ) : anuncios.length === 0 ? (
          <div className="mkt-vazio">
            <h3>Ainda não há fazendas anunciadas</h3>
            <p>
              Tem uma fazenda solar? <Link to="/cadastro-empresa">Cadastre sua empresa</Link> e anuncie aqui.
            </p>
          </div>
        ) : (
          <div className="mkt-grade">
            {anuncios.map((a) => (
              <article className="mkt-card" key={a.id}>
                <span className="mkt-etiqueta">Fazenda solar</span>
                <h3>{a.titulo}</h3>
                {a.cidade && <p className="mkt-local">{a.cidade}</p>}
                {a.descricao && <p className="mkt-descricao">{a.descricao}</p>}
                <p className="mkt-empresa">
                  Anunciado por {a.empresas?.nome ?? 'empresa parceira'}
                </p>
                {a.preco != null && <p className="mkt-preco">{formatarPreco(a.preco)}</p>}
                <Link to={`/anuncio/${a.id}`} className="mkt-btn">Ver anúncio</Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
