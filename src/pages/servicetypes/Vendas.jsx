
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../services/supabase';
import './ServiceType.css';
import '../Placas.css';

const passos = [
  {
    numero: 1,
    titulo: 'Simule sua economia',
    texto: 'Use a nossa calculadora para saber quantos painéis você precisa.',
  },
  {
    numero: 2,
    titulo: 'Escolha uma parceira',
    texto: 'Compare as fazendas solares e distribuidoras parceiras do Eletricitrus.',
  },
  {
    numero: 3,
    titulo: 'Solicite um orçamento',
    texto: 'Entre em contato direto com a parceira escolhida para fechar negócio.',
  },
];

function formatarPreco(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export default function Vendas() {
  const [anuncios, setAnuncios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    let ativo = true;

    async function carregarAnuncios() {
      const { data, error } = await supabase
        .from('anuncios')
        .select('id, titulo, descricao, cidade, preco, imagens, empresas(nome)')
        .eq('categoria', 'placa')
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
        <span className="servicetype-icone">🛒</span>
        <h2>Comprar Painéis Solares</h2>
        <p>
          Veja as ofertas de placas e equipamentos solares anunciadas
          pelas empresas parceiras do Eletricitrus.
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
          <strong>Dica:</strong> quanto mais precisa for a informação que você
          der na calculadora, mais próximo do real será o orçamento das
          parceiras.
        </p>
      </div>

      {/* MARKETPLACE DE PLACAS SOLARES */}
      <section className="placas-anuncios" id="anuncios">
        <div className="placas-anuncios-topo">
          <div>
            <span className="placas-etiqueta">Marketplace</span>
            <h2>Placas e equipamentos anunciados</h2>
            <p>Ofertas cadastradas pelas empresas parceiras.</p>
          </div>

          <Link to="/cadastro-empresa" className="placas-anunciar">
            Quero anunciar minha empresa
          </Link>
        </div>

        {carregando ? (
          <p className="placas-status">Carregando anúncios...</p>
        ) : erro ? (
          <p className="placas-status placas-erro">{erro}</p>
        ) : anuncios.length === 0 ? (
          <div className="placas-vazio">
            <span aria-hidden="true">🔆</span>
            <h3>Ainda não há placas anunciadas</h3>
            <p>
              Assim que uma empresa parceira publicar um anúncio de placas
              solares, ele aparecerá aqui.
            </p>
            <Link to="/cadastro-empresa">
              Cadastre sua empresa para anunciar
            </Link>
          </div>
        ) : (
          <div className="placas-anuncios-grade">
            {anuncios.map((anuncio) => (
              <article className="placas-anuncio-card" key={anuncio.id}>
                {anuncio.imagens?.[0] && (
                  <img
                    className="marketplace-imagem-capa"
                    src={anuncio.imagens[0]}
                    alt={`Foto de ${anuncio.titulo}`}
                    loading="lazy"
                  />
                )}

                {anuncio.imagens?.length > 1 && (
                  <div className="marketplace-miniaturas">
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

                <span className="placas-anuncio-tag">Placa solar</span>

                <h3>{anuncio.titulo}</h3>

                {anuncio.cidade && (
                  <p className="placas-anuncio-local">
                    ⌖ {anuncio.cidade}
                  </p>
                )}

                {anuncio.descricao && (
                  <p className="placas-anuncio-descricao">
                    {anuncio.descricao}
                  </p>
                )}

                <p className="placas-anuncio-empresa">
                  Anunciado por {anuncio.empresas?.nome ?? 'empresa parceira'}
                </p>

                {anuncio.preco != null && (
                  <strong className="placas-anuncio-preco">
                    {formatarPreco(anuncio.preco)}
                  </strong>
                )}

                <Link to={`/anuncio/${anuncio.id}`} className="mkt-btn">
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
