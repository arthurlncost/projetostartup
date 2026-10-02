// ============================================================
// CALCULADORA DE ENERGIA SOLAR - Eletricitrus
// ============================================================
// Este arquivo é um "componente" React. Pense nele como uma
// função que devolve um pedaço de HTML (na verdade é JSX,
// que é HTML "turbinado" dentro do JavaScript).
// ============================================================

// useState é um "hook" do React. Ele serve para guardar valores
// que podem mudar (ex: o que o usuário digitou) e fazer a tela
// atualizar sozinha sempre que esse valor muda.
import { useState } from "react";
import "./Calculadora.css";

export default function Calculadora() {
  // ----------------------------------------------------------
  // ESTADOS (as "variáveis vivas" da página)
  // ----------------------------------------------------------
  // Cada linha abaixo segue o mesmo padrão:
  //   const [valorAtual, funcaoParaMudarOValor] = useState(valorInicial)
  //
  // Sempre que você chama a "funcaoParaMudarOValor", o React
  // redesenha a tela automaticamente com o novo valor.

  // O que o usuário digita no campo "conta de luz"
  const [contaLuz, setContaLuz] = useState("");

  // Tarifa de energia em R$/kWh (já vem com um valor padrão,
  // mas o usuário pode alterar)
  const [tarifa, setTarifa] = useState("0.75");

  // Vai guardar o resultado do cálculo (começa como null =
  // "ainda não calculei nada")
  const [resultado, setResultado] = useState(null);

  // Guarda mensagem de erro, se o usuário digitar algo inválido
  const [erro, setErro] = useState("");

  // ----------------------------------------------------------
  // FUNÇÃO QUE FAZ O CÁLCULO
  // ----------------------------------------------------------
  // Isso roda quando o usuário clica no botão "Calcular".
  function calcularEconomia() {
    const valorConta = parseFloat(contaLuz);
    const valorTarifa = parseFloat(tarifa);

    // Validação simples: os campos precisam ser números válidos e maiores que zero
    if (!valorConta || valorConta <= 0 || !valorTarifa || valorTarifa <= 0) {
      setErro("Preencha os campos com valores válidos maiores que zero.");
      setResultado(null);
      return; // para a função aqui, não continua o cálculo
    }

    setErro(""); // limpa erro anterior, se houver

    // 1) Quantos kWh a pessoa consome por mês
    //    (valor da conta dividido pelo preço do kWh)
    const consumoMensalKwh = valorConta / valorTarifa;

    // 2) Estimativa de geração de 1 painel solar (450W) no Brasil:
    //    em média, gera cerca de 65 kWh por mês (varia por região/sol)
    const geracaoPorPainelKwh = 65;

    // 3) Quantos painéis seriam necessários para cobrir o consumo
    const painéisNecessarios = Math.ceil(consumoMensalKwh / geracaoPorPainelKwh);

    // 4) Área aproximada no telhado (cada painel ocupa ~2,5 m²)
    const areaNecessaria = (painéisNecessarios * 2.5).toFixed(1);

    // 5) Economia estimada: modelo de energia solar por assinatura
    //    costuma gerar entre 15% e 20% de desconto na conta.
    //    Vamos usar 18% como estimativa média.
    const percentualEconomia = 0.18;
    const economiaMensal = (valorConta * percentualEconomia).toFixed(2);
    const economiaAnual = (economiaMensal * 12).toFixed(2);

    // Guarda tudo isso em "resultado", o que faz a tela mostrar
    // a seção de resultados automaticamente (veja o JSX abaixo)
    setResultado({
      consumoMensalKwh: consumoMensalKwh.toFixed(0),
      painéisNecessarios,
      areaNecessaria,
      economiaMensal,
      economiaAnual,
    });
  }

  // ----------------------------------------------------------
  // O QUE APARECE NA TELA (JSX)
  // ----------------------------------------------------------
  return (
    <div className="calculadora-container">
      <div className="calculadora-card">
        <h2>Calculadora de Economia Solar</h2>
        <p className="calculadora-descricao">
          Descubra quanto você pode economizar e quantos painéis solares
          seriam necessários para o seu consumo.
        </p>

        {/* Campo: valor da conta de luz */}
        <div className="input-group">
          <label>Valor médio da sua conta de luz (R$)</label>
          <input
            type="number"
            placeholder="Ex: 250"
            value={contaLuz}
            // onChange dispara toda vez que o usuário digita algo
            onChange={(e) => setContaLuz(e.target.value)}
          />
        </div>

        {/* Campo: tarifa de energia */}
        <div className="input-group">
          <label>Tarifa da sua distribuidora (R$/kWh)</label>
          <input
            type="number"
            step="0.01"
            placeholder="Ex: 0.75"
            value={tarifa}
            onChange={(e) => setTarifa(e.target.value)}
          />
          <span className="input-dica">
            Não sabe o valor? R$ 0,75 é uma média nacional razoável.
          </span>
        </div>

        <button className="calcular-btn" onClick={calcularEconomia}>
          Calcular
        </button>

        {/* Só mostra a mensagem de erro SE existir erro */}
        {erro && <p className="calculadora-erro">{erro}</p>}

        {/* Só mostra os resultados SE "resultado" não for null */}
        {resultado && (
          <div className="resultado-card">
            <h3>Sua estimativa:</h3>

            <div className="resultado-item">
              <span>Consumo mensal estimado:</span>
              <strong>{resultado.consumoMensalKwh} kWh</strong>
            </div>

            <div className="resultado-item">
              <span>Painéis solares necessários:</span>
              <strong>{resultado.painéisNecessarios} painéis</strong>
            </div>

            <div className="resultado-item">
              <span>Área aproximada no telhado:</span>
              <strong>{resultado.areaNecessaria} m²</strong>
            </div>

            <div className="resultado-item destaque">
              <span>Economia mensal estimada:</span>
              <strong>R$ {resultado.economiaMensal}</strong>
            </div>

            <div className="resultado-item destaque">
              <span>Economia anual estimada:</span>
              <strong>R$ {resultado.economiaAnual}</strong>
            </div>

            <p className="resultado-aviso">
              * Valores aproximados para fins ilustrativos. A economia real
              depende da irradiação solar da sua região, do tipo de sistema
              contratado e das condições do imóvel.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}