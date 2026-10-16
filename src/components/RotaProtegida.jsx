import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RotaProtegida({ children }) { //"Segurança, aqui está a página que quero acessar. Veja se pode liberar."
  const { user, carregando } = useAuth();

  // o Supabase ainda está checando se existe sessão salva
  if (carregando) return <p>Carregando...</p>;

  // ninguém logado: volta pro login
  if (!user) return <Navigate to="/login" replace />;

  // logado: mostra a página que está dentro dele
  return children;
}