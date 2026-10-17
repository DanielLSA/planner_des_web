import { date, eventError, id, iso, minutes, occurs, week, type Event, type State } from './domain';

export type Activity = { title: string; categoryId: string; duration: number; sessions: number };
export type Availability = { date: string; start: string; end: string };
export type PlanInput = { anchor: string; activities: Activity[]; availability: Availability[]; pause: number };
export type Proposal = { events: Event[]; missing: { title: string; count: number; reason: string }[] };
const hhmm=(n:number)=>`${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;
const timeValid=(v:string)=>/^([01]\d|2[0-3]):[0-5]\d$/.test(v);
function nowMinute(now:Date){return now.getHours()*60+now.getMinutes()+(now.getSeconds()||now.getMilliseconds()?1:0);}
function blocks(state:State,day:string,extra:Event[]=[]){return [...state.events,...extra].filter(e=>occurs(e,day)).sort((a,b)=>a.start.localeCompare(b.start));}
export function inputError(state:State,input:PlanInput):string {
 const days=week(input.anchor);
 if(!input.activities.length||input.activities.length>20)return 'Inclua de uma a vinte atividades.';
 if(!Number.isInteger(input.pause)||input.pause<0||input.pause>120)return 'Informe uma pausa de 0 a 120 minutos.';
 if(!input.availability.length)return 'Selecione pelo menos um dia disponível.';
 if(new Set(input.availability.map(w=>w.date)).size!==input.availability.length)return 'Use um intervalo por dia.';
 for(const w of input.availability)if(!days.includes(w.date)||!timeValid(w.start)||!timeValid(w.end)||minutes(w.end)<=minutes(w.start))return 'Confira os horários disponíveis: o fim deve ser posterior ao início.';
 for(const a of input.activities)if(!a.title.trim()||a.title.trim().length>160||!state.categories.some(c=>c.id===a.categoryId)||!Number.isInteger(a.duration)||a.duration<5||a.duration>720||!Number.isInteger(a.sessions)||a.sessions<1||a.sessions>7)return 'Confira as atividades: título, categoria, duração de 5 a 720 minutos e uma a sete sessões.';
 return '';
}
function earliest(state:State,day:Availability,duration:number,pause:number,extra:Event[],now:Date):number|null {
 const today=iso(now);if(day.date<today)return null;
 let start=Math.max(minutes(day.start),day.date===today?nowMinute(now):0);const limit=minutes(day.end);
 for(const e of blocks(state,day.date,extra)){const from=minutes(e.start)-pause,to=minutes(e.end)+pause;if(to<=start)continue;if(start+duration<=from)break;start=Math.max(start,to);}
 return start+duration<=limit?start:null;
}
function occupied(state:State,s:string,extra:Event[]):number {
 let total=0,end=0;for(const e of blocks(state,s,extra)){const a=minutes(e.start),b=minutes(e.end);total+=Math.max(0,b-Math.max(a,end));end=Math.max(end,b);}return total;
}
export function propose(state:State,input:PlanInput,now=new Date()):Proposal {
 const error=inputError(state,input);if(error)throw Error(error);
 const result:Proposal={events:[],missing:[]};
 for(const a of input.activities){const used=new Set<string>();let placed=0;
  for(let i=0;i<a.sessions;i++){
   const choices=input.availability.filter(w=>!used.has(w.date)).map(w=>({w,start:earliest(state,w,a.duration,input.pause,result.events,now),load:occupied(state,w.date,result.events)})).filter(x=>x.start!==null).sort((a,b)=>a.load-b.load||a.start!-b.start!||a.w.date.localeCompare(b.w.date));
   const choice=choices[0];if(!choice)break;const start=choice.start!;result.events.push({id:id(),title:a.title.trim(),categoryId:a.categoryId,date:choice.w.date,start:hhmm(start),end:hhmm(start+a.duration),notes:'',days:[],until:'',exceptions:{}});used.add(choice.w.date);placed++;
  }
  if(placed<a.sessions)result.missing.push({title:a.title.trim(),count:a.sessions-placed,reason:'Sem dias distintos com espaço suficiente para a duração e a pausa escolhidas. Horários passados não são usados.'});
 }
 return result;
}
export function validateSelection(state:State,input:PlanInput,selected:Event[],now=new Date()):void {
 const error=inputError(state,input);if(error)throw Error(error);
 if(!selected.length)throw Error('Selecione pelo menos uma sugestão.');
 const accepted:Event[]=[];
 for(const e of selected){const w=input.availability.find(w=>w.date===e.date);if(!w||eventError(e)||e.days.length||!state.categories.some(c=>c.id===e.categoryId)||state.events.some(x=>x.id===e.id)||accepted.some(x=>x.id===e.id)||minutes(e.start)<minutes(w.start)||minutes(e.end)>minutes(w.end)||e.date<iso(now)||(e.date===iso(now)&&minutes(e.start)<nowMinute(now)))throw Error('Uma sugestão deixou de ser válida. Gere uma nova proposta.');
  if(blocks(state,e.date,accepted).some(x=>minutes(e.start)<minutes(x.end)+input.pause&&minutes(e.end)>minutes(x.start)-input.pause))throw Error('A agenda mudou ou a pausa não cabe mais. Gere uma nova proposta.');accepted.push(e);
 }
}
