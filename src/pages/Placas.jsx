import { Link } from "react-router-dom";
import "./Placas.css";

const tiposDePlaca = [
  {
    id: "monocristalino",
    nome: "Monocristalino",
    eficiencia: "Eficiência: 18% - 22%",
    descricao:
      "Feito de um único cristal de silício. É o mais eficiente e o que ocupa menos espaço no telhado, mas também é o mais caro.",
  },
  {
    id: "policristalino",
    nome: "Policristalino",
    eficiencia: "Eficiência: 15% - 18%",
    descricao:
      "Feito de vários fragmentos de silício fundidos. Custo mais baixo que o monocristalino, com ótimo custo-benefício.",
  },
  {
    id: "filme-fino",
    nome: "Filme Fino",
    eficiencia: "Eficiência: 10% - 13%",
    descricao:
      "Mais leve e flexível, ideal para superfícies irregulares. Exige mais área instalada para gerar a mesma energia.",
  },
];

const categoriasServico = [
  {
    id: "venda",
    titulo: "Comprar",
    icone: "🛒",
    descricao: "Encontre parceiros para adquirir painéis solares novos.",
    rota: "/placas/venda",
  },
  {
    id: "manutencao",
    titulo: "Manutenção",
    icone: "🔧",
    descricao: "Assistência técnica e limpeza para manter a eficiência.",
    rota: "/placas/manutencao",
  },
  {
    id: "descarte",
    titulo: "Descarte & Reciclagem",
    icone: "♻️",
    descricao: "Descarte correto e sustentável de painéis fora de uso.",
    rota: "/placas/descarte",
  },
];

export default function Placas() {
  return (
    <div className="placas-container">
      <section className="placas-header">
        <h2>Placas Solares</h2>
        <p>
          Conheça os principais tipos de painel fotovoltaico e encontre o
          serviço que você precisa.
        </p>
      </section>

      <section className="placas-guia">
        <h3>Tipos de Painel</h3>
        <div className="placas-grid">
          {tiposDePlaca.map((placa) => (
            <div className="placa-card" key={placa.id}>
              <h4>{placa.nome}</h4>
              <span className="placa-eficiencia">{placa.eficiencia}</span>
              <p>{placa.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="placas-servicos">
        <h3>O que você precisa fazer?</h3>
        <div className="servicos-grid">
          {categoriasServico.map((categoria) => (
            <Link
              to={categoria.rota}
              className="servico-card"
              key={categoria.id}
            >
              <span className="servico-icone">{categoria.icone}</span>
              <h4>{categoria.titulo}</h4>
              <p>{categoria.descricao}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}