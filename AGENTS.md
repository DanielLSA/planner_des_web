# Orientação para contribuições assistidas

Estas instruções se aplicam a ferramentas de programação que trabalham neste repositório. O guia geral está em CONTRIBUTING.md.

- Leia docs/PRODUCT.md e docs/ARCHITECTURE.md antes de alterar comportamento.
- Preserve o processamento local; não adicione serviços externos, contas ou coleta de dados sem discussão prévia.
- Não versione credenciais, agendas reais, backups, node_modules ou dist.
- Comandos: `npm ci`, `npm run dev`, `npm test`, `npm run build`.
- Ao alterar datas, recorrências, persistência, backup ou exportação, verifique as regras afetadas e acrescente regressões relevantes.
- Confira desktop e celular após mudanças visuais. Documente resultado e limitações na descrição do pull request.
- Atualize a documentação afetada na mesma alteração. Registre mudanças relevantes para usuários em CHANGELOG.md, sem diários de execução ou instruções pessoais.
