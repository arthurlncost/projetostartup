// ============================================================
// COMPRAR PAINÉIS SOLARES - src/pages/servicetypes/Vendas.jsx
// ============================================================
import { Link } from "react-router-dom";
import "./ServiceType.css";

// Passos exibidos como cards. Mesmo padrão do Home.jsx: um
// array de objetos virando cards via .map().
const passos = [
  {
    numero: 1,
    titulo: "Simule sua economia",
    texto: "Use a nossa calculadora para saber quantos painéis você precisa.",
  },
  {
    numero: 2,
    titulo: "Escolha uma parceira",
    texto: "Compare as fazendas solares e distribuidoras parceiras do Eletricitrus.",
  },
  {
    numero: 3,
    titulo: "Solicite um orçamento",
    texto: "Entre em contato direto com a parceira escolhida para fechar negócio.",
  },
];

export default function Vendas() {
  return (
    <div className="servicetype-container">
      <div className="servicetype-header">
        <span className="servicetype-icone">🛒</span>
        <h2>Comprar Painéis Solares</h2>
        <p>
          Veja o caminho para adquirir o seu sistema de energia solar através
          das nossas parceiras.
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

      <Link to="/placas" className="servicetype-voltar">
        ← Voltar para Placas Solares
      </Link>
    </div>
  );
}
