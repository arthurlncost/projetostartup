import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import './Placas.css';

const tiposDePlaca = [
  {
    id: 'monocristalino',
    nome: 'Monocristalino',
    eficiencia: 'Eficiência típica: 18%–22%',
    descricao: 'Produzido com silício de alta pureza. Costuma oferecer maior eficiência e ocupar menos espaço, sendo uma opção bastante utilizada em residências.',
  },
  {
    id: 'policristalino',
    nome: 'Policristalino',
    eficiencia: 'Eficiência típica: 15%–18%',
    descricao: 'Fabricado a partir de vários cristais de silício. Pode ser uma alternativa com bom custo-benefício, dependendo do projeto e da disponibilidade.',
  },
  {
    id: 'filme-fino',
    nome: 'Filme fino',
    eficiencia: 'Eficiência típica: 10%–13%',
    descricao: 'Tecnologia mais leve e que pode ser flexível. Em geral, precisa de uma área maior para entregar a mesma geração de energia.',
  },
];

const categoriasServico = [
  { id: 'venda', titulo: 'Comprar', icone: '🛒', descricao: 'Encontre empresas que anunciam placas e equipamentos solares.', rota: '/placas/venda' },
  { id: 'manutencao', titulo: 'Manutenção', icone: '🔧', descricao: 'Encontre assistência técnica e serviços de limpeza.', rota: '/placas/manutencao' },
  { id: 'descarte', titulo: 'Descarte & reciclagem', icone: '♻️', descricao: 'Saiba como encaminhar painéis fora de uso corretamente.', rota: '/placas/descarte' },
];

function formatarPreco(valor) {
  return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function Placas() {
  const [anuncios, setAnuncios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    let ativo = true;
    async function carregarAnuncios() {
      const { data, error } = await supabase
        .from('anuncios')
        .select('id, titulo, descricao, cidade, preco, imagens, empresas(nome)')
        .eq('categoria', 'placa')
        .eq('ativo', true)
        .order('criado_em', { ascending: false });

      if (!ativo) return;
      if (error) setErro('Não foi possível carregar os anúncios agora. Tente novamente mais tarde.');
      else setAnuncios(data ?? []);
      setCarregando(false);
    }
    carregarAnuncios();
    return () => { ativo = false; };
  }, []);

  return (
    <main className="placas-container">
      <section className="placas-header">
        <span className="placas-etiqueta">Energia solar</span>
        <h1>Placas solares</h1>
        <p>Conheça as tecnologias, encontre serviços e veja anúncios publicados pelas empresas parceiras do Eletricitrus.</p>
        <Link to="/calculadora" className="placas-cta">Calcular meu potencial solar →</Link>
      </section>

      <section className="placas-guia">
        <h2>Conheça os tipos de painel</h2>
        <div className="placas-grid">
          {tiposDePlaca.map((placa) => (
            <article className="placa-card" key={placa.id}>
              <h3>{placa.nome}</h3>
              <span className="placa-eficiencia">{placa.eficiencia}</span>
              <p>{placa.descricao}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="placas-servicos">
        <h2>O que você procura?</h2>
        <div className="servicos-grid">
          {categoriasServico.map((categoria) => (
            <Link to={categoria.rota} className="servico-card" key={categoria.id}>
              <span className="servico-icone" aria-hidden="true">{categoria.icone}</span>
              <h3>{categoria.titulo}</h3>
              <p>{categoria.descricao}</p>
              <span className="servico-saiba">Acessar →</span>
            </Link>
          ))}
        </div>
      </section>

    
    </main>
  );
}
