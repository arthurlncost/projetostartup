import { useLocation } from 'react-router-dom';
import Mascote from './Mascote';

export default function AssistenteMascote() {
  const location = useLocation();

  // 1. páginas oficiais onde o assistente deve aparecer
  const rotasValidas = [
    '/', 
    '/calculadora', 
    '/placas', 
    '/fazendas', 
    '/servicos', 
    '/faq', 
    '/login'
  ];

  // 2. Se a rota não estiver na lista (é a página 404), ele não renderiza nada!
  if (!rotasValidas.includes(location.pathname)) {
    return null; 
  }

  let mensagem = "";
  let tipoMascote = "padrao";

  switch (location.pathname) {
    case '/':
      mensagem = "Bem-vindo ao Eletricitrus! Bora entender a energia solar e espremer essa sua conta de luz?";
      tipoMascote = "padrao";
      break;
    case '/calculadora':
      mensagem = "Preencha o seu consumo e descubra o quanto pode economizar!";
      tipoMascote = "padrao";
      break;
    case '/placas':
      mensagem = "Ai, as minhas costas... eu não sou esse tipo de carregador! Melhor deixar isso para os nossos parceiros especializados.";
      tipoMascote = "carregando";
      break;
    case '/fazendas':
      mensagem = "Descubra as fazendas solares parceiras na sua região.";
      tipoMascote = "padrao";
      break;
    case '/servicos':
      mensagem = "Digite o seu CEP para verificar a disponibilidade.";
      tipoMascote = "padrao";
      break;
    case '/faq':
      mensagem = "Tem alguma dúvida? Manda para mim.";
      tipoMascote = "inventor";
      break;
    case '/login':
      mensagem = "Faça login para salvar o seu histórico de simulações e ter acesso a funções mais práticas.";
      tipoMascote = "padrao";
      break;
  }


  return (
    <div className="mascote-fixo-container">
      <div className="mascote-balao">
        {mensagem}
      </div>
      {/* Já com a largura ajustada para 120 para ficar maiorzinho */}
      <Mascote tipo={tipoMascote} largura={105} alt="Assistente Solzinho" /> 
    </div>
  );
}