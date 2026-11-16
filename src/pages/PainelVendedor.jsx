import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabase';
import './PainelVendedor.css';

const CATEGORIAS = {
  placa: 'Placa',
  fazenda: 'Fazenda',
  manutencao: 'Manutenção',
  descarte: 'Descarte',
};

const FORM_VAZIO = {
  titulo: '', categoria: 'placa', cidade: '', preco: '', descricao: ''
};

export default function PainelVendedor() {
  const { user } = useAuth();
  const nome = user?.user_metadata?.nome || user?.email;

  const [anuncios, setAnuncios] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [formData, setFormData] = useState(FORM_VAZIO);
  const [editandoId, setEditandoId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((anterior) => ({ ...anterior, [name]: value }));
  };

  async function carregarAnuncios() {
    const { data, error } = await supabase
      .from('anuncios')
      .select('*')
      .eq('user_id', user.id)
      .order('criado_em', { ascending: false });

    if (!error) setAnuncios(data);
  }

  useEffect(() => {
    if (user) carregarAnuncios();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    const preco = parseFloat(formData.preco.replace(',', '.'));

    const dados = {
      titulo: formData.titulo,
      categoria: formData.categoria,
      descricao: formData.descricao,
      cidade: formData.cidade,
      preco: isNaN(preco) ? null : preco,
    };

    const { error } = editandoId
      ? await supabase.from('anuncios').update(dados).eq('id', editandoId)
      : await supabase.from('anuncios').insert(dados);

    if (error) {
      setMensagem('Não foi possível salvar: ' + error.message);
      return;
    }

    setMensagem(editandoId ? 'Anúncio atualizado!' : 'Anúncio publicado!');
    setFormData(FORM_VAZIO);
    setEditandoId(null);
    carregarAnuncios();
  };

  function iniciarEdicao(a) {
    setEditandoId(a.id);
    setFormData({
      titulo: a.titulo,
      categoria: a.categoria,
      cidade: a.cidade ?? '',
      preco: a.preco != null ? String(a.preco).replace('.', ',') : '',
      descricao: a.descricao ?? '',
    });
    setMensagem('');
    document.getElementById('novo-anuncio')?.scrollIntoView({ behavior: 'smooth' });
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setFormData(FORM_VAZIO);
    setMensagem('');
  }

  async function apagarAnuncio(id) {
    if (!window.confirm('Apagar este anúncio?')) return;

    const { error } = await supabase.from('anuncios').delete().eq('id', id);

    if (error) {
      setMensagem('Não foi possível apagar: ' + error.message);
      return;
    }
    carregarAnuncios();
  }

  async function alternarStatus(a) {
    const { error } = await supabase
      .from('anuncios')
      .update({ ativo: !a.ativo })
      .eq('id', a.id);

    if (!error) carregarAnuncios();
  }

  return (
    <main className="vendedor">
      <header className="vendedor-topo">
        <div>
          <h1>Olá, {nome}</h1>
          <p>Estes são os seus anúncios no Eletricitrus.</p>
        </div>
        <a href="#novo-anuncio" className="vendedor-btn">Novo anúncio</a>
      </header>

      <div className="vendedor-grade">
        <section className="vendedor-lista" aria-label="Seus anúncios">
          {anuncios.length === 0 ? (
            <div className="vendedor-vazio">
              <h2>Você ainda não tem anúncios</h2>
              <p>Preencha o formulário ao lado para publicar o primeiro.</p>
            </div>
          ) : (
            <div className="vendedor-tabela-wrap">
              <table className="vendedor-tabela">
                <thead>
                  <tr>
                    <th>Anúncio</th>
                    <th>Categoria</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {anuncios.map((a) => {
                    const status = a.ativo ? 'Ativo' : 'Pausado';
                    return (
                      <tr key={a.id}>
                        <td><strong>{a.titulo}</strong></td>
                        <td>{CATEGORIAS[a.categoria]}</td>
                        <td>
                          <span className={`vendedor-status status-${status.toLowerCase()}`}>
                            {status}
                          </span>
                        </td>
                        <td>
                          <div className="vendedor-acoes">
                            <button type="button" className="vendedor-btn-pequeno" onClick={() => iniciarEdicao(a)}>Editar</button>
                            <button type="button" className="vendedor-btn-pequeno" onClick={() => alternarStatus(a)}>
                              {a.ativo ? 'Pausar' : 'Ativar'}
                            </button>
                            <button type="button" className="vendedor-btn-pequeno" onClick={() => apagarAnuncio(a.id)}>Apagar</button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <aside className="vendedor-form" id="novo-anuncio">
          <h2>{editandoId ? 'Editar anúncio' : 'Novo anúncio'}</h2>
          <p>{editandoId ? 'Altere os campos e salve.' : 'Preencha e publique em um minuto.'}</p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="titulo">Título</label>
            <input id="titulo" name="titulo" type="text" value={formData.titulo} onChange={handleChange} required />

            <label htmlFor="categoria">Categoria</label>
            <select id="categoria" name="categoria" value={formData.categoria} onChange={handleChange}>
              <option value="placa">Placa</option>
              <option value="fazenda">Fazenda</option>
              <option value="manutencao">Manutenção</option>
              <option value="descarte">Descarte</option>
            </select>

            <label htmlFor="cidade">Cidade e CEP</label>
            <input id="cidade" name="cidade" type="text" value={formData.cidade} onChange={handleChange} />

            <label htmlFor="preco">Preço (opcional)</label>
            <input id="preco" name="preco" type="text" value={formData.preco} onChange={handleChange} />

            <label htmlFor="descricao">Descrição</label>
            <textarea id="descricao" name="descricao" rows="4" value={formData.descricao} onChange={handleChange} />

            {mensagem && <p className="vendedor-mensagem">{mensagem}</p>}

            <button type="submit" className="vendedor-btn vendedor-btn-cheio">
              {editandoId ? 'Salvar alterações' : 'Publicar anúncio'}
            </button>

            {editandoId && (
              <button type="button" className="vendedor-btn-cancelar" onClick={cancelarEdicao}>
                Cancelar edição
              </button>
            )}
          </form>
        </aside>
      </div>
    </main>
  );
}