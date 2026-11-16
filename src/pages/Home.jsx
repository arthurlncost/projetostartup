import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { useAuth } from '../context/AuthContext';
import Mascote from '../components/Mascote';
import './Home.css';

const parceiros = [
  { nome: 'SunMobi', rota: '/partners/sunmobi' },
  { nome: 'Enerlivre', rota: '/partners/enerlivre' },
  { nome: 'EvoSolar', rota: '/partners/evosolar' },
  { nome: 'EDP Soluções', rota: '/partners/edpsolucoes' },
  { nome: 'Sunnyhub', rota: '/partners/sunnyhub' },
];

const recursos = [
  { rota: '/calculadora', icone: '🧮', titulo: 'Calculadora solar', descricao: 'Estime consumo, quantidade de painéis e economia considerando a incidência solar da sua região.', acao: 'Fazer simulação' },
  { rota: '/fazendas', icone: '🌱', titulo: 'Fazendas solares', descricao: 'Entenda como funciona a geração compartilhada e conheça anúncios de fazendas parceiras.', acao: 'Explorar fazendas' },
  { rota: '/placas', icone: '🔆', titulo: 'Placas solares', descricao: 'Compare tecnologias, encontre serviços e veja equipamentos anunciados por empresas.', acao: 'Ver placas e serviços' },
  { rota: '/servicos', icone: '🛠️', titulo: 'Serviços', descricao: 'Encontre soluções de energia solar e conheça as categorias disponíveis na plataforma.', acao: 'Conhecer serviços' },
  { rota: '/faq', icone: '💬', titulo: 'Dúvidas frequentes', descricao: 'Encontre respostas sobre energia solar e sobre como utilizar o Eletricitrus.', acao: 'Consultar FAQ' },
  { rota: '/cadastro-empresa', icone: '🏢', titulo: 'Seja uma empresa parceira', descricao: 'Cadastre sua empresa e publique anúncios para alcançar novos clientes.', acao: 'Quero anunciar' },
];

const ETAPAS_SOLAR = [
  {
    titulo: 'Captação',
    descricao: 'Os painéis solares captam a luz do sol e geram energia elétrica em corrente contínua.',
    imagem: '/imagens/carrossel/slide-1.webp.jfif',
    alt: 'Painéis solares recebendo luz solar',
  },
  {
    titulo: 'Conversão',
    descricao: 'A energia gerada é convertida para corrente alternada, adequada ao uso em imóveis.',
    imagem: '/imagens/carrossel/slide-2.webp.jfif',
    alt: 'Sistema de conversão de energia solar',
  },
  {
    titulo: 'Consumo',
    descricao: 'A energia produzida pode abastecer o imóvel e ajudar a reduzir o valor da conta de luz.',
    imagem: '/imagens/carrossel/slide-3.webp.jfif',
    alt: 'Energia solar sendo utilizada em uma propriedade',
  },
  {
    titulo: 'Créditos',
    descricao: 'A energia excedente pode ser injetada na rede e convertida em créditos, conforme as regras aplicáveis.',
    imagem: '/imagens/carrossel/slide-4.webp.jfif',
    alt: 'Usina solar conectada à rede elétrica',
  },
];

const MAP_CENTER = { lat: -23.55052, lng: -46.633308 };
const MAP_OPTIONS = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
};

export default function Home() {
  const { user } = useAuth();
  const [etapaAtiva, setEtapaAtiva] = useState(0);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const intervalo = window.setInterval(() => {
      setEtapaAtiva((atual) => (atual + 1) % ETAPAS_SOLAR.length);
    }, 6000);

    return () => window.clearInterval(intervalo);
  }, []);

  const etapaAnterior = () => {
    setEtapaAtiva((atual) => (atual - 1 + ETAPAS_SOLAR.length) % ETAPAS_SOLAR.length);
  };

  const proximaEtapa = () => {
    setEtapaAtiva((atual) => (atual + 1) % ETAPAS_SOLAR.length);
  };

  return (
    <main className="home-container">
      <section className="home-hero">
        <div className="home-hero-texto">
          <span className="home-etiqueta">ELETRICITRUS · ENERGIA INTELIGENTE</span>
          <h1>O sol tem potencial. <span>Descubra o seu.</span></h1>
          <p>Simule sua economia, conheça fazendas solares, encontre placas e serviços e conecte-se com empresas parceiras.</p>
          <div className="home-hero-acoes">
            <Link to="/calculadora" className="home-botao-principal">Começar pela calculadora →</Link>
            <Link to="/placas" className="home-botao-secundario">Explorar soluções</Link>
          </div>
        </div>
        <div className="home-hero-mascote">
          <Mascote tipo="coracao" largura={170} alt="Mascote do Eletricitrus" />
        </div>
      </section>

      {/* Carrossel educativo da versão do Caique, integrado sem substituir a Home original. */}
      <section className="home-carrossel" aria-labelledby="home-carrossel-titulo">
        <div className="home-carrossel-cabecalho">
          <span className="home-etiqueta">ENERGIA SOLAR NA PRÁTICA</span>
          <h2 id="home-carrossel-titulo">Da luz do sol à sua casa</h2>
          <p>Conheça as principais etapas de funcionamento de um sistema de energia solar.</p>
        </div>
        <div className="home-carrossel-janela" aria-live="polite">
          <div className="home-carrossel-trilho" style={{ transform: `translateX(-${etapaAtiva * 100}%)` }}>
            {ETAPAS_SOLAR.map((etapa, indice) => (
              <article className="home-carrossel-slide" key={etapa.titulo}>
                <img src={etapa.imagem} alt={etapa.alt} loading={indice === etapaAtiva ? 'eager' : 'lazy'} />
                <div className="home-carrossel-conteudo">
                  <span className="home-carrossel-numero">{String(indice + 1).padStart(2, '0')}</span>
                  <h3>{etapa.titulo}</h3>
                  <p>{etapa.descricao}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="home-carrossel-controles">
          <button type="button" onClick={etapaAnterior} aria-label="Etapa anterior">‹</button>
          <div className="home-carrossel-indicadores" aria-label="Selecionar etapa">
            {ETAPAS_SOLAR.map((etapa, indice) => (
              <button
                type="button"
                key={etapa.titulo}
                className={indice === etapaAtiva ? 'ativo' : ''}
                onClick={() => setEtapaAtiva(indice)}
                aria-label={`Mostrar etapa ${indice + 1}: ${etapa.titulo}`}
                aria-current={indice === etapaAtiva ? 'true' : undefined}
              />
            ))}
          </div>
          <button type="button" onClick={proximaEtapa} aria-label="Próxima etapa">›</button>
        </div>
      </section>

      <section className="home-recursos" aria-labelledby="home-recursos-titulo">
        <div className="home-secao-cabecalho">
          <div>
            <span className="home-etiqueta">EXPLORE A PLATAFORMA</span>
            <h2 id="home-recursos-titulo">O que você pode fazer por aqui?</h2>
            <p>Todas as áreas do Eletricitrus em um só lugar. Escolha por onde começar.</p>
          </div>
        </div>
        <div className="home-recursos-grid">
          {recursos.map((recurso) => (
            <Link to={recurso.rota} className="home-recurso-card" key={recurso.rota}>
              <span className="home-recurso-icone" aria-hidden="true">{recurso.icone}</span>
              <h3>{recurso.titulo}</h3>
              <p>{recurso.descricao}</p>
              <span className="home-recurso-acao">{recurso.acao} <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-como-funciona">
        <div>
          <span className="home-etiqueta">É SIMPLES</span>
          <h2>Comece em três passos</h2>
          <p>Não sabe por onde começar? Siga este caminho para conhecer as possibilidades de energia solar.</p>
        </div>
        <ol className="home-passos">
          <li><span>01</span><div><strong>Faça uma simulação</strong><p>Informe sua conta de luz e sua localização para estimar seu potencial solar.</p></div></li>
          <li><span>02</span><div><strong>Explore as soluções</strong><p>Conheça placas, fazendas solares e serviços disponíveis na plataforma.</p></div></li>
          <li><span>03</span><div><strong>Conecte-se com parceiros</strong><p>Veja os anúncios publicados por empresas cadastradas no Eletricitrus.</p></div></li>
        </ol>
      </section>

      <section className="home-parceiros">
        <div>
          <span className="home-etiqueta">REDE DE PARCEIROS</span>
          <h2>Conheça nossas empresas parceiras</h2>
          <p>Acesse as páginas das empresas para conhecer as soluções e informações disponíveis.</p>
        </div>
        <div className="home-parceiros-links">
          {parceiros.map((parceiro) => <Link key={parceiro.rota} to={parceiro.rota}>{parceiro.nome} <span>→</span></Link>)}
        </div>
      </section>

      {/* Mapa interativo adicionado pelo Caique; depende da chave Google Maps. */}
      <section className="home-mapa" aria-labelledby="home-mapa-titulo">
        <div className="home-mapa-cabecalho">
          <span className="home-etiqueta">LOCALIZAÇÃO</span>
          <h2 id="home-mapa-titulo">Conheça nossa região de referência</h2>
          <p>Mapa de referência da plataforma Eletricitrus.</p>
        </div>
        <div className="home-mapa-area" role="region" aria-label="Mapa interativo da Eletricitrus">
          {!apiKey
            ? <p className="home-mapa-mensagem">Para exibir o mapa, configure a variável <code>VITE_GOOGLE_MAPS_API_KEY</code> no arquivo <code>.env</code>.</p>
            : <MapaEletricitrus apiKey={apiKey} />}
        </div>
        <p className="home-mapa-nota">O marcador representa apenas uma localização de referência (São Paulo); não indica a localização exata de uma unidade ou fazenda.</p>
      </section>

      <section className="home-ods">
        <div>
          <span className="home-etiqueta">NOSSO PROPÓSITO</span>
          <h2>Energia mais sustentável para todos</h2>
          <p>O Eletricitrus apoia a conscientização e o acesso a soluções de energia limpa, em alinhamento com os Objetivos de Desenvolvimento Sustentável da ONU.</p>
        </div>
        <div className="home-ods-lista">
          <span><strong>ODS 7</strong> Energia limpa e acessível</span>
          <span><strong>ODS 11</strong> Cidades sustentáveis</span>
          <span><strong>ODS 13</strong> Ação climática</span>
          <span><strong>ODS 17</strong> Parcerias</span>
        </div>
      </section>

      <section className="home-final-cta">
        <div>
          <h2>{user ? 'Continue explorando o Eletricitrus' : 'Faça parte dessa transformação'}</h2>
          <p>{user ? 'Acesse sua área ou continue conhecendo nossas soluções.' : 'Crie sua conta para acompanhar suas simulações ou cadastre sua empresa para anunciar.'}</p>
        </div>
        <div className="home-final-acoes">
          {user ? <Link to={user.user_metadata?.tipo === 'vendedor' ? '/vendedor' : '/painel'}>Meu painel →</Link> : <Link to="/registo">Criar minha conta →</Link>}
          <Link to="/login" className="home-final-secundario">Já tenho cadastro</Link>
        </div>
      </section>
    </main>
  );
}


function MapaEletricitrus({ apiKey }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'eletricitrus-google-map',
    googleMapsApiKey: apiKey,
  });

  if (loadError) {
    return <p className="home-mapa-mensagem">Não foi possível carregar o Google Maps. Verifique a chave e os domínios autorizados.</p>;
  }

  if (!isLoaded) {
    return <p className="home-mapa-mensagem">Carregando mapa...</p>;
  }

  return (
    <GoogleMap mapContainerClassName="home-google-mapa" center={MAP_CENTER} zoom={10} options={MAP_OPTIONS}>
      <MarkerF position={MAP_CENTER} title="Localização de referência Eletricitrus" />
    </GoogleMap>
  );
}
