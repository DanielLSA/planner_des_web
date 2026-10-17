# Como contribuir

Obrigado pelo interesse no Planner. Você pode ajudar com código, testes, design, acessibilidade, documentação ou relatos de uso.

## Relatar um problema

Abra uma [issue](https://github.com/DanielLSA/planner_des_web/issues) com passos para reproduzir, resultado esperado e observado, navegador e dispositivo. Use dados fictícios nas capturas. Não anexe agendas reais, backups ou credenciais.

## Propor uma melhoria

Explique o problema que deseja resolver e um exemplo de uso. Para mudanças grandes, discuta a proposta em uma issue antes de implementar. Contas e sincronização ainda estão em discussão.

## Preparar uma contribuição

1. Faça um fork, clone o repositório e crie uma branch para a mudança.
2. Instale com `npm ci` e execute com `npm run dev` (Node.js 22.12+).
3. Consulte [produto](docs/PRODUCT.md) e [arquitetura](docs/ARCHITECTURE.md).
4. Execute `npm test` e `npm run build`.
5. Para interface, confira desktop e celular. Para impressão, confira prévia, orientação e dimensões do PDF. Use exemplos fictícios.
6. Abra um pull request explicando o problema, a mudança, as verificações e limitações conhecidas.

Adicione regressões relevantes ao alterar recorrência, calendário, persistência, importação ou exportação. Mudanças no backup precisam de compatibilidade ou migração explícita. Atualize a documentação afetada e o changelog quando a alteração importar para quem usa o aplicativo.

`npm test` executa os testes TypeScript em `tests/*.test.ts`. Os scripts auxiliares de navegador em `tests/*browser.cjs` requerem Playwright e Microsoft Edge e não são executados pelo comando padrão; não é necessário instalá-los para contribuir com documentação.

## Princípios

Preserve o processamento local, a edição por teclado e a experiência no celular. Novos serviços externos, coleta de dados ou autenticação exigem discussão prévia. Contribuições feitas com assistência de IA seguem os mesmos critérios de revisão e validação.
