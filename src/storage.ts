import { initial, type State } from './domain';
let db: IDBDatabase;
export async function open(): Promise<State> { return new Promise((resolve,reject)=>{const r=indexedDB.open('planner-local',1);r.onupgradeneeded=()=>r.result.createObjectStore('state');r.onerror=()=>reject(r.error);r.onblocked=()=>reject(Error('Feche outras abas do Planner e tente novamente.'));r.onsuccess=()=>{db=r.result;db.onversionchange=()=>db.close();const q=db.transaction('state').objectStore('state').get('current');q.onsuccess=()=>resolve(q.result??initial());q.onerror=()=>reject(q.error);};}); }
export async function save(s: State): Promise<void> { return new Promise((resolve,reject)=>{const t=db.transaction('state','readwrite');t.objectStore('state').put(s,'current');t.oncomplete=()=>resolve();t.onerror=()=>reject(t.error);t.onabort=()=>reject(t.error);}); }

/** Read, revalidate and write in one transaction; no partial proposal can be saved. */
export function update(transform:(current:State)=>State):Promise<State>{
 return new Promise((resolve,reject)=>{const t=db.transaction('state','readwrite');const store=t.objectStore('state');const q=store.get('current');let next:State,reason:unknown;
 q.onsuccess=()=>{try{next=transform(q.result??initial());store.put(next,'current');}catch(e){reason=e;t.abort();}};
 t.oncomplete=()=>resolve(next);t.onabort=()=>reject(reason??t.error??Error('Não foi possível salvar a proposta.'));t.onerror=()=>reject(reason??t.error);
 });
}

export function read():Promise<State>{return new Promise((resolve,reject)=>{const q=db.transaction('state').objectStore('state').get('current');q.onsuccess=()=>resolve(q.result??initial());q.onerror=()=>reject(q.error);});}
