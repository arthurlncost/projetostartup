// Conteúdo do guia sobre fazendas solares (página /fazendas).
//
// COMO COLOCAR AS IMAGENS
// 1. Salve cada foto em public/imagens/blog/ com o nome indicado em "imagem".
// 2. Preencha o campo "credito" com o autor e a licença (ex.: "Foto: Fulano / CC BY-SA 4.0").
// Enquanto o arquivo não existir, a imagem simplesmente não aparece na página.
//
// Campos opcionais de cada artigo: imagem, legenda, credito, lista, curiosidade.

export const capaBlog = {
  imagem: "/imagens/blog/capa.jpg",
  legenda: "Fileiras de painéis de uma fazenda solar",
  credito: "",
};

export const artigosFazendas = [
  {
    id: "o-que-sao",
    titulo: "O que é uma fazenda solar?",
    paragrafos: [
      "Uma fazenda solar, também chamada de usina ou parque solar fotovoltaico, é uma área com muitos painéis solares ligados entre si para produzir eletricidade em grande escala. Um telhado residencial tem alguns painéis; uma fazenda solar pode ter milhares, ou até milhões.",
      "Ela não atende um único imóvel. A energia vai para a rede elétrica e abastece muita gente ao mesmo tempo.",
    ],
    imagem: "/imagens/blog/o-que-sao.jpg",
    legenda: "Vista aérea de uma fazenda solar",
    credito: "",
    curiosidade:
      "'Fazenda solar' é o nome popular. No setor elétrico, o mais comum é falar em usina, central geradora ou parque solar fotovoltaico.",
  },
  {
    id: "como-funciona",
    titulo: "Como ela funciona",
    paragrafos: [
      "Os painéis são feitos de células fotovoltaicas, que transformam a luz do sol em eletricidade. Essa eletricidade sai em corrente contínua.",
      "Os inversores convertem a corrente contínua em corrente alternada, que é o padrão da rede. Depois, transformadores elevam a tensão para a energia viajar por linhas de transmissão sem perder tanto no caminho.",
      "Algumas fazendas usam estruturas que giram acompanhando o sol ao longo do dia, o que aumenta a geração.",
    ],
    imagem: "/imagens/blog/como-funciona.jpg",
    legenda: "Painéis solares acompanhando o sol",
    credito: "",
    lista: [
      "Painéis captam o sol",
      "Inversores ajustam o tipo de corrente",
      "Transformadores elevam a tensão",
      "A energia entra na rede da distribuidora",
      "Os assinantes recebem créditos em kWh na conta de luz",
    ],
  },
  {
    id: "para-que-servem",
    titulo: "Para que servem",
    paragrafos: [
      "A primeira função é abastecer a rede elétrica com uma fonte limpa, ajudando a diversificar a matriz energética do país.",
      "A segunda é a geração compartilhada: quem mora de aluguel, em apartamento ou em casa com sombra pode assinar uma fatia da fazenda e receber créditos que abatem a conta de luz, sem instalar nada.",
      "A terceira é atender empresas e condomínios que querem reduzir custos e cumprir metas de sustentabilidade com energia renovável.",
    ],
    imagem: "/imagens/blog/para-que-servem.jpg",
    legenda: "A energia da fazenda chega às casas pela rede elétrica",
    credito: "",
  },
  {
    id: "onde-ficam",
    titulo: "Onde ficam",
    paragrafos: [
      "Uma fazenda solar precisa de muito sol, poucas nuvens, um terreno amplo e plano e proximidade com linhas de transmissão ou subestações. Por isso muitas das maiores ficam em regiões áridas ou semiáridas, como o Tengger Desert Solar Park, na China, e o Bhadla Solar Park, na Índia.",
      "No Brasil, elas se concentram no Nordeste (Bahia, Piauí, Ceará, Pernambuco) e no norte de Minas Gerais. O Complexo Janaúba foi instalado em Minas justamente pela forte irradiação e pela pouca nebulosidade da região.",
    ],
    imagem: "/imagens/blog/onde-ficam.jpg",
    legenda: "Parque solar em região árida",
    credito: "",
  },
  {
    id: "sustentabilidade",
    titulo: "Utilidade ecológica e sustentável",
    paragrafos: [
      "Gerar energia com o sol não queima combustível, então a operação não emite gases do efeito estufa. É uma contribuição direta para o ODS 7 (energia limpa e acessível) e para o ODS 13 (ação contra a mudança global do clima).",
      "Painéis usam pouca água, só para limpeza, bem menos do que usinas térmicas. A vida útil costuma passar de 25 anos, e no fim eles podem ser reciclados, o que conecta as fazendas ao serviço de descarte e reciclagem do Eletricitrus.",
      "Há também o lado social: a construção de grandes usinas gera empregos, como os cerca de 11 mil da obra de Janaúba.",
      "Mas existem cuidados. Fazendas ocupam muito espaço e, mal planejadas, podem exigir a remoção de vegetação nativa. As boas práticas são preferir áreas já degradadas, preservar a vegetação ao redor e, quando possível, combinar a geração com agricultura ou pecuária.",
    ],
    imagem: "/imagens/blog/sustentabilidade.jpg",
    legenda: "Painéis solares convivendo com a vegetação",
    credito: "",
    curiosidade:
      "Existe até o conceito de agrovoltaica: painéis instalados de forma que a terra abaixo continue produzindo alimento.",
  },
  {
    id: "maior-do-mundo",
    titulo: "A maior fazenda solar do mundo",
    paragrafos: [
      "O título de maior do mundo muda com frequência e depende do critério: capacidade em operação ou planejada, só solar ou solar misturada com outras fontes.",
      "Um ranking de 2026 ainda lista o Midong Solar Park, na China, com 3,5 GW, seguido do Bhadla, na Índia, com 2,25 GW. Reportagens do mesmo ano falam de um complexo em Urumqi, na China, com 5 GW e 13,3 mil hectares. E a Índia constrói em Khavda um complexo planejado para 30 GW, misturando solar e eólica.",
      "Por isso, quando ler 'a maior do mundo', confira a data e se o número é de capacidade já instalada ou prevista.",
    ],
    imagem: "/imagens/blog/maior-do-mundo.jpg",
    legenda: "Parque solar de grande porte",
    credito: "",
  },
  {
    id: "maior-do-brasil",
    titulo: "A maior do Brasil: Complexo Janaúba",
    paragrafos: [
      "O Complexo Solar Janaúba, no norte de Minas Gerais, é o maior do Brasil. Foi inaugurado em julho de 2023 pela Elera Renováveis, com 20 parques solares em uma área de 3 mil hectares, o equivalente a cerca de 4.300 campos de futebol.",
      "Na inauguração, a capacidade era de 1,2 GWp, suficiente para abastecer mais de 1 milhão de residências. O investimento foi de R$ 4 bilhões. Segundo fontes do setor, uma expansão levou o complexo a cerca de 1,6 GWp.",
    ],
    imagem: "/imagens/blog/maior-do-brasil.jpg",
    legenda: "Complexo Solar Janaúba, em Minas Gerais",
    credito: "",
  },
  {
    id: "como-escolher",
    titulo: "Como escolher uma fazenda parceira",
    paragrafos: [
      "Cada empresa tem as próprias condições, então vale comparar. Antes de assinar, pergunte:",
    ],
    lista: [
      "O desconto é garantido ou apenas estimado?",
      "Qual é o prazo do contrato e existe multa para cancelar?",
      "Como e quando o valor da mensalidade é reajustado?",
      "A minha distribuidora é atendida por essa fazenda?",
      "Como eu acompanho os créditos que estou recebendo?",
    ],
  },
];

export const fontesBlog = [
  {
    nome: "Ministério de Minas e Energia: inauguração do Complexo Janaúba",
    url: "https://www.gov.br/mme/pt-br/assuntos/noticias/maior-usina-de-producao-de-energia-solar-do-brasil-entra-em-operacao-no-interior-de-minas-gerais",
  },
  {
    nome: "Exame: as dez maiores usinas solares do mundo",
    url: "https://exame.com/esg/as-dez-maiores-usinas-de-energia-solar-do-mundo-e-quantas-sao-brasileiras/",
  },
  {
    nome: "ND Mais: complexo solar de 5 GW na China",
    url: "https://ndmais.com.br/economia/negocios/complexo-solar-maior-fazenda-solar-china-13300-hectares-5-gw/",
  },
  {
    nome: "Olhar Digital: complexo de Khavda, na Índia",
    url: "https://olhardigital.com.br/2026/04/11/curiosidades/maior-central-solar-do-mundo-vai-nascer-na-india/",
  },
];