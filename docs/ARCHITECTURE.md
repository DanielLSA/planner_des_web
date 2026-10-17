# Arquitetura

TypeScript estrito e Vite, aplicação estática sem backend. `domain.ts` concentra calendário local, recorrências, conflitos e validação de backup; `storage.ts` encapsula IndexedDB; `main.ts` apresenta as telas e aplica mutações após confirmação de persistência.

IndexedDB `planner-local`, versão 1, store `state`, chave `current`. Uma transação salva o estado inteiro. Versões futuras devem migrar o banco em `onupgradeneeded` e manter leitores de backup explicitamente versionados. Datas ISO locais, horários HH:mm e identificadores UUID. Séries guardam dias da semana e mapa de exceções: data → `deleted` ou identificador do bloco avulso substituto. Excluir um substituto marca a exceção como removida. Excluir a série não exclui blocos avulsos previamente destacados.

Não há API pública HTTP. Contrato externo: backup JSON `version: 1`, listas `categories`, `events`, `demands` e booleano `onboarded`. Importação verifica IDs, referências, datas, horários e campos; novos formatos requerem migração explícita. Dados importados são renderizados como texto escapado.

Concorrência: transações são atômicas; várias abas abertas podem sobrescrever versões antigas do estado. Usar uma aba por vez nesta versão. A interface de dados comunica esse limite.

## Escolha de modelo — 16/10/2026

Aplicada a skill selecionar-modelo. Com base nos metadados do ambiente, recomendação: GPT-6.1-sol no Codex, esforço alto para arquitetura/recorrências/persistência; médio para ajustes pequenos com testes. Não foi feita troca do modelo desta conversa, nem criados subagentes ou chamadas pagas. Preços e disponibilidade na conta não foram medidos. Escalar somente após falha concreta de aceite não causada por requisito, ferramenta ou acesso. IA do produto fica fora da versão 1.

## Exportação de cronograma

`export.ts` gera SVG vetorial local com dimensões físicas em mm e viewBox proporcional (4 unidades/mm). Grade semanal usa limites únicos de início/fim e distribui suas faixas na folha; não representa duração em escala linear. Sobreposições ficam em colunas paralelas. Mês mostra o número necessário de semanas (4–6). Conteúdo usa texto escapado, filtros e expansão das recorrências existentes. Notas não são incluídas. Textos sem espaço geram contador de aviso visível e confirmação antes de imprimir. A impressão ocorre em iframe isolado com tamanho @page correspondente, sem servidor ou dependência externa; PDF é salvo no diálogo de impressão do navegador. Exportação não altera a agenda ou seu formato de backup.

## Rotina assistida

`scheduler.ts` expõe `propose`, `inputError` e `validateSelection`, sem DOM nem mutação do estado. Entradas: semana, atividades prioritárias, janelas explícitas por dia e pausa. Ocupação usa a união dos intervalos diários, evitando contar sobreposições duas vezes. Busca o primeiro encaixe por dia; classifica por carga, horário e data. Tempo atual é parâmetro injetável para testes e assume o calendário local existente.

`routine.ts` mantém o formulário e a proposta somente na memória do diálogo. Ao gerar/regenerar, relê o banco e atualiza a agenda. `storage.update` executa leitura, transformação, revalidação e gravação em transação IndexedDB única. A confirmação verifica categorias, datas, janelas, passado, conflitos e pausas sobre o estado atual, incluindo as sugestões já aceitas no mesmo lote. Abortos preservam o estado anterior. Isso protege a confirmação do assistente contra mudanças concorrentes; as demais edições continuam com a limitação já documentada para múltiplas abas.

`PrintExtras` estende o contrato interno de `makeSheet` com quatro booleanos opcionais. Ausência equivale a todos falsos. Demandas, metas e anotações dividem 25% da altura útil; caixinhas são desenhadas em cada ocorrência. Nenhuma opção altera `State` ou o formato de backup. Sem novos pacotes ou serviços.
