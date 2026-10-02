import { Link } from "react-router-dom";
import "./Fazendas.css";

// ----------------------------------------------------------
// LISTA DE FAZENDAS/PARCEIRAS
// ----------------------------------------------------------
// Em vez de escrever 5 cards repetidos no JSX, guardamos os
// dados aqui num array. Depois usamos .map() para transformar
// cada item desse array em um card na tela.
//
// >>> Ajuste os textos, imagens e "rota" conforme a realidade
// de cada parceira. Troque "imagem" pelo caminho real do logo
// (ex: "/imagens/parceiros/edp.png") quando tiver os arquivos.
const fazendas = [
  {
    id: "edp",
    nome: "EDP Soluções",
    localizacao: "São Paulo, SP",
    descricao:
      "Fazenda solar parceira com grande capacidade de geração, ideal para quem busca uma distribuidora consolidada no mercado.",
    imagem: "/imagens/parceiros/edp.png",
    rota: "/partners/edpsolucoes",
  },
  {
    id: "enerlivre",
    nome: "Enerlivre",
    localizacao: "Campinas, SP",
    descricao:
      "Focada em energia limpa acessível, com planos flexíveis de assinatura para residências e pequenas empresas.",
    imagem: "/imagens/parceiros/enerlivre.png",
    rota: "/partners/enerlivre",
  },
  {
    id: "evosolar",
    nome: "Evosolar",
    localizacao: "Sorocaba, SP",
    descricao:
      "Fazenda solar com tecnologia de ponta em painéis fotovoltaicos e monitoramento em tempo real da geração.",
    imagem: "/imagens/parceiros/evosolar.png",
    rota: "/partners/evosolar",
  },
  {
    id: "sunmobi",
    nome: "Sunmobi",
    localizacao: "Jundiaí, SP",
    descricao:
      "Modelo simplificado de adesão, pensado para quem quer economizar sem burocracia e com atendimento próximo.",
    imagem: "/imagens/parceiros/sunmobi.png",
    rota: "/partners/sunmobi",
  },
  {
    id: "sunnyhub",
    nome: "Sunnyhub",
    localizacao: "Itu, SP",
    descricao:
      "Uma das maiores capacidades instaladas da região, com foco em sustentabilidade e transparência nos créditos gerados.",
    imagem: "/imagens/parceiros/sunnyhub.png",
    rota: "/partners/sunnyhub",
  },
];

export default function Fazendas() {
  return (
    <div className="fazendas-container">
      <section className="fazendas-header">
        <h2>Fazendas Solares Parceiras</h2>
        <p>
          Conheça as fazendas solares conectadas ao Eletricitrus e descubra
          qual combina melhor com o seu consumo de energia.
        </p>
      </section>

      {/* GRID DE CARDS
          ------------------------------------------------------
          fazendas.map(...) percorre CADA item do array "fazendas"
          lá em cima e devolve um <div className="fazenda-card">
          para cada um. É assim que 1 array de 5 itens vira
          5 cards na tela, sem repetir código.
          
          "key={fazenda.id}" é obrigatório no React sempre que
          você gera uma lista de elementos - ajuda o React a
          saber qual card é qual quando algo muda na lista.
      */}
      <div className="fazendas-grid">
        {fazendas.map((fazenda) => (
          <div className="fazenda-card" key={fazenda.id}>
            <div className="fazenda-imagem">
              <img src={fazenda.imagem} alt={`Logo ${fazenda.nome}`} />
            </div>

            <div className="fazenda-info">
              <h3>{fazenda.nome}</h3>
              <span className="fazenda-local">📍 {fazenda.localizacao}</span>
              <p>{fazenda.descricao}</p>

              {/* Link dinâmico: cada card aponta para a rota
                  específica daquela parceira (fazenda.rota) */}
              <Link to={fazenda.rota} className="fazenda-btn">
                Saiba mais
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
