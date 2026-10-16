import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setCarregando(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_evento, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const entrar = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });
  const sair = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ user, carregando, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);