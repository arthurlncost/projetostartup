import React, { useState, useEffect } from 'react';

export default function Mascote({ tipo = 'padrao', largura = 120, alt = 'Solzinho Eletricitrus', mensagem }) {
  const [mostrarBalao, setMostrarBalao] = useState(true);
  const [tipoAtual, setTipoAtual] = useState(tipo); // Controla a imagem exibida

  // Mapeamento das imagens
  const fotos = {
    padrao: '/imagens/sol.png',
    logo: '/logo.png',
    coracao: '/imagens/solCoracaoplaquinh.png',
    pedreiro: '/imagens/solPedreiro.png',
    pensador: '/imagens/solFilosofo.png',
    carregando: '/imagens/solPlaca.png',
    inventor: '/imagens/solEdson.png'
  };

  // Garante que a imagem e o balão reiniciam se o 'tipo' mudar (ex: mudar de página)
  useEffect(() => {
    setTipoAtual(tipo);
    setMostrarBalao(true);
  }, [tipo]);

  const handleFechar = () => {
    setMostrarBalao(false); // Esconde o balão
    setTipoAtual('padrao'); // Muda a imagem para '/imagens/sol.png' (podes trocar para 'logo' se preferires)
  };

  const caminhoImagem = fotos[tipoAtual] || fotos.padrao;

  return (
    <div className="mascote-container">
      {/* O balão só aparece se receberes texto na propriedade 'mensagem' E não estiver fechado */}
      {mensagem && mostrarBalao && (
        <div className="mascote-balao">
          <button 
            className="mascote-fechar-btn" 
            onClick={handleFechar}
            aria-label="Fechar"
          >
            &times;
          </button>
          <p>{mensagem}</p>
        </div>
      )}

      <img 
        src={caminhoImagem} 
        alt={alt} 
        style={{ width: `${largura}px`, height: 'auto', objectFit: 'contain' }} 
      />
    </div>
  );
}