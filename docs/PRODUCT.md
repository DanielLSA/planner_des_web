# PRD — Planner 1.0

Público: pessoas que organizam estudos, trabalho e vida pessoal em planilhas. Problema: manter e ajustar horários recorrentes exige trabalho manual e não oferece edição prática por ocorrência.

Resultado esperado: cadastrar a semana típica, editar uma data sem alterar toda a série, recarregar sem perder dados e restaurar uma exportação válida. Tela principal semanal limpa; visão mensal e uso em celular. Exemplos públicos fictícios. Idioma pt-BR, 24 horas, semana de domingo a sábado.

Escopo: agenda, recorrências semanais, exceções, categorias, demandas, impressão, backup. Fora: IA, contas, sincronização, notificações e importação de Excel/PDF. A aplicação não promete funcionamento offline após fechar ou recarregar sem rede.

# PRS — requisitos verificáveis

| ID | Comportamento / aceite |
| --- | --- |
| RF01 | Criar, editar, duplicar e excluir blocos; rejeitar título vazio, data impossível e fim anterior ou igual ao início. |
| RF02 | Repetição por dia da semana, início e fim opcional; alterar/excluir ocorrência isolada ou série inteira. |
| RF03 | Avisar conflitos no horizonte de um ano; permitir manter. Horários adjacentes não conflitam. |
| RF04 | Editar nomes e cores de categorias e criar novas; cores não são o único identificador. |
| RF05 | Demandas sem horário; agendar remove a demanda somente após salvamento. |
| RF06 | Persistir atomicamente antes de atualizar a interface; erro de armazenamento não simula sucesso. |
| RF07 | Backup JSON versionado, validado e limitado a 5 MB; restauração confirma substituição e oferece exportação anterior. |
| RF08 | Exportar semana em grade de horários ou mês em calendário, respeitando recorrências, exceções e filtro. Prévia em A4/A3, retrato/paisagem ou medidas de 100 a 1000 mm; escala de texto 80/100/120%; imprimir/salvar PDF pelo navegador e baixar SVG. Margens internas de 8 mm. Avisar quando textos não couberem; não exportar notas. |
| RN01 | Compromissos começam e terminam no mesmo dia; datas e horários são locais de calendário. |
| RN02 | Arrastar move somente a ocorrência e preserva horário; formulário e teclado oferecem alternativa. |
| RN03 | Edição de série inteira respeita a data inicial escolhida e preserva as outras exceções; editar a série a partir de uma ocorrência destacada incorpora as alterações à série e remove o destaque antigo. |
| RNF01 | Sem segredos, rastreadores, IA ou fontes remotas; texto do usuário escapado ao renderizar HTML. |
| RNF02 | Teclado, foco visível, formulários rotulados, diálogos modais e lista diária no celular. |

## Privacidade

Titular e usuário: pessoa que cria a agenda; notas podem citar terceiros. Finalidade: organização pessoal local. Dados mínimos: título, categoria, data/horário; notas opcionais. Retenção: até exclusão pelo usuário ou navegador. Exportação e eliminação disponíveis. Sem servidor de dados ou fornecedor de IA. A hospedagem pública deverá documentar seus próprios logs e retenção antes do lançamento. Não há afirmação de conformidade jurídica auditada. Backups são arquivos privados sob controle do usuário.

## Evolução — rotina assistida e papel opcional

Objetivo: ajudar a construir uma semana possível com fluxo sob demanda, preservando a interface de agenda. Assistente local sem IA e sem reorganização dos compromissos existentes. Critério de sucesso: gerar proposta sem mutação, aprovar parte dela e exportar cronograma simples ou com extras escolhidos.

| ID | Comportamento / aceite |
| --- | --- |
| RF09 | Planejar a semana selecionada com 1–20 atividades ordenáveis, categoria, duração inteira de 5–720 min e 1–7 sessões por atividade. Defaults: 30 min e uma sessão. |
| RF10 | Exigir dias explicitamente selecionados, com um intervalo válido por dia. Pausa inteira de 0–120 min, default 15. Dias desmarcados não oferecem disponibilidade. |
| RF11 | Respeitar toda a agenda, inclusive filtros, recorrências e exceções. Ignorar passado. Encaixar atividades por prioridade; distribuir no máximo uma sessão por atividade por dia, preferindo menos ocupação total diária, horário mais cedo e data anterior no desempate. Não mover nem dividir blocos. |
| RF12 | Mostrar sugestões temporárias, sessões que não couberam e motivo. Desmarcar permite aprovação parcial; voltar preserva o formulário; cancelar não grava. |
| RF13 | Revalidar o estado mais recente e o horário atual em transação de leitura/escrita. Aprovação válida gera compromissos avulsos; conflito, lote vazio ou falha abortam o lote inteiro. Formulário e proposta não entram no backup. |
| RF14 | Extras de impressão recolhidos e desmarcados: caixinhas, demandas, metas à mão e anotações. Nenhum desses extras aparece na agenda digital. |
| RF15 | Seções inferiores selecionadas compartilham igualmente 25% da área útil. Caixinhas sozinhas não reduzem a grade. Prévia e exportação acompanham as escolhas, com aviso para conteúdo que não caiba. |

Dados adicionais do assistente são temporários, processados somente no dispositivo e descartados ao fechar. Metas no papel são campos para preenchimento manual. Sem acompanhamento digital de execução ou novos fornecedores. Verificação: testes puros do cálculo e exportador, e testes de navegador para cancelamento, reordenação, aprovação parcial, concorrência, rollback e desktop/celular.

## Contexto de planejamento e filtro combinado

Salvar compromissos preserva a semana/mês em tela e o dia de referência do próximo cadastro. Quando a data salva estiver fora da visualização, oferecer Ver compromisso sem navegar automaticamente. Ao definir dias de repetição de um compromisso sem série original, se a data não foi alterada manualmente, sugerir o primeiro dia marcado dentro da semana em planejamento. Datas preenchidas manualmente prevalecem.

Filtro de categorias permite múltiplas seleções com estado pressionado visível; clicar de novo remove uma seleção. Todas as categorias limpa a restrição. Nenhuma seleção específica significa todas. Semana, mês, listas e exportação mostram a união das categorias escolhidas. O cálculo do assistente continua considerando a agenda inteira.

Impressão semanal: somente blocos em grupos sobrepostos dividem a largura; horários isolados usam a coluna inteira. Títulos aproveitam largura/altura com alinhamento central e fonte adaptativa limitada. Blocos curtos devem manter ao menos uma linha quando houver espaço legível; excesso continua sinalizado na prévia.

PDF direto: Baixar PDF gera a mesma folha vetorial da prévia em uma página com largura/altura físicas iguais às selecionadas, em paisagem/retrato ou tamanho personalizado. Não depende da orientação do diálogo de impressão. Imprimir é ação separada, com @page explícito para A4/A3. Conversão local, sem envio a terceiros.
