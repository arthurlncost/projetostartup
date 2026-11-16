
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import './ServiceType.css';

const passos = [
  {
    numero: 1,
    titulo: 'Limpeza regular',
    texto: 'Poeira e folhas reduzem a geração de energia. Limpe os painéis a cada 3-6 meses.',
  },
  {
    numero: 2,
    titulo: 'Inspeção visual',
    texto: 'Verifique cabos, conexões e a estrutura de fixação periodicamente.',
  },
  {
    numero: 3,
    titulo: 'Monitoramento',
    texto: 'Acompanhe a geração de energia para identificar quedas de desempenho cedo.',
  },
];

function formatarPreco(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export default function Manutencao() {
  const [anuncios, setAnuncios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    let ativo = true;

    async function carregarAnuncios() {
      const { data, error } = await supabase
        .from('anuncios')
        .select('id, titulo, descricao, cidade, preco, imagens, empresas(nome)')
        .eq('categoria', 'manutencao')
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
        <span className="servicetype-icone">🔧</span>
        <h2>Manutenção de Painéis Solares</h2>
        <p>
          Cuidados simples que mantêm o seu sistema solar gerando o máximo de
          energia possível.
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
          <strong>Atenção:</strong> nunca suba no telhado ou mexa nas
          conexões elétricas sem um técnico qualificado.
        </p>
      </div>

      {/* MARKETPLACE DE MANUTENÇÃO */}
      <section className="servicetype-marketplace">
        <div className="servicetype-marketplace-topo">
          <span className="servicetype-etiqueta">Marketplace</span>
          <h2>Empresas de manutenção e limpeza</h2>
          <p>
            Encontre empresas parceiras que oferecem serviços para seus
            painéis solares.
          </p>
        </div>

        {carregando ? (
          <p className="servicetype-status">Carregando anúncios...</p>
        ) : erro ? (
          <p className="servicetype-status servicetype-erro">{erro}</p>
        ) : anuncios.length === 0 ? (
          <div className="servicetype-vazio">
            <span>🔧</span>
            <h3>Ainda não há serviços anunciados</h3>
            <p>
              Assim que uma empresa parceira publicar um anúncio de
              manutenção, ele aparecerá aqui.
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

                <span className="servicetype-tag">Manutenção</span>

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
