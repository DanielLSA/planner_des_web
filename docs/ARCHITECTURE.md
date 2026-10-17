# Arquitetura

## Visão geral

Aplicação estática em TypeScript estrito e Vite, sem backend. A interface, as regras de domínio, a persistência e os exportadores têm responsabilidades separadas.

| Componente | Responsabilidade |
| --- | --- |
| `src/main.ts` | Agenda, formulários, categorias, filtros e navegação. |
| `src/domain.ts` | Tipos, calendário local, recorrências, conflitos e validação de backup. |
| `src/editing.ts` | Edição de eventos avulsos, séries e ocorrências destacadas. |
| `src/storage.ts` | Leitura e gravação em IndexedDB. |
| `src/scheduler.ts` | Cálculo e revalidação das propostas de rotina. |
| `src/routine.ts` | Fluxo de disponibilidade, prioridades e revisão da proposta. |
| `src/export.ts` e `src/print-layout.ts` | Folhas SVG, distribuição de blocos e ajuste do texto. |
| `src/pdf.ts` e `src/pdf-options.ts` | Download PDF com dimensões físicas explícitas. |

## Dados e recorrências

IndexedDB `planner-local`, versão 1, object store `state`, chave `current`. O estado contém categorias, eventos, demandas e preferência de introdução. Datas são valores locais `YYYY-MM-DD`; horários são `HH:mm`, sem conversão automática de fuso. Eventos começam e terminam no mesmo dia.

Séries guardam dias da semana, início, término opcional e exceções por data. Uma exceção aponta para `deleted` ou para um compromisso destacado. Editar toda a série respeita a nova data inicial. Editar a série a partir de um destaque remove esse destaque e incorpora a alteração à série, preservando as outras exceções. Excluir a série não exclui outros blocos anteriormente destacados.

O backup JSON é o contrato externo de dados: `version: 1`, listas `categories`, `events`, `demands` e booleano `onboarded`. A importação valida tamanho, IDs, referências, datas e campos antes de substituir o estado. Mudanças de formato exigem compatibilidade ou migração explícita.

## Persistência e concorrência

A aplicação atualiza o estado da interface após confirmar a gravação. A confirmação do assistente relê o banco, revalida o lote e salva em uma transação de leitura/escrita; falhas abortam o lote inteiro.

As demais edições não oferecem coordenação completa entre abas: versões antigas do estado podem sobrescrever mudanças de outra aba. Recomenda-se usar uma aba por vez. Não há sincronização entre navegadores ou dispositivos.

## Assistente de rotina

O cálculo é local, determinístico e não depende de modelos de IA. Processa atividades por prioridade, respeita disponibilidade explícita, pausas, recorrências e exceções. Escolhe primeiro dias menos ocupados, depois horários mais cedo e data anterior no desempate. Cada atividade tem no máximo uma sessão por dia. Compromissos existentes não são movidos.

Formulário e proposta ficam em memória até a confirmação. A disponibilidade é revalidada sobre o estado mais recente. O resultado aprovado vira um conjunto de compromissos avulsos. O cálculo não garante uma otimização global de todos os encaixes possíveis.

## Exportação

A prévia é um SVG com dimensões em milímetros e quatro unidades de viewBox por milímetro. A grade semanal distribui os limites de início/fim em faixas de altura igual; ela não representa duração em escala linear. Apenas grupos sobrepostos dividem a largura. Texto adapta quebra e tamanho dentro de um limite, com aviso de excesso. O mês usa de quatro a seis linhas de semanas.

PDF é gerado localmente com jsPDF e svg2pdf.js, carregados sob demanda, a partir da mesma folha SVG. O documento recebe uma página com largura, altura e orientação explícitas. A impressão física usa um iframe isolado e CSS `@page`; configurações da impressora podem prevalecer. PDF e SVG respeitam os filtros combinados e omitem notas dos compromissos.

Caixinhas, demandas, metas e anotações são opções exclusivas da exportação. As três seções inferiores, quando selecionadas, dividem 25% da área útil. Essas opções não alteram a agenda ou o formato do backup.

## Segurança e limites operacionais

Dados inseridos são escapados antes da renderização em HTML/SVG. A aplicação não inclui segredos, analytics ou envio de agendas a terceiros. Backups são arquivos privados sob responsabilidade de quem os exporta. O armazenamento local não oferece isolamento entre pessoas no mesmo perfil do navegador.

Não há API HTTP de dados, contas, notificações ou garantia de recarregamento offline. A distribuição é estática; hospedagens próprias devem avaliar seus logs e políticas de retenção. Consulte SECURITY.md.
