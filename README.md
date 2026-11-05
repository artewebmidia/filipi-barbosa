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

`src/content.js` centraliza os contatos, links, textos das áreas e depoimentos. O site oficial e o Instagram foram consultados em 05/11/2026; os contatos e áreas do mockup foram conferidos com o conteúdo do site oficial.

- A hero usa o retrato anexado pelo usuário, tratado com IA para melhorar a apresentação e remover a faixa de texto da foto. A hero usa fundo azul-marinho com fades horizontal e vertical, enquadramento acima das mãos e identificação em HTML na parte inferior. O H1 é “Advogado Especialista em Direito Civil em Joinville”.
- A fotografia da pasta do escritório veio de `https://filipibarbosa.adv.br/wp-content/uploads/2022/08/64.webp` e foi editada com IA para aplicar o logo atual enviado pelo usuário (monograma FB com linha dourada e texto Filipi Barbosa Advogados). As imagens locais estão em `public/images` e usam WebP.
- Os três depoimentos são transcrições literais do widget Google/Trustindex exibido em `https://filipibarbosa.adv.br/`. Nomes, textos, cinco estrelas e datas de julho de 2022 foram preservados; a seção informa essa procedência e oferece o link do Google. O Google redirecionou a consulta para uma página sem os depoimentos acessíveis, portanto não foi possível confirmar a nota ou o total atual de avaliações. Não há nota global nem contagem inventada.
- O Instagram público foi consultado em `https://www.instagram.com/filipi.barbosa.adv/`. Não foi necessário utilizar outras fotos de lá.
- O logotipo permanece uma reprodução tipográfica do modelo fornecido. As fontes DM Sans e Cormorant Garamond são locais via Fontsource, com licenças nos pacotes correspondentes. Títulos usam peso real 600.

Os fundos alternam entre azul-marinho na hero, branco quente nas seções centrais e azul-acinzentado na seção de avaliações, mantendo cerca de 60 px entre seções. O botão flutuante usa o verde `#25D366` do WhatsApp.

## Ambiente na nuvem

Use o checkout existente: cada tarefa já é isolada e não é necessário criar um worktree. Dependências e arquivos permanecem no snapshot; processos precisam ser reiniciados em novas tarefas. Não publique conteúdo de `node_modules` ou arquivos de testes. Revise os dados de contato e as informações profissionais antes da publicação.

## Bloco de confiança da hero

Os três retratos em `public/images/people` são imagens decorativas do Unsplash, não identificam os autores dos depoimentos nem representam clientes reais do escritório. São ocultos de leitores de tela e não recebem nomes ou citações. Origens: `images.unsplash.com/photo-1506794778202-cad84cf45f1d`, `images.unsplash.com/photo-1534528741775-53994a69daeb` e `images.unsplash.com/photo-1500648767791-00dcc994a43e`.

`clientStats.satisfiedClients`, em `src/content.js`, controla a quantidade de clientes satisfeitos. O valor fica `null` até o escritório confirmar o número; nesse estado, aparece apenas “Clientes satisfeitos”. Não se deve reutilizar os números 500 ou 1.200 das referências como dado do escritório. As estrelas remetem às avaliações positivas transcritas do site oficial e não exibem uma média global ou total atual não verificado.

O rodapé tem padding de 72 px em cima e 40 px embaixo no desktop, e de 52 px / 32 px no celular.
