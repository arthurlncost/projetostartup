# Relatório de integração — Eletricitrus

## Base escolhida
A terceira versão foi construída sobre `eletricitrus-atualizado(2).zip`, pois essa versão contém a Home preferida, a calculadora com consulta de irradiação solar e a página de placas com anúncios. A versão original do Caique foi mantida como referência e suas contribuições foram incorporadas seletivamente.

## Contribuições preservadas da versão principal
- Home com identidade visual, hero, atalhos para recursos, parceiros, etapas de uso, ODS e chamada final adaptada ao estado de autenticação.
- Calculadora com consulta de coordenadas via Open-Meteo e consulta climatológica de irradiação solar via NASA POWER.
- Páginas de fazendas e placas solares, incluindo anúncios.
- Integração existente com Supabase, contexto de autenticação, rotas protegidas, painéis, cadastro e login.
- Navegação e rotas existentes da aplicação.

## Contribuições incorporadas da versão do Caique
- Carrossel educativo de quatro etapas (Captação, Conversão, Consumo e Créditos), com as quatro imagens fornecidas.
- Carrossel integrado como uma seção adicional da Home; não substitui o hero nem as demais seções.
- Controles de anterior/próximo e indicadores de etapa foram acrescentados para permitir navegação manual.
- Mapa baseado em Google Maps, com marcador fixo de referência em São Paulo.
- Efeito visual de hover na mascote.
- Dependência `@react-google-maps/api` adicionada ao projeto.

## Mapa: identificação e limitações
A sigla “NHC” não aparece em nomes de arquivos, código ou documentação dos dois ZIPs. A funcionalidade de mapa encontrada na versão do Caique é Google Maps (`@react-google-maps/api`), não sendo possível confirmar que seja o recurso chamado NHC.

O mapa implementado é demonstrativo: centraliza em São Paulo e apresenta um único marcador fixo. Não há busca por fazendas, geolocalização do usuário, filtros ou integração com dados do Supabase no código encontrado.

Para exibi-lo, configure `VITE_GOOGLE_MAPS_API_KEY` no arquivo `.env`, com uma chave válida e a API/billing e restrições de domínio devidamente configuradas no Google Cloud. Sem a chave, a Home mostra uma instrução em vez de tentar carregar o mapa.

## Decisões para evitar regressões
- Foram mantidas as rotas da versão principal. Algumas rotas presentes nos links da Navbar do Caique não correspondiam às rotas declaradas em `App.jsx`; por isso, não foram copiadas.
- A página de placas e sua folha de estilos mais completa foram preservadas.
- O serviço `irradiacaoSolar.js` foi mantido e não foi substituído.
- Configurações e credenciais do Supabase não foram alteradas.
- Nenhuma credencial real foi incluída. O arquivo `.env.example` documenta as variáveis necessárias.

## Validação executada e pendente
- Inspeção dos dois ZIPs, estrutura de diretórios e comparação dos arquivos: concluída.
- Verificação estática dos imports locais e dos arquivos de configuração: registrada durante a preparação.
- Instalação das dependências: não concluída neste ambiente; `npm install` excedeu o tempo disponível e `npm ci --offline` não pôde ser concluído porque um pacote não estava no cache local.
- Build de produção, lint e testes no navegador: pendentes, pois dependem da instalação das dependências.
- Teste real do mapa: pendente de chave Google Maps válida.
- Teste de autenticação, consultas e gravações Supabase: pendente de variáveis de ambiente e acesso ao projeto Supabase.

## Como executar localmente
1. Instale Node.js compatível com as versões declaradas no projeto.
2. Copie `.env.example` para `.env` e preencha as variáveis do Supabase.
3. Preencha `VITE_GOOGLE_MAPS_API_KEY` se desejar habilitar o mapa.
4. Execute `npm ci`.
5. Execute `npm run dev` para desenvolvimento.
6. Execute `npm run build` para validar o build de produção.
7. Execute `npm run lint` para verificar o lint.

**Importante:** a integração de código foi preparada, mas não deve ser considerada validada em execução até que os comandos de instalação, build e os testes de integração sejam executados em ambiente com acesso às dependências e credenciais necessárias.

## Atualização posterior: imagens no marketplace

Foi acrescentado ao Painel do Vendedor o envio de até cinco imagens por anúncio, com pré-visualização, remoção antes de salvar e suporte à edição de anúncios existentes. Os arquivos são armazenados no bucket público `anuncios-imagens` do Supabase Storage, em pastas organizadas pelo ID do usuário e do anúncio. As URLs ficam na coluna `imagens` (`text[]`) da tabela `anuncios`.

As páginas de Placas e Fazendas agora consultam essa coluna e exibem a imagem principal e miniaturas adicionais. Para habilitar o recurso no projeto Supabase, execute `supabase-marketplace-imagens.sql` no SQL Editor. A instalação de dependências e o build não foram concluídos neste ambiente; portanto, esta alteração ainda precisa ser validada localmente com o projeto Supabase configurado.
