import { useState } from "react";
import "./Faq.css";

const perguntas = [
  {
    id: "1",
    pergunta: "Como funciona a energia solar por assinatura?",
    resposta:
      "Você se conecta a uma fazenda solar parceira sem instalar nada no seu telhado. A energia gerada é injetada na rede e vira créditos que abatem sua conta de luz.",
  },
  {
    id: "2",
    pergunta: "Preciso instalar painéis na minha casa?",
    resposta:
      "Não. O modelo de assinatura conecta você a uma fazenda solar já existente. Se preferir instalar painéis próprios, confira nossa página de Placas Solares.",
  },
  {
    id: "3",
    pergunta: "Como sei quanto vou economizar?",
    resposta:
      "Use a nossa Calculadora de Economia Solar: informe o valor da sua conta e a tarifa da distribuidora para ver uma estimativa personalizada.",
  },
  {
    id: "4",
    pergunta: "Existe fidelidade ou multa por cancelamento?",
    resposta:
      "As condições variam de acordo com cada fazenda solar parceira. Consulte os detalhes diretamente na página da parceira escolhida.",
  },
  {
    id: "5",
    pergunta: "Preciso trocar de distribuidora de energia?",
    resposta:
      "Não. Você continua recebendo energia da sua distribuidora local normalmente, apenas com os créditos da fazenda solar abatidos na fatura.",
  },
  {
    id: "6",
    pergunta: "Como faço para me cadastrar?",
    resposta:
      "Clique em 'Entrar' no menu superior e depois em 'Registe-se aqui' para criar sua conta gratuita no Eletricitrus.",
  },
];

export default function Faq() {
  const [abertoId, setAbertoId] = useState(null);

  function alternarPergunta(id) {
    setAbertoId(abertoId === id ? null : id);
  }

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h2>Perguntas Frequentes</h2>
        <p>Tire suas dúvidas sobre energia solar e o Eletricitrus.</p>
      </div>

      <div className="faq-lista">
        {perguntas.map((item) => (
          <div className="faq-item" key={item.id}>
            <button
              className="faq-pergunta"
              onClick={() => alternarPergunta(item.id)}
            >
              <span>{item.pergunta}</span>
              <span className={`faq-icone ${abertoId === item.id ? "aberto" : ""}`}>
                +
              </span>
            </button>

            {abertoId === item.id && (
              <div className="faq-resposta">
                <p>{item.resposta}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
