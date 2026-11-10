import { useEffect, useState } from 'react';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import Mascote from '../components/Mascote';
import './Home.css';

const MAP_CENTER = { lat: -23.55052, lng: -46.633308 };

const MAP_OPTIONS = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
};

const STEPS = [
  {
    title: 'Captação',
    description: 'Os painéis solares captam a luz do sol e geram energia elétrica em corrente contínua.',
    image: '/imagens/carrossel/slide-1.webp.jfif',
  },
  {
    title: 'Conversão',
    description: 'A energia é convertida de corrente contínua para corrente alternada, pronta para uso.',
    image: '/imagens/carrossel/slide-2.webp.jfif',
  },
  {
    title: 'Consumo',
    description: 'A energia alimenta o seu imóvel, e pode reduzir o valor da fatura de eletricidade ao longo dos meses.',
    image: '/imagens/carrossel/slide-3.webp.jfif',
  },
  {
    title: 'Créditos',
    description: 'O excedente gerado é injetado na rede e transforma-se em créditos de energia.',
    image: '/imagens/carrossel/slide-4.webp.jfif',
  },
];

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey || '',
  });

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveStep((currentStep) => (currentStep + 1) % STEPS.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="home-container">

      <section className="hero-section">
        <Mascote tipo="coracao" largura={180} alt="Solzinho dando boas-vindas ao Eletricitrus" />
        <h1 className="hero-title">
          O Sol que gera energia para um futuro melhor
        </h1>
        <p className="hero-subtitle">
          Energia solar limpa, renovável e inesgotável para a sua casa ou empresa.
        </p>
      </section>
      <section className="info-section steps-section">
        <h2>Como Funciona? Da luz do sol à sua casa</h2>
        <div className="steps-slider" aria-live="polite">
          <div
            className="steps-track"
            style={{ transform: `translateX(-${activeStep * 100}%)` }}
          >
            {STEPS.map((step, index) => (
              <article
                className="step-slide"
                key={step.title}
                style={step.image ? {
                  backgroundImage: `linear-gradient(rgba(251, 247, 238, 0.78), rgba(246, 239, 226, 0.78)), url(${step.image})`,
                } : undefined}
              >
                {index === activeStep ? (
                  <span className="slide-loader" key={`loader-${activeStep}`} aria-hidden="true" />
                ) : null}
                <span className="step-number">{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="info-section advantages-section">
        <h2>Vantagens para Você e para o Planeta</h2>
        <div className="advantages-grid">
          <div className="advantage-card">
            <span className="adv-icon">📉</span>
            <h4>Poupança na Conta</h4>
            <p>Reduz drasticamente o valor da fatura de eletricidade ao longo dos meses.</p>
          </div>
          <div className="advantage-card">
            <span className="adv-icon">🌱</span>
            <h4>Sustentabilidade</h4>
            <p>Diminui a emissão de CO₂ e combate ativamente as mudanças climáticas.</p>
          </div>
          <div className="advantage-card">
            <span className="adv-icon">⚡</span>
            <h4>Independência</h4>
            <p>Proporciona maior segurança no fornecimento e autonomia energética.</p>
          </div>
          <div className="advantage-card">
            <span className="adv-icon">🏡</span>
            <h4>Valorização</h4>
            <p>Pode contribuir para a valorização de imóveis equipados com sistemas solares.</p>
          </div>
        </div>
      </section>

      <section className="ods-section">
        <h2>Compromisso com os ODS da ONU</h2>
        <p>O projeto está relacionado aos seguintes Objetivos de Desenvolvimento Sustentável (ODS):</p>
        <div className="ods-grid">
          <div className="ods-badge ods-7">
            <strong>ODS 7</strong>
            <span>Energia Limpa e Acessível</span>
          </div>
          <div className="ods-badge ods-11">
            <strong>ODS 11</strong>
            <span>Cidades e Comunidades Sustentáveis</span>
          </div>
          <div className="ods-badge ods-13">
            <strong>ODS 13</strong>
            <span>Ação Contra a Mudança Global do Clima</span>
          </div>
          <div className="ods-badge ods-17">
            <strong>ODS 17</strong>
            <span>Parcerias e Meios de Implementação</span>
          </div>
        </div>
      </section>

      <section className="info-section map-section">
        <h2>Mapa de Referencia</h2>
        <p className="map-subtitle">Encontre a regiao de atuacao da Eletricitrus no mapa interativo.</p>
        <div className="map-wrapper" role="region" aria-label="Mapa interativo da Eletricitrus">
          {!apiKey ? (
            <p className="map-message">Defina VITE_GOOGLE_MAPS_API_KEY para carregar o mapa.</p>
          ) : null}

          {apiKey && loadError ? (
            <p className="map-message">Nao foi possivel carregar o Google Maps. Verifique a chave e o dominio autorizado.</p>
          ) : null}

          {apiKey && !loadError && !isLoaded ? (
            <p className="map-message">Carregando mapa...</p>
          ) : null}

          {apiKey && isLoaded ? (
            <GoogleMap
              mapContainerClassName="google-map"
              center={MAP_CENTER}
              zoom={10}
              options={MAP_OPTIONS}
            >
              <MarkerF position={MAP_CENTER} title="Eletricitrus" />
            </GoogleMap>
          ) : null}
        </div>
      </section>
    </div>
  );
}