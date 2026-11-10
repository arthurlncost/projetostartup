// ============================================================
// MANUTENÇÃO DE PAINÉIS SOLARES - src/pages/servicetypes/Manutencao.jsx
// ============================================================
import { Link } from "react-router-dom";
import "./ServiceType.css";

const passos = [
  {
    numero: 1,
    titulo: "Limpeza regular",
    texto: "Poeira e folhas reduzem a geração de energia. Limpe os painéis a cada 3-6 meses.",
  },
  {
    numero: 2,
    titulo: "Inspeção visual",
    texto: "Verifique cabos, conexões e a estrutura de fixação periodicamente.",
  },
  {
    numero: 3,
    titulo: "Monitoramento",
    texto: "Acompanhe a geração de energia para identificar quedas de desempenho cedo.",
  },
];

export default function Manutencao() {
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

      <Link to="/placas" className="servicetype-voltar">
        ← Voltar para Placas Solares
      </Link>
    </div>
  );
}
