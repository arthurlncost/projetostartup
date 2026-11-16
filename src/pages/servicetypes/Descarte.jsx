
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import './ServiceType.css';

const passos = [
  {
    numero: 1,
    titulo: 'Não descarte no lixo comum',
    texto: 'Painéis solares contêm materiais que precisam de descarte especializado.',
  },
  {
    numero: 2,
    titulo: 'Procure um ponto de coleta',
    texto: 'Fabricantes e cooperativas parceiras recebem painéis fora de uso para reciclagem.',
  },
  {
    numero: 3,
    titulo: 'Reaproveitamento',
    texto: 'Boa parte dos materiais (vidro, alumínio, silício) pode ser reaproveitada em novos painéis.',
  },
];

function formatarPreco(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export default function Descarte() {
  const [anuncios, setAnuncios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    let ativo = true;

    async function carregarAnuncios() {
      const { data, error } = await supabase
        .from('anuncios')
        .select('id, titulo, descricao, cidade, preco, imagens, empresas(nome)')
        .eq('categoria', 'descarte')
        .eq('ativo', true)
        .order('criado_em', { ascending: false });

      if (!ativo) return;

      if (error) {
        setErro('Não foi possível carregar os anúncios agora. Tente novamente mais tarde.');
      } else {
        setAnuncios(data ?? []);
      }

      setCarregando(false);
    }

    carregarAnuncios();

    return () => {
      ativo = false;
    };
  }, []);

  return (
    <div className="servicetype-container">
      <div className="servicetype-header">
        <span className="servicetype-icone">♻️</span>
        <h2>Descarte & Reciclagem</h2>
        <p>
          Painéis solares têm vida útil longa, mas quando chega a hora de
          substituí-los, o descarte correto faz toda a diferença.
        </p>
      </div>

      <div className="servicetype-grid">
        {passos.map((passo) => (
          <div className="servicetype-card" key={passo.numero}>
            <span className="servicetype-numero">{passo.numero}</span>
            <h4>{passo.titulo}</h4>
            <p>{passo.texto}</p>
          </div>
        ))}
      </div>

      <div className="servicetype-destaque">
        <p>
          <strong>Sustentabilidade:</strong> reciclar painéis solares evita
          que materiais reaproveitáveis acabem em aterros sanitários.
        </p>
      </div>

      {/* MARKETPLACE DE DESCARTE */}
      <section className="servicetype-marketplace">
        <div className="servicetype-marketplace-topo">
          <span className="servicetype-etiqueta">Marketplace</span>
          <h2>Empresas de descarte e reciclagem</h2>
          <p>
            Encontre empresas parceiras que oferecem serviços de coleta
            e reciclagem de painéis solares.
          </p>
        </div>

        {carregando ? (
          <p className="servicetype-status">Carregando anúncios...</p>
        ) : erro ? (
          <p className="servicetype-status servicetype-erro">{erro}</p>
        ) : anuncios.length === 0 ? (
          <div className="servicetype-vazio">
            <span>♻️</span>
            <h3>Ainda não há serviços anunciados</h3>
            <p>
              Assim que uma empresa parceira publicar um anúncio de
              descarte ou reciclagem, ele aparecerá aqui.
            </p>
          </div>
        ) : (
          <div className="servicetype-anuncios-grade">
            {anuncios.map((anuncio) => (
              <article className="servicetype-anuncio-card" key={anuncio.id}>
                {anuncio.imagens?.[0] && (
                  <img
                    className="servicetype-imagem-capa"
                    src={anuncio.imagens[0]}
                    alt={`Foto de ${anuncio.titulo}`}
                    loading="lazy"
                  />
                )}

                {anuncio.imagens?.length > 1 && (
                  <div className="servicetype-miniaturas">
                    {anuncio.imagens.slice(1).map((url, i) => (
                      <img
                        key={url}
                        src={url}
                        alt={`Foto ${i + 2} de ${anuncio.titulo}`}
                        loading="lazy"
                      />
                    ))}
                  </div>
                )}

                <span className="servicetype-tag">Descarte</span>

                <h3>{anuncio.titulo}</h3>

                {anuncio.cidade && (
                  <p className="servicetype-local">
                    ⌖ {anuncio.cidade}
                  </p>
                )}

                {anuncio.descricao && (
                  <p className="servicetype-descricao">
                    {anuncio.descricao}
                  </p>
                )}

                <p className="servicetype-empresa">
                  Anunciado por {anuncio.empresas?.nome ?? 'empresa parceira'}
                </p>

                {anuncio.preco != null && (
                  <strong className="servicetype-preco">
                    {formatarPreco(anuncio.preco)}
                  </strong>
                )}

                <Link to={`/anuncio/${anuncio.id}`} className="servicetype-btn">
                  Ver anúncio
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <Link to="/placas" className="servicetype-voltar">
        ← Voltar para Placas Solares
      </Link>
    </div>
  );
}
