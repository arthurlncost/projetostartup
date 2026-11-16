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
import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { buscarIrradiacaoSolar } from "../services/irradiacaoSolar";
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
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [consultandoSol, setConsultandoSol] = useState(false);

  // Vai guardar o resultado do cálculo (começa como null =
  // "ainda não calculei nada")
  const [resultado, setResultado] = useState(null);

  // Guarda mensagem de erro, se o usuário digitar algo inválido
  const [erro, setErro] = useState("");

  const { user } = useAuth();
  const [mensagemSalvo, setMensagemSalvo] = useState("");
  const [historico, setHistorico] = useState([]);

  // ----------------------------------------------------------
  // FUNÇÃO QUE FAZ O CÁLCULO
  // ----------------------------------------------------------
  // Isso roda quando o usuário clica no botão "Calcular".
  async function calcularEconomia() {
    const valorConta = Number.parseFloat(contaLuz);
    const valorTarifa = Number.parseFloat(tarifa);

    if (!Number.isFinite(valorConta) || valorConta <= 0 || !Number.isFinite(valorTarifa) || valorTarifa <= 0) {
      setErro("Preencha a conta de luz e a tarifa com valores maiores que zero.");
      setResultado(null);
      return;
    }
    if (!cidade.trim() || !estado.trim()) {
      setErro("Informe sua cidade e seu estado para calcular a incidência solar.");
      setResultado(null);
      return;
    }

    setErro("");
    setMensagemSalvo("");
    setConsultandoSol(true);

    try {
      const dadosSol = await buscarIrradiacaoSolar(cidade.trim(), estado.trim());
      const consumoMensalKwh = valorConta / valorTarifa;
      // Potência do painel (450 W) × horas de sol pico × dias × rendimento do sistema.
      const potenciaPainelKw = 0.45;
      const fatorDesempenho = 0.8;
      const geracaoPorPainelKwh = potenciaPainelKw * dadosSol.irradiacao * 30 * fatorDesempenho;
      const paineisNecessarios = Math.ceil(consumoMensalKwh / geracaoPorPainelKwh);
      const areaNecessaria = (paineisNecessarios * 2.5).toFixed(1);
      const percentualEconomia = 0.18;
      const economiaMensal = (valorConta * percentualEconomia).toFixed(2);
      const economiaAnual = (Number(economiaMensal) * 12).toFixed(2);

      setResultado({
        consumoMensalKwh: consumoMensalKwh.toFixed(0),
        paineisNecessarios,
        areaNecessaria,
        economiaMensal,
        economiaAnual,
        irradiacao: dadosSol.irradiacao.toFixed(2),
        geracaoPorPainel: geracaoPorPainelKwh.toFixed(1),
        localizacao: `${cidade.trim()} - ${estado.trim().toUpperCase()}`,
      });
    } catch (error) {
      setErro(error.message || "Não foi possível consultar a incidência solar. Confira a cidade e tente novamente.");
      setResultado(null);
    } finally {
      setConsultandoSol(false);
    }
  }
  async function salvarSimulacao() {
    const { error } = await supabase.from("simulacoes").insert({
    conta_luz: parseFloat(contaLuz),
    tarifa: parseFloat(tarifa),
    consumo_kwh: Number(resultado.consumoMensalKwh),
    paineis: resultado.paineisNecessarios,
    economia_mensal: Number(resultado.economiaMensal),
    economia_anual: Number(resultado.economiaAnual),
  });

  if (error) {
    setMensagemSalvo("Não foi possível salvar: " + error.message);
    return;
  }
  setMensagemSalvo("Simulação salva!");
  carregarHistorico();
  }   

  async function carregarHistorico() {
  const { data, error } = await supabase
    .from("simulacoes")
    .select("*")
    .order("criado_em", { ascending: false })
    .limit(5);

  if (!error) setHistorico(data);
}

  useEffect(() => {
    if (user) {
      carregarHistorico();
    } else {
     setHistorico([]);
    }
  }, [user]);
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

        <div className="input-group">
          <label htmlFor="cidade-solar">Cidade</label>
          <input
            id="cidade-solar"
            type="text"
            placeholder="Ex: Sorocaba"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            autoComplete="address-level2"
          />
        </div>

        <div className="input-group">
          <label htmlFor="estado-solar">Estado (UF)</label>
          <input
            id="estado-solar"
            type="text"
            placeholder="Ex: SP"
            value={estado}
            onChange={(e) => setEstado(e.target.value.toUpperCase().slice(0, 2))}
            maxLength={2}
            autoComplete="address-level1"
          />
          <span className="input-dica">Usaremos a média histórica de irradiação solar da região.</span>
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

        <button className="calcular-btn" onClick={calcularEconomia} disabled={consultandoSol}>
          {consultandoSol ? "Consultando incidência solar..." : "Calcular"}
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
              <strong>{resultado.paineisNecessarios} painéis</strong>
            </div>

            <div className="resultado-item">
              <span>Localização considerada:</span>
              <strong>{resultado.localizacao}</strong>
            </div>

            <div className="resultado-item">
              <span>Irradiação solar média:</span>
              <strong>{resultado.irradiacao} kWh/m²/dia</strong>
            </div>

            <div className="resultado-item">
              <span>Geração estimada por painel (450 W):</span>
              <strong>{resultado.geracaoPorPainel} kWh/mês</strong>
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
            
             {user ? (
              <button className="calcular-btn" onClick={salvarSimulacao}>
                Salvar simulação
              </button>
            ) : (
             <Link to="/login" className="calcular-btn calcular-btn-link">
              Entre para salvar esta simulação
             </Link>
            )}
          {mensagemSalvo && <p>{mensagemSalvo}</p>}
            <p className="resultado-aviso">
              * Valores aproximados para fins ilustrativos. A economia real
              estimativa baseada na climatologia da NASA POWER, em painel de 450 W
              e fator de desempenho de 80%. O resultado real varia com inclinação,
              orientação, sombras, clima e perdas do sistema. A economia de 18% é
              uma referência ilustrativa, não uma proposta comercial.
            </p>
          </div>
        )}
        {user && historico.length > 0 && (
          <div className="resultado-card">
            <h3>Suas simulações anteriores</h3>

            {historico.map((sim) => (
              <div className="resultado-item" key={sim.id}>
                <span>
                  {new Date(sim.criado_em).toLocaleDateString("pt-BR")} · conta de R$ {sim.conta_luz}
                </span>
                <strong>
                  {sim.paineis} painéis · R$ {Number(sim.economia_mensal).toFixed(2)}/mês
                </strong>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}