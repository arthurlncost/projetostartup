// ============================================================
// DESCARTE & RECICLAGEM - src/pages/servicetypes/Descarte.jsx
// ============================================================
import { Link } from "react-router-dom";
import "./ServiceType.css";

const passos = [
  {
    numero: 1,
    titulo: "Não descarte no lixo comum",
    texto: "Painéis solares contêm materiais que precisam de descarte especializado.",
  },
  {
    numero: 2,
    titulo: "Procure um ponto de coleta",
    texto: "Fabricantes e cooperativas parceiras recebem painéis fora de uso para reciclagem.",
  },
  {
    numero: 3,
    titulo: "Reaproveitamento",
    texto: "Boa parte dos materiais (vidro, alumínio, silício) pode ser reaproveitada em novos painéis.",
  },
];

export default function Descarte() {
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

      <Link to="/placas" className="servicetype-voltar">
        ← Voltar para Placas Solares
      </Link>
    </div>
  );
}
