import { useState } from "react";
import { buscarCep } from "../services/viacep";
import { buscarCoordenadas } from "../services/geocoding";
import { supabase } from "../services/supabase";
import "./Servicos.css";

export default function Servicos() {

  const [cep, setCep] = useState(""); //guarda oq a pessoa digitou 
  const [endereco, setEndereco] = useState(null); //guara oq a api devolvelu
  const [erro, setErro] = useState("");//guarda a m ensagem de erro 

  async function consultarCep() {
    try {//tenta fazer isso
      const dados = await buscarCep(cep);
      const coordenadas = await buscarCoordenadas(dados.localidade, dados.uf);

      console.log(coordenadas)// nn mostramos as cordenadas pq são inuteis para o usuario, elas são uteis para a proxima api

      setEndereco(dados);
      setErro("");

    } catch (erro) {
      setEndereco(null);
      setErro(erro.message);
    }
  }
  
  return (
  <div className="servicos-container">

    <div className="servicos-card">

      <h2>Serviços e Localização via CEP</h2>

      <p className="servicos-descricao">
        Encontre fazendas, lojas e pontos de descarte próximos de si.
      </p>

      <div className="cep-busca">

        <input
          type="text"
          placeholder="Digite seu CEP"
          value={cep} //React, o valor mostrado dentro desse input é o que estiver guardado em cep
          onChange={(e) => setCep(e.target.value)} // busca toda vez q o usuario troca o input, cada numero do cep
        />

        <button onClick={consultarCep}>
          Buscar CEP
        </button>
        

      </div>

      {erro && (
        <p className="cep-erro">{erro}</p>
      )}

      {endereco && ( //Só mostre esse HTML SE existir um endereço.
        <div className="endereco-card">

          <h3>Endereço encontrado:</h3>

          <p>Rua: {endereco.logradouro}</p>

          <p>Bairro: {endereco.bairro}</p>

          <p>Cidade: {endereco.localidade}</p>

          <p>Estado: {endereco.uf}</p>

        </div>
      )}

    </div>

  </div>
);
}
//RESUMO
/*CEP correto
→ endereço aparece
→ erro fica vazio

CEP errado
→ endereço desaparece
→ mensagem de erro aparece

Fluxo:
Usuário digita o CEP
  ↓
ViaCEP
  ↓
Cidade + Estado
 ↓
Geocoding
 ↓
Latitude + Longitude */