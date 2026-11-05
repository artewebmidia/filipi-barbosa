# Filipi Barbosa Advogados

Site institucional em React e Vite, baseado nos mockups desktop e mobile fornecidos. Layout em azul-marinho e dourado, fontes locais, espaçamento de 60 px entre as principais seções e imagens WebP locais.

## Desenvolvimento

Requisitos: Node.js 22.12+ (validado com 24.22.1) e npm.

```sh
cd /workspace/filipi-barbosa
npm ci
npm run dev -- --port 5173
```

```sh
npm run build
npm run preview -- --port 4173
npm test -- --workers=2
```

Os testes abrem o Chromium instalado em `/usr/bin/chromium` ou o navegador gerenciado pelo Playwright. Para outro executável, use `CHROMIUM_PATH`. Se não houver navegador instalado, execute `npx playwright install chromium`. O servidor para os testes inicia automaticamente, ou um servidor existente na porta 5173 é reutilizado fora de CI. A pasta `dist` contém o site estático para publicação; não há backend obrigatório.

## Funcionalidades

- Menu mobile, navegação por âncoras e suporte a teclado.
- Detalhes das seis áreas em diálogos acessíveis, com contato contextual.
- Contatos de telefone, e-mail, mapa, Instagram e avaliações do Google.
- Formulário validado que abre o WhatsApp com uma mensagem preenchida; o visitante revisa e confirma o envio no próprio WhatsApp. Nenhum e-mail é enviado pelo site e nenhum dado do formulário é persistido.
- Botão flutuante do WhatsApp e respeito à preferência de redução de movimento.

## Conteúdo e referências

`src/content.js` centraliza os contatos, links e textos das áreas. Os contatos e as áreas vieram do mockup: a consulta a `filipibarbosa.adv.br`, ao link de avaliações do Google e ao Instagram foi bloqueada pela política de rede (HTTP 403) durante a implementação. Os dados precisam ser conferidos com o escritório antes de publicar. Nenhum depoimento, nota ou número de avaliações foi inventado. A seção de avaliações fornece um link direto ao Google; depoimentos reais podem ser incluídos após verificação.

O logotipo é uma reprodução tipográfica em CSS do modelo fornecido; pode ser substituído pela arte original em alta resolução. As duas fotografias são geradas por IA para uso ilustrativo, identificadas no site, e não representam o advogado nem o escritório real. Os arquivos locais ficam em `public/images`. Não houve coleta de fotos reais nas redes externas. Fontes DM Sans e Libre Caslon Display distribuídas pelos pacotes Fontsource; licenças acompanham os respectivos pacotes.

## Ambiente na nuvem

Use o checkout existente: cada tarefa já é isolada e não é necessário criar um worktree. Dependências e arquivos permanecem no snapshot; processos precisam ser reiniciados em novas tarefas. Não publique conteúdo de `node_modules` ou arquivos de testes. Revise os dados de contato e as informações profissionais antes da publicação.
