# Planner

Organize sua rotina no navegador e leve o cronograma para o papel.

**[Experimente online](https://planner-des-web.vercel.app/)** · [Como contribuir](CONTRIBUTING.md) · [Licença MIT](LICENSE)

O Planner é uma aplicação open source em português para planejar estudos, trabalho e atividades pessoais. Funciona sem cadastro: seus dados ficam no navegador.

## O que você pode fazer

- Organizar compromissos nas visões semanal, mensal e diária no celular.
- Criar recorrências semanais e editar uma ocorrência ou a série inteira.
- Personalizar categorias, criar novas durante o cadastro e combinar filtros.
- Guardar demandas sem horário e agendá-las depois.
- Planejar a rotina: informar atividades, prioridades e disponibilidade, revisar os encaixes sugeridos e aprovar apenas o que quiser.
- Exportar PDF e SVG com prévia, A4/A3, orientação e dimensões personalizadas.
- Incluir na impressão caixinhas, demandas e espaço para metas ou anotações, opcionalmente.
- Exportar e restaurar backups JSON.

O assistente de rotina usa regras locais; não envia sua agenda a serviços de IA.

## Executar localmente

Requisitos: Node.js 22.12 ou superior e npm.

```sh
git clone https://github.com/DanielLSA/planner_des_web.git
cd planner_des_web
npm ci
npm run dev
```

Abra o endereço informado no terminal.

```sh
npm test            # testes automatizados
npm run build      # verificação TypeScript e build de produção
npm run preview    # prévia do build
```

## Uso rápido

Crie um compromisso pelo botão **Novo compromisso** ou clicando em um horário. Para repetir, marque os dias da semana. Na edição de uma recorrência, escolha **Somente esta ocorrência** ou **Toda a série**. Salvar mantém o período que você está planejando; **Ver compromisso** permite navegar quando a data salva estiver fora dele.

Em **Categorias → Editar**, ajuste nomes e cores. **Nova categoria**, no formulário de compromisso, mantém os outros campos preenchidos e salva a categoria junto com o bloco. Clique em várias categorias para combinar filtros; **Todas as categorias** remove a restrição.

Em **Planejar rotina**, informe atividades por prioridade, duração, sessões e dias disponíveis. Revise antes de salvar. A proposta não move compromissos existentes nem usa horários passados. Cancelar não altera sua agenda.

## Imprimir e exportar

Em **Exportar**, escolha semana ou mês e confira a prévia. **Baixar PDF** gera uma página com as dimensões e orientação escolhidas. **Imprimir** abre o diálogo do navegador; configurações da impressora podem prevalecer. SVG também está disponível.

Os **Extras para o papel** começam desmarcados e só aparecem na exportação. Notas dos compromissos não são incluídas. Se algum texto não couber, a prévia mostra um aviso; ajuste papel ou tamanho do texto.

## Dados e privacidade

A agenda é armazenada em IndexedDB, por navegador, perfil e endereço do site. Não há contas, banco de agendas em nuvem ou sincronização entre dispositivos. Duas pessoas usando o mesmo perfil do navegador compartilham os dados locais desse site.

Faça backups em **Dados e backup**. Limpar os dados do site ou usar navegação privada pode apagar a agenda. O armazenamento persistente pode reduzir a limpeza automática pelo navegador, mas não substitui backup. Para migrar do localhost para o site, ou entre dispositivos, exporte e importe o JSON. A restauração substitui a agenda atual após confirmação; limite de 5 MB por arquivo.

Não há analytics na aplicação. A hospedagem pode processar metadados normais das requisições. Saiba mais em [Segurança](SECURITY.md).

## Contribua

Encontrou um problema ou tem uma ideia? [Abra uma issue](https://github.com/DanielLSA/planner_des_web/issues) com o comportamento esperado e passos para reproduzir. Contribuições de código, design, acessibilidade, documentação e testes são bem-vindas. Consulte o [guia de contribuição](CONTRIBUTING.md) antes de mudanças maiores.

Possíveis evoluções incluem contas e sincronização opcionais. Essas funcionalidades ainda não estão disponíveis; propostas podem ser discutidas em issues.

## Documentação técnica

- [Produto e comportamentos esperados](docs/PRODUCT.md)
- [Arquitetura e persistência](docs/ARCHITECTURE.md)
- [Histórico de mudanças](CHANGELOG.md)

## Hospedagem própria

O build gera `dist/`, publicável como arquivos estáticos via HTTPS. Na Vercel: preset **Vite**, comando `npm run build` e saída `dist`. Não são necessárias chaves de API nem variáveis de ambiente. Para hospedar em subdiretório: `npm run build -- --base=/nome-do-repositorio/`.

## Licença

[MIT](LICENSE). Você pode usar, estudar, modificar e distribuir o projeto conforme os termos da licença.
