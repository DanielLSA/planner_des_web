# Planner

Uma semana com espaço para o que importa. Agenda pessoal open source em português, sem conta e sem API de IA.

## Executar

Requer Node.js 22.12+ e npm.

```sh
npm ci
npm run dev
```

Abra o endereço informado pelo Vite. Para verificar: `npm test` e `npm run build`. Para revisar a distribuição: `npm run preview`.

## Funcionalidades

Agenda semanal e mensal, lista diária em telas pequenas, categorias editáveis, compromissos recorrentes, exceções por ocorrência, duplicação, demandas, movimentação de blocos entre dias, impressão e backup JSON validado.

Clique num horário vazio para criar um bloco. Clique num bloco para editar. Em séries, selecione se a edição vale para uma ocorrência ou toda a série. Ao editar toda a série, a data inicial é preservada; os dias de repetição e demais campos podem mudar. A movimentação por arrastar troca o dia da ocorrência e preserva o horário; o formulário permite mudar ambos. Sobreposições são permitidas após aviso, com busca de conflitos até um ano à frente.

## Seus dados

Dados ficam em IndexedDB neste navegador, perfil e endereço do site. Mudar de domínio ou porta abre outro armazenamento. Não há sincronização, analytics ou envio de agenda a terceiros. O navegador pode remover dados, e modo privado não é adequado para guardar sua rotina. Exporte backups regularmente em **Dados e backup**. Arquivos têm limite de 5 MB; a restauração substitui o estado atual, após confirmação e oferta de backup. Não importe arquivos de origem desconhecida.

## Publicar

`npm run build` gera `dist/`, que pode ser hospedada em qualquer serviço de arquivos estáticos via HTTPS. Para subdiretórios, use `npm run build -- --base=/nome-do-repositorio/`. A hospedagem vê metadados normais de acesso, mas a agenda permanece local. O código não usa fontes nem scripts remotos em execução.

Antes de abrir o repositório original, revogue a chave do antigo servidor no provedor e examine o histórico Git: excluir o arquivo atual não remove segredos de commits anteriores. Não publique o cronograma pessoal nem backups reais. Esta entrega não publica automaticamente um repositório ou site.

## Documentação

- [Produto e requisitos](docs/PRODUCT.md)
- [Arquitetura e decisões](docs/ARCHITECTURE.md)
- [Estado e validação](docs/STATUS.md)
- [Contribuição](CONTRIBUTING.md) · [Segurança](SECURITY.md)

Licença MIT. A distribuição inclui apenas exemplos genéricos; o PDF de referência pessoal não faz parte do projeto.

## Cronograma para a parede

Clique em **Exportar ↗** na agenda. Escolha semana (grade de horários) ou mês (calendário), título, A4/A3 e orientação. Para tamanhos específicos, escolha **Personalizado** e informe largura/altura em milímetros (100–1000 mm). A medida personalizada prevalece sobre orientação. A prévia permite conferir antes de imprimir; há ajuste de texto e aviso para conteúdo que não caiba.

Use **Imprimir / salvar PDF** e selecione a impressora ou **Salvar como PDF** no navegador. Configure o mesmo papel, escala 100%, margens nenhuma e cabeçalhos/rodapés desativados; a folha já tem margem interna de 8 mm. A impressão física depende das configurações e área imprimível da impressora. **Baixar SVG vetorial** exporta um arquivo com dimensões físicas explícitas. Notas privadas não aparecem; o filtro de categorias é respeitado.

## Planejar rotina sem carregar a agenda

Abra **Planejar rotina**. Informe atividades, categoria, duração (30 min por padrão) e sessões (1–7). Reordene as atividades para definir prioridade. Marque explicitamente os dias disponíveis e revise seus horários; nenhum dia vem selecionado. A pausa inicial é de 15 min e pode ser ajustada entre 0 e 120 min.

O cálculo usa regras locais: preserva compromissos de todas as categorias, recorrências e exceções; considera primeiro dias menos ocupados, depois horários mais cedo. Cada atividade recebe no máximo uma sessão por dia. Não usa horários passados nem divide sessões. O que não couber aparece com motivo, sem mudar sua agenda.

Na revisão, desmarque sugestões indesejadas. **Salvar selecionados** revalida a agenda atual e grava o lote inteiro em uma transação. Se os horários deixarem de estar livres ou ocorrer falha de gravação, nenhum bloco do lote é salvo. Volte em **Ajustar** e gere nova proposta. Cancelar descarta o formulário e a proposta. Somente os blocos aprovados permanecem, como compromissos avulsos; o assistente não configura uma meta recorrente.

## Extras opcionais na impressão

Em **Exportar ↗ → Extras para o papel**, marque caixinhas de realizado, demandas pendentes, espaço para metas à mão ou anotações. A seção começa recolhida e todas as opções desmarcadas; essas escolhas não aparecem na agenda digital e reiniciam ao fechar a exportação.

Metas, demandas e anotações compartilham os 25% inferiores da área útil quando selecionados. Caixinhas isoladas não reduzem a área da grade. Prévia, dimensões e alertas de conteúdo excedente continuam funcionando em semana/mês, PDF via impressão e SVG. Metas e anotações são áreas em branco; notas privadas dos compromissos continuam fora da folha.
