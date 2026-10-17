export type Category = { id: string; name: string; color: string };
export type Event = { id: string; title: string; categoryId: string; date: string; start: string; end: string; notes: string; days: number[]; until: string; exceptions: Record<string, 'deleted' | string> };
export type Demand = { id: string; title: string };
export type State = { version: 1; categories: Category[]; events: Event[]; demands: Demand[]; onboarded: boolean };
export const id = () => crypto.randomUUID();
export function initial(): State { return { version: 1, categories: [{id:'work',name:'Trabalho',color:'#5379ac'},{id:'study',name:'Estudos',color:'#9673b8'},{id:'life',name:'Pessoal',color:'#b47b48'},{id:'health',name:'Bem-estar',color:'#418b78'}],events:[],demands:[],onboarded:false}; }
export function iso(d: Date): string { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
export function date(s: string): Date { const [y,m,d]=s.split('-').map(Number); return new Date(y,m-1,d,12); }
export function add(s: string,n: number): string { const d=date(s); d.setDate(d.getDate()+n); return iso(d); }
export function week(s: string): string[] { const start=add(s,-date(s).getDay()); return Array.from({length:7},(_,i)=>add(start,i)); }
export function minutes(s: string): number { const [h,m]=s.split(':').map(Number); return h*60+m; }
export function occurs(e: Event,s: string): boolean { return !e.exceptions[s] && (e.days.length ? s>=e.date && (!e.until || s<=e.until) && e.days.includes(date(s).getDay()) : e.date===s); }
export function overlaps(a: Event,b: Event): boolean { return minutes(a.start)<minutes(b.end)&&minutes(b.start)<minutes(a.end); }
const validDate=(s: unknown): s is string=>typeof s==='string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && iso(date(s))===s;
const validTime=(s: unknown): s is string=>typeof s==='string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(s);
export function eventError(e: Event): string { if(!e.title.trim() || e.title.length>160) return 'Informe um título de até 160 caracteres.'; if(!validDate(e.date)||!validTime(e.start)||!validTime(e.end)||minutes(e.end)<=minutes(e.start)) return 'O término deve ser posterior ao início, no mesmo dia.'; if(e.until && (!validDate(e.until)||e.until<e.date)) return 'O fim da repetição deve ser igual ou posterior à data inicial.'; return ''; }
export function parseBackup(raw: string): State {
 if(raw.length>5_000_000) throw Error('O arquivo excede o limite de 5 MB.');
 const s=JSON.parse(raw) as State;
 if(s?.version!==1 || !Array.isArray(s.categories)||!Array.isArray(s.events)||!Array.isArray(s.demands)||typeof s.onboarded!=='boolean') throw Error('Formato de backup incompatível.');
 if(!s.categories.length || s.categories.length>100 || s.events.length>10000 || s.demands.length>10000)throw Error('Quantidade de registros inválida.');
 const ids=new Set<string>(); const unique=(v: unknown)=>{if(typeof v!=='string'||! /^[a-zA-Z0-9_-]{1,100}$/.test(v)||ids.has(v)) throw Error('Identificadores inválidos ou repetidos.'); ids.add(v);};
 for(const c of s.categories){unique(c.id);if(typeof c.name!=='string'||!c.name.trim()||c.name.length>60||!/^#[0-9a-f]{6}$/i.test(c.color))throw Error('Categoria inválida.');}
 for(const e of s.events){unique(e.id);if(typeof e.title!=='string'||typeof e.notes!=='string'||e.notes.length>4000||!Array.isArray(e.days)||e.days.some(n=>!Number.isInteger(n)||n<0||n>6)||new Set(e.days).size!==e.days.length||typeof e.until!=='string'||!e.exceptions||typeof e.exceptions!=='object'||Array.isArray(e.exceptions)||eventError(e)||!s.categories.some(c=>c.id===e.categoryId))throw Error('Compromisso inválido.');for(const [k,v] of Object.entries(e.exceptions))if(!validDate(k)||typeof v!=='string'||(v!=='deleted'&&!s.events.some(x=>x.id===v)))throw Error('Exceção de recorrência inválida.');}
 for(const d of s.demands){unique(d.id);if(typeof d.title!=='string'||!d.title.trim()||d.title.length>160)throw Error('Demanda inválida.');}
 return s;
}
