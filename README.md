# <img src="public/logo.png" width="38" align="center" alt="Eletricitrus Logo"> Eletricitrus - Portal de Energia Solar Assinada

> **Projeto Startup - Facens (Análise e Desenvolvimento de Sistemas)**

O **Eletricitrus** é uma plataforma web voltada para o setor de energia solar fotovoltaica e sustentável. O objetivo do projeto é conectar consumidores a fazendas solares parceiras, oferecendo ferramentas interativas para cálculo de economia e conscientização ambiental através de uma identidade visual amigável e acessível.

---

## 🚀 Funcionalidades Principais

- 📊 **Calculadora de Economia:** Estimativa personalizada de economia mensal e anual com energia solar.
- ☀️ **Mascote Interativo ("Solzinho"):** Experiência guiada e amigável para engajamento do usuário.
- 🏞️ **Catálogo de Fazendas Solares:** Exibição detalhada e comparativo de parceiras.
- 🏷️ **Guia de Placas Solares:** Informações técnicas e educativas sobre tecnologia fotovoltaica.
---

## 🎨 Identidade Visual e UI/UX

### Paleta de Cores

| Cor | Nome / Aplicação | Código HEX |
| :--- | :--- | :--- |
| **Carvão** | Fundo da Navbar e Elementos Escuros | `#1B1712` |
| **Bege** | Fundo Principal da Aplicação | `#F6EFE2` |
| **Bege Claro** | Cards e Containers de Conteúdo | `#FBF7EE` |
| **Texto Escuro** | Tipografia Principal e Leitura | `#241F18` |
| **Dourado** | Destaques, Bordas e Links Ativos | `#D9A441` |
| **Laranja** | Botões e Ações Primárias (CTAs) | `#C1560C` |
| **Laranja Escuro** | Estados de Hover e Foco | `#96420A` |

### Navegação e Componentes
- **Navegação SPA Padronizada:** Menu responsivo estilizado (`Navbar.jsx` + `Navbar.css`) com suporte a menu hambúrguer para dispositivos móveis e indicador de rota ativa via React Router.
- **Mascote Interativo ("Solzinho"):** Apoio visual dinâmico com o componente `<Mascote />` para engajamento do usuário e reforço da identidade visual da marca em todas as páginas.

---

## 🛠️ Tecnologias Utilizadas

### Front-end
- **React 19**: Construção da interface baseada em componentes reativos e reutilizáveis.
- **Vite**: Build tool e ambiente de desenvolvimento ultrarrápido.
- **React Router Dom (v7)**: Gerenciamento de rotas e navegação SPA (*Single Page Application*).
- **CSS3 / Variables**: Estilização responsiva mantendo a identidade visual oficial da marca.

### Back-end & Banco de Dados (BaaS)
- **Supabase**: Plataforma Backend-as-a-Service (BaaS) responsável por:
  - **Autenticação**: Gestão de acessos e logins de usuários.
  - **PostgreSQL Database**: Persistência de dados de perfis, simulações salvas e histórico de orçamentos.

### Integrações & APIs Externas
- **ViaCEP API**: consulta e preenchimento de endereço a partir do CEP.
- **Open-Meteo Geocoding**: obtenção de coordenadas a partir da cidade e do estado informados na calculadora.
- **NASA POWER**: consulta de dados climatológicos de irradiação solar usados na estimativa da calculadora.
- **Google Maps JavaScript API** (`@react-google-maps/api`): mapa de referência opcional na Home.

---

## 🏗️ Arquitetura do Sistema

```text
┌────────────────────────────────────────────────────────────────────────┐
│                          CLIENTE (NAVEGADOR)                           │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                         React + Vite                           │   │
│   │                                                                │   │
│   │   [ Componentes Reutilizáveis ]                                │   │
│   │   ├── Navbar.jsx / Footer.jsx / Mascote.jsx                    │   │
│   │                                                                │   │
│   │   [ Roteamento (React Router Dom) ]                            │   │
│   │   ├── / ............... Home (Hero & Apresentação)             │   │
│   │   ├── /calculadora .... Calculadora de Telhado Solar           │   │
│   │   ├── /placas ......... Catálogo de Painéis Fotovoltaicos      │   │
│   │   ├── /fazendas ....... Mapeamento de Fazendas Solares         │   │
│   │   ├── /servicos ....... Localização por CEP (ViaCEP)           │   │
│   │   ├── /faq ............ Dúvidas Frequentes & Blog              │   │
│   │   └── /login .......... Autenticação Interativa (Mascote)      │   │
│   └───────────────────────────────┬────────────────────────────────┘   │
└───────────────────────────────────┼────────────────────────────────────┘
                                    │
                         Requisições HTTP / REST
                                    │
            ┌───────────────────────┴───────────────────────┐
            ▼                                               ▼
┌────────────────────────┐                     ┌────────────────────────┐
│  API VIA CEP (Externa) │                     │   SUPABASE (BaaS)      │
│                        │                     │                        │
│  - Consulta de CEP     │                     │  - Autenticação (Auth) │
│  - Autocompletar       │                     │  - Banco PostgreSQL    │
│    Endereços           │                     │  - Regras de Segurança │
└────────────────────────┘                     └────────────────────────┘
```

---

## 📂 Estrutura de Pastas

```text
Eletricitrus/
├── public/
│   ├── imagens/          # Imagens do Solzinho e identidade visual
│   └── logo.png          # Logo do Eletricitrus
│
├── src/
│   ├── assets/           # Imagens e recursos utilizados pela aplicação
│   ├── components/       # Componentes React reutilizáveis (Navbar, Footer, etc.)
│   ├── pages/            # Páginas/telas principais da aplicação
│   │   ├── partners/     # Páginas individuais das marcas parceiras (SunMobi, EDP, etc.)
│   │   └── servicetypes/ # Categorias de serviços (Vendas, Manutenção, Descarte)
│   ├── services/         # Serviços e integrações externas (ex: API ViaCEP)
│   ├── styles/           # Arquivos de estilização adicionais
│   ├── utils/            # Funções auxiliares e regras de negócio
│   ├── App.css           # Estilos do componente principal
│   ├── App.jsx           # Componente principal e configuração das rotas
│   ├── index.css         # Estilos globais
│   └── main.jsx          # Ponto de entrada da aplicação
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

--- 

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 18.x ou superior)
- **npm** ou **yarn**
- **Git**

### Passo a Passo


#### Clonar o repositório:
```bash
git clone https://github.com/arthurlncost/Startup.git
```

#### Acessar a pasta do projeto:
```bash
cd Startup
```

#### Instalar as dependências:
```bash
npm install
```

#### Executar o servidor de desenvolvimento:
```bash
npm run dev
```

#### Acessar a aplicação no navegador:
Abra a URL indicada no terminal (geralmente http://localhost:5173/).

---

## 👥 Autores

Desenvolvido por estudantes do curso de **Análise e Desenvolvimento de Sistemas (ADS) - Facens**:

- [Ana Clara R. de Oliveira](https://github.com/ana-0901)
- [Arthur Luciano N. da Costa](https://github.com/arthurlncost)
- [Giovanni Paulossi C. Dantas](https://github.com/giovanni-gijo)
- [Leonardo de Sousa L.]()
- [Tiago José R. Burani](https://github.com/tiagoburani4-design)
- [Vitoria Carara C.](https://github.com/vitocaracesar-ads)

---


## 🌞 Recursos integrados na Home

A Home mantém a estrutura de apresentação, atalhos para as áreas da plataforma, parceiros, propósito/ODS e chamadas de ação conforme o estado de autenticação. Foi incorporado um carrossel educativo de quatro etapas (Captação, Conversão, Consumo e Créditos), com navegação automática e controles manuais.

Também foi incorporado o mapa de referência da versão do Caique. Ele utiliza Google Maps e apresenta um marcador fixo em São Paulo; não representa geolocalização do usuário nem a posição de fazendas cadastradas. O mapa é opcional e só é carregado quando a chave está configurada.

## 🔐 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto a partir de `.env.example`:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_KEY=
VITE_GOOGLE_MAPS_API_KEY=
```

Preencha as variáveis do Supabase com os dados do projeto utilizado pela equipe. A chave Google Maps é opcional e necessária apenas para o mapa da Home. Não publique o arquivo `.env` no Git.

## 🧪 Comandos úteis

```bash
npm ci
npm run dev
npm run lint
npm run build
```

Para detalhes das decisões de integração, limitações encontradas e validações pendentes, consulte [`INTEGRACAO.md`](./INTEGRACAO.md).


## Fotos nos anúncios do marketplace

O painel do vendedor permite selecionar até 5 imagens por anúncio (JPG, PNG ou WEBP, até 5 MB por arquivo). As imagens são enviadas ao Supabase Storage e suas URLs são gravadas na coluna `imagens` da tabela `anuncios`. As páginas de Placas e Fazendas exibem a imagem principal e miniaturas adicionais.

Antes de testar, execute `supabase-marketplace-imagens.sql` no SQL Editor do Supabase. O script cria a coluna `imagens`, configura o bucket público `anuncios-imagens` e define políticas de acesso para que cada vendedor envie arquivos somente à própria pasta.
