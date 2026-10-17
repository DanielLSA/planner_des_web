# Estado — 16/10/2026

Implementado: aplicação estática com agenda semanal/mensal e lista diária responsiva, cadastro guiado, categorias, recorrências semanais e exceções, duplicação/exclusão, movimentação entre dias, demandas, backup validado, restauração, solicitação de persistência e impressão semanal.

## Evidências

- Seis testes de domínio passaram: calendário, recorrências, conflitos, validação e integridade de backups.
- TypeScript estrito e compilação Vite de produção passaram.
- Teste automatizado no Edge passou: cadastro, recarregamento, exceção de série, demandas, download, restauração válida, rejeição inválida, falha simulada de armazenamento, mês, conteúdo de impressão e viewport de 390px sem rolagem horizontal.
- Capturas desktop e mobile inspecionadas. Identificado e corrigido seletor de arquivo que sobrepunha a regra HTML hidden.
- Instalação npm reportou zero vulnerabilidades no momento da verificação; não equivale a auditoria de segurança.

## Limites e próxima entrega

- IA, contas, sincronização, importação de Excel/PDF e funcionamento offline após recarregamento não fazem parte desta versão.
- Conflitos são verificados por um ano; sobreposições são permitidas. Arrastar preserva horário. Edição de série preserva data inicial.
- Usar uma aba por vez: a versão atual não oferece coordenação de edição concorrente entre abas.
- Impressão conferida quanto ao conteúdo; variações entre impressoras não foram auditadas. Não foi executada auditoria completa de acessibilidade.
- A consulta ao Git da pasta original retornou que não é um repositório válido; histórico não foi alterado nem auditado. Revogar a chave do protótipo no provedor antes de tornar qualquer cópia histórica pública.
- Não houve publicação, criação de conta, serviço pago ou troca do modelo da conversa.
- Próximo passo: aceite com rotina real cadastrada pelo usuário, configuração do repositório/canal de segurança e hospedagem HTTPS.

## Evolução — cronograma para impressão

Exportação semanal em grade e mensal em calendário, prévia, A4/A3, orientação, dimensões personalizadas, três tamanhos de texto, SVG para download e impressão/salvamento PDF via navegador. Conteúdo excedente sinalizado; notas omitidas. Nove testes passaram e build TypeScript/Vite concluído. Teste Edge validou período, dimensões, orientação, download SVG e documento do iframe de impressão; prévia semanal inspecionada com dados fictícios. Não houve teste em impressora física.

## Evolução — assistente de rotina e extras opcionais

Implementado **Planejar rotina** em diálogo próprio, com prioridades reordenáveis, disponibilidade explícita, pausa, revisão, aprovação parcial e cancelamento. Sugestões locais preservam a agenda e informam o que não coube. Confirmação relê e revalida em transação atômica; formulário e proposta não são persistidos.

Implementado **Extras para o papel**, recolhido e desmarcado por padrão: caixinhas de realizado, demandas, metas à mão e anotações. As três seções inferiores compartilham 25% da área útil, somente quando selecionadas. Sem poluição da agenda ou novos serviços.

Verificações: 21 testes de domínio/cálculo/exportação passaram, incluindo as 16 combinações de extras em semana/mês, datas, pausas, prioridades, exceções, espaço insuficiente, seleção vazia e revalidação. Build TypeScript/Vite passou. Edge validou cancelamento, reordenação, aprovação parcial, conflito concorrente sem gravação parcial, rollback por erro simulado, ajustes/regeneração com dados atuais e ausência de erros de execução. Fluxos anteriores de agenda/backup e exportação também revalidados. Capturas desktop/celular inspecionadas. Impressora física não testada.

Limites: sugestões são um encaixe determinístico, não uma otimização global garantida; até 20 atividades, um intervalo disponível por dia e até uma sessão da mesma atividade por dia. Sem metas persistentes ou reorganização de blocos existentes. Dados e backup continuam na versão 1.

## Publicação — 17/10/2026

Publicado na Vercel (projeto planner-des-web, equipe Daniel Aires, plano Hobby): https://planner-des-web.vercel.app/ . Repositório conectado à branch main com integração limitada ao DanielLSA/planner_des_web. Deploy inicial do commit 85fcce6 concluído. Verificados carregamento da agenda, disponibilidade do armazenamento local e prévia A4 da exportação no endereço público. Os dados continuam apenas no navegador, sem contas ou sincronização. Dados de localhost podem ser transferidos por exportação/importação de backup.

## Correção — categorias em telas baixas

Barra lateral desktop agora permite rolagem vertical independente e impede compressão dos itens. Categorias com nomes longos quebram linha. Layout mobile preservado.

## Correção — edição de data, notas e série

Removida a substituição silenciosa da nova data pelo início anterior da série. Alterações de notas e conversão de compromisso avulso em recorrente preservadas. Edição isolada de uma série desabilita controles de repetição e explica como alterar a série inteira. Ocorrência destacada permite editar sua série original. Após salvar, a agenda navega para a data escolhida e confirma o salvamento.

Verificados no navegador: compromisso único → nova data + série + notas, recarregamento e edição de toda a série com nova data e notas. 25 testes passaram, incluindo quatro regressões novas. Build TypeScript/Vite passou.

## Categorias — acesso e cadastro no compromisso

Botão Editar explícito na seção Categorias, com edição de nome e cor existente. Formulário de compromisso oferece Nova categoria com nome/cor; Usar categoria seleciona o rascunho sem perder os outros campos. Categorias novas são gravadas na mesma operação do compromisso; cancelar o formulário não grava rascunhos. Nomes vazios, novos duplicados e limite de 100 são validados no cadastro inline.

## Correção — semana estável e múltiplas categorias

Cadastro/edição não navegam mais para a data salva. Compromissos fora do período oferecem Ver compromisso. Data inicial de novas recorrências parte do primeiro dia marcado na semana em tela, somente se o usuário não editou a data. Filtros agora combinam categorias e mantêm a rolagem lateral ao alternar. Exportação semanal/mensal e legenda respeitam a seleção combinada.

26 testes passaram e build concluído. No navegador, validado salvar em novembro mantendo a semana de outubro, abrir novo formulário na mesma semana, sugestão de segunda-feira dessa semana e preservação de data manual. Seleção simultânea Trabalho/Estudos refletida na prévia de exportação.

## Correção — espaço e textos na impressão semanal

Largura dos blocos agora é calculada por grupo de sobreposição, sem estreitar os demais horários do dia. Colunas livres adjacentes são aproveitadas quando possível. Texto semanal centralizado, com quebra de linha, espaçamento adaptativo para blocos curtos e redução limitada de fonte; conteúdo excessivo ainda gera aviso. Verificadas 141 ocorrências fictícias em A4 sem avisos de corte; exemplo visual inspecionado. Acrescentadas quatro regressões de layout. Sem teste em impressora física.

## Correção — orientação e tamanho do PDF

Adicionado Baixar PDF direto a partir do SVG da prévia, com jsPDF/svg2pdf.js em carregamento sob demanda. Página recebe dimensões físicas e orientação explícitas. Imprimir separado, com @page A4/A3 paisagem/retrato ou dimensões personalizadas. Cores de fundo suavizadas convertidas em RGB opaco equivalente para preservar fidelidade na conversão.

PDF real baixado no navegador e inspecionado: uma página A4 de 297 × 210 mm. Arquivo renderizado para revisão visual. Testes de construção de PDF verificam A4 paisagem/retrato, A3 e dimensões personalizadas; 31 testes passaram. O ambiente levou tempo excessivo para entregar o evento de download; não há medição de desempenho representativa. Impressora física não testada.
