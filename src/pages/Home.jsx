import React from 'react';
import Mascote from '../components/Mascote';
import './Home.css';

export default function Home() {
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
      <section className="info-section">
        <h2>Como Funciona? Da luz do sol à sua casa</h2>
        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">1</span>
            <h3>Captação</h3>
            <p>Os painéis solares captam a luz do sol e geram energia elétrica em corrente contínua.</p>
          </div>
          <div className="step-card">
            <span className="step-number">2</span>
            <h3>Conversão</h3>
            <p>A energia é convertida de corrente contínua para corrente alternada, pronta para uso.</p>
          </div>
          <div className="step-card">
            <span className="step-number">3</span>
            <h3>Consumo</h3>
            <p>A energia alimenta o seu imóvel, e pode reduzir o valor da fatura de eletricidade ao longo dos meses.</p>
          </div>
          <div className="step-card">
            <span className="step-number">4</span>
            <h3>Créditos</h3>
            <p>O excedente gerado é injetado na rede e transforma-se em créditos de energia.</p>
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
    </div>
  );
}