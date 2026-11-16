import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RotaProtegida({ children, tipo: tipoExigido }) { //"Segurança, aqui está a página que quero acessar. Veja se pode liberar."
  const { user, tipo, carregando } = useAuth();

  // o Supabase ainda está checando se existe sessão salva
  if (carregando) return <p>Carregando...</p>;

  // ninguém logado: volta pro login
  if (!user) return <Navigate to="/login" replace />;


  // a página exige um tipo e a conta é de outro: manda pro painel dela
  if (tipoExigido && tipo !== tipoExigido) {
    return <Navigate to={tipo === 'vendedor' ? '/vendedor' : '/painel'} replace />;
  }


  // logado: mostra a página que está dentro dele
  return children;
}