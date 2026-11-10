import { Link } from 'react-router-dom';
import Mascote from '../components/Mascote';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <Mascote tipo="pedreiro" largura={140} alt="Solzinho Eletricitrus" />
        <h2 className="notfound-title">Ops! Página Não Encontrada</h2>
        <p className="notfound-text">
          Parece que o Solzinho procurou por todos os cantos, mas a página que você estava tentando acessar sumiu do mapa. Não se preocupe, vamos te guiar de volta para a luz!        </p>
        <Link to="/" className="notfound-btn">
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
}