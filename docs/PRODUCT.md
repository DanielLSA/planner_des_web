# Produto e comportamentos esperados

## Propósito

Ajudar pessoas a organizar estudos, trabalho e vida pessoal, substituindo a montagem manual de cronogramas em planilhas. A agenda deve ser simples de ajustar e produzir uma folha útil para impressão.

## Capacidades atuais

- Agenda semanal/mensal e lista diária no celular; semana de domingo a sábado, português brasileiro e horários de 24 horas.
- Compromissos avulsos e séries semanais, categorias personalizáveis e filtro combinado.
- Demandas sem horário e propostas de rotina que dependem de aprovação.
- PDF, SVG, impressão e backup JSON.

## Regras verificáveis

| Área | Comportamento esperado |
| --- | --- |
| Compromissos | Título não vazio, datas válidas e término posterior ao início, no mesmo dia. Criar, editar, duplicar e excluir. |
| Recorrências | Dias da semana, início e fim opcional; edição/exclusão de uma ocorrência ou da série. Alterações de data não podem ser descartadas silenciosamente. |
| Navegação | Salvar mantém o período em planejamento. Para datas fora dele, oferecer Ver compromisso. Data inicial sugerida de nova recorrência fica na semana em tela, salvo edição manual. |
| Categorias | Editar nomes e cores; criar no formulário sem perder os campos. Categorias em rascunho são salvas junto com o compromisso e descartadas ao cancelar. |
| Filtros | Combinar categorias; clique repetido remove uma. Todas as categorias limpa a restrição. Agenda e exportação mostram a união selecionada. |
| Conflitos | Avisar sobreposição no horizonte de um ano e permitir manter. Horários adjacentes não conflitam. |
| Demandas | Agendar remove a demanda somente após gravação bem-sucedida. |
| Assistente | De 1 a 20 atividades prioritárias, duração de 5 a 720 min, 1 a 7 sessões, disponibilidade explícita e pausa de 0 a 120 min. Defaults: 30 min, uma sessão e pausa de 15 min. |
| Proposta | Não usar horários passados, mover compromissos ou dividir sessões; no máximo uma sessão por atividade por dia. Informar o que não coube. Cancelar não altera a agenda. |
| Confirmação | Salvar só as sugestões aprovadas, revalidando a agenda atual em transação única. Conflito ou falha não podem salvar parte do lote. |
| Exportação | Semana em grade ou mês em calendário, prévia A4/A3 ou medidas de 100 a 1000 mm, orientação e ajuste de texto. PDF direto deve ter uma página com as dimensões da prévia. |
| Papel | Extras opcionais e desmarcados inicialmente. Avisar quando o conteúdo não couber. Notas dos compromissos não entram na folha. |
| Backup | JSON versão 1, limite de 5 MB, validação antes de substituir dados, confirmação e oferta de exportar o estado anterior. |
| Persistência | Falha de gravação não pode ser apresentada como salvamento bem-sucedido. |
| Acessibilidade | Formulários rotulados, foco visível, edição por teclado e alternativa ao arrastar. Cor não deve ser o único identificador. |

## Privacidade e limites

Processamento de agenda no dispositivo; notas opcionais, sem rastreamento e sem fornecedor de IA. Exportação e eliminação disponíveis. Navegadores e dispositivos diferentes não compartilham a agenda. Pessoas usando o mesmo perfil de navegador podem acessar os mesmos dados. Manter backups e usar uma aba por vez.

Não há contas, sincronização, integração com WhatsApp/calendários externos, notificações ou importação de Excel/PDF. Não há garantia de funcionamento offline após recarregar. A hospedagem pode tratar metadados de acesso; o projeto não afirma conformidade jurídica auditada.

## Direções em discussão

Contas e sincronização opcionais, preservando o uso local. Melhorias de usabilidade, acessibilidade e exportação podem ser propostas em issues. Essas direções não representam funcionalidades prontas ou datas de entrega.
