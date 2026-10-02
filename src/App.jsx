import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AssistenteMascote from './components/AssistenteMascote';

// Importação das páginas
import Home from './pages/Home';
import Calculadora from './pages/Calculadora';
import Fazendas from './pages/Fazendas';
import Servicos from './pages/Servicos';
import Placas from './pages/Placas';
import Faq from './pages/Faq';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import NotFound from './pages/NotFound';
import EdpSolucoes from './pages/partners/edpSolucoes';
import Enerlivre from './pages/partners/Enerlivre';
import Evosolar from './pages/partners/Evosolar';
import Sunmobi from './pages/partners/Sunmobi';
import Sunnyhub from './pages/partners/Sunnyhub';
import Descarte from './pages/servicetypes/Descarte';
import Vendas from './pages/servicetypes/Vendas';
import Manutencao from './pages/servicetypes/Manutencao';
import CadastroEmpresa from './pages/CadastroEmpresa';

import './App.css'; 

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculadora" element={<Calculadora />} />
          <Route path="/fazendas" element={<Fazendas />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/placas" element={<Placas />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registo" element={<Cadastro />} />

          <Route path="/partners/edpsolucoes" element={<EdpSolucoes />} />
          <Route path="/partners/enerlivre" element={<Enerlivre />} />
          <Route path="/partners/evosolar" element={<Evosolar />} />
          <Route path="/partners/sunmobi" element={<Sunmobi />} />
          <Route path="/partners/sunnyhub" element={<Sunnyhub />} />

          <Route path="/placas/venda" element={<Vendas />} />
          <Route path="/placas/manutencao" element={<Manutencao />} />
          <Route path="/placas/descarte" element={<Descarte />} />
          <Route path="/cadastro-empresa" element={<CadastroEmpresa />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {/* O mascote inteligente adicionado aqui*/}
      <AssistenteMascote /> 
      
    </BrowserRouter>
  );
}