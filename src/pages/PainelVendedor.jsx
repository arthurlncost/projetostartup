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

const BUCKET_IMAGENS = 'anuncios-imagens';
const MAX_IMAGENS = 5;
const TAMANHO_MAXIMO = 5 * 1024 * 1024;

export default function PainelVendedor() {
  const { user } = useAuth();
  const nome = user?.user_metadata?.nome || user?.email;

  const [anuncios, setAnuncios] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [formData, setFormData] = useState(FORM_VAZIO);
  const [editandoId, setEditandoId] = useState(null);
  const [imagensExistentes, setImagensExistentes] = useState([]);
  const [arquivosNovos, setArquivosNovos] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [salvando, setSalvando] = useState(false);
  const [confirmandoId, setConfirmandoId] = useState(null);

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

  function selecionarImagens(event) {
    const selecionadas = Array.from(event.target.files ?? []);
    const total = imagensExistentes.length + arquivosNovos.length + selecionadas.length;

    if (total > MAX_IMAGENS) {
      setMensagem(`Você pode adicionar no máximo ${MAX_IMAGENS} imagens por anúncio.`);
      event.target.value = '';
      return;
    }
    const invalida = selecionadas.find((arquivo) => !arquivo.type.startsWith('image/') || arquivo.size > TAMANHO_MAXIMO);
    if (invalida) {
      setMensagem('Escolha imagens de até 5 MB cada (JPG, PNG ou WEBP).');
      event.target.value = '';
      return;
    }

    setArquivosNovos((atuais) => [...atuais, ...selecionadas]);
    setPreviews((atuais) => [...atuais, ...selecionadas.map((arquivo) => URL.createObjectURL(arquivo))]);
    setMensagem('');
    event.target.value = '';
  }

  function limparPreviews() {
    previews.forEach((url) => URL.revokeObjectURL(url));
  }

  function removerImagemNova(indice) {
    URL.revokeObjectURL(previews[indice]);
    setArquivosNovos((atuais) => atuais.filter((_, i) => i !== indice));
    setPreviews((atuais) => atuais.filter((_, i) => i !== indice));
  }

  function removerImagemExistente(url) {
    setImagensExistentes((atuais) => atuais.filter((imagem) => imagem !== url));
  }

  async function enviarImagens(anuncioId) {
    const enviadas = [];
    for (const arquivo of arquivosNovos) {
      const extensao = arquivo.name.split('.').pop()?.toLowerCase() || 'jpg';
      const caminho = `${user.id}/${anuncioId}/${crypto.randomUUID()}.${extensao}`;
      const { error } = await supabase.storage.from(BUCKET_IMAGENS).upload(caminho, arquivo, {
        cacheControl: '3600', upsert: false, contentType: arquivo.type,
      });
      if (error) throw error;
      const { data } = supabase.storage.from(BUCKET_IMAGENS).getPublicUrl(caminho);
      enviadas.push(data.publicUrl);
    }
    return enviadas;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setSalvando(true);

    try {
      const preco = Number.parseFloat(formData.preco.replace(',', '.'));
      const dados = {
        titulo: formData.titulo,
        categoria: formData.categoria,
        descricao: formData.descricao,
        cidade: formData.cidade,
        preco: Number.isNaN(preco) ? null : preco,
        imagens: imagensExistentes,
        user_id: user.id,
      };

      let anuncioId = editandoId;
      if (editandoId) {
        const { error } = await supabase.from('anuncios').update(dados).eq('id', editandoId).eq('user_id', user.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.from('anuncios').insert(dados).select('id').single();
        if (error) throw error;
        anuncioId = data.id;
      }

      const novasUrls = await enviarImagens(anuncioId);
      const todasImagens = [...imagensExistentes, ...novasUrls];
      if (novasUrls.length) {
        const { error } = await supabase.from('anuncios').update({ imagens: todasImagens }).eq('id', anuncioId).eq('user_id', user.id);
        if (error) throw error;
      }

      setMensagem(editandoId ? 'Anúncio atualizado!' : 'Anúncio publicado!');
      limparPreviews();
      setFormData(FORM_VAZIO);
      setEditandoId(null);
      setImagensExistentes([]);
      setArquivosNovos([]);
      setPreviews([]);
      await carregarAnuncios();
    } catch (error) {
      setMensagem('Não foi possível salvar o anúncio/imagens: ' + error.message);
    } finally {
      setSalvando(false);
    }
  };

  function iniciarEdicao(a) {
    limparPreviews();
    setEditandoId(a.id);
    setFormData({
      titulo: a.titulo,
      categoria: a.categoria,
      cidade: a.cidade ?? '',
      preco: a.preco != null ? String(a.preco).replace('.', ',') : '',
      descricao: a.descricao ?? '',
    });
    setImagensExistentes(a.imagens ?? []);
    setArquivosNovos([]);
    setPreviews([]);
    setMensagem('');
    document.getElementById('novo-anuncio')?.scrollIntoView({ behavior: 'smooth' });
  }

  function cancelarEdicao() {
    limparPreviews();
    setEditandoId(null);
    setFormData(FORM_VAZIO);
    setImagensExistentes([]);
    setArquivosNovos([]);
    setPreviews([]);
    setMensagem('');
  }

  async function apagarAnuncio(id) {
  if (confirmandoId !== id) {
    setConfirmandoId(id);
    return;
  }

  setConfirmandoId(null);

  const { error } = await supabase
    .from('anuncios')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    setMensagem('Não foi possível apagar: ' + error.message);
    return;
  }

  setMensagem('Anúncio apagado com sucesso!');
  await carregarAnuncios();
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
                    <th>Fotos</th>
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
                        <td>{a.imagens?.length ?? 0}</td>
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
                           <button
                              type="button"
                              className="vendedor-btn-pequeno"
                              onClick={() => apagarAnuncio(a.id)}
                            >
                              {confirmandoId === a.id ? 'Confirmar exclusão' : 'Apagar'}
                            </button>

                            {confirmandoId === a.id && (
                              <button
                                type="button"
                                className="vendedor-btn-pequeno"
                                onClick={() => setConfirmandoId(null)}
                              >
                                Cancelar
                              </button>
                            )}
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

            <label htmlFor="imagens-anuncio">Fotos do anúncio (até 5 imagens)</label>
            <input id="imagens-anuncio" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={selecionarImagens} />
            <small className="vendedor-ajuda-imagens">JPG, PNG ou WEBP · até 5 MB por imagem. As fotos ajudam os compradores a conhecer sua oferta.</small>
            {(imagensExistentes.length > 0 || previews.length > 0) && (
              <div className="vendedor-imagens-preview" aria-label="Pré-visualização das imagens">
                {imagensExistentes.map((url) => (
                  <div className="vendedor-imagem-item" key={url}>
                    <img src={url} alt="Imagem atual do anúncio" />
                    <button type="button" onClick={() => removerImagemExistente(url)} aria-label="Remover imagem">×</button>
                  </div>
                ))}
                {previews.map((url, indice) => (
                  <div className="vendedor-imagem-item" key={url}>
                    <img src={url} alt={`Prévia da nova imagem ${indice + 1}`} />
                    <button type="button" onClick={() => removerImagemNova(indice)} aria-label="Remover imagem">×</button>
                  </div>
                ))}
              </div>
            )}

            <label htmlFor="descricao">Descrição</label>
            <textarea id="descricao" name="descricao" rows="4" value={formData.descricao} onChange={handleChange} />

            {mensagem && <p className="vendedor-mensagem">{mensagem}</p>}

            <button type="submit" className="vendedor-btn vendedor-btn-cheio" disabled={salvando}>
              {salvando ? 'Salvando...' : editandoId ? 'Salvar alterações' : 'Publicar anúncio'}
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