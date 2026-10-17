import { minutes, type Event } from './domain';

/** Only events in the same overlapping time group share column width. */
export function printLanes(events:Event[]):Map<string,{lane:number;count:number;span:number}>{
 const result=new Map<string,{lane:number;count:number;span:number}>();
 let group:Event[]=[],end=0;
 const flush=()=>{const ends:number[]=[],lanes=new Map<string,number>();for(const e of group){let lane=ends.findIndex(t=>t<=minutes(e.start));if(lane<0)lane=ends.length;ends[lane]=minutes(e.end);lanes.set(e.id,lane);}for(const e of group){const lane=lanes.get(e.id)!;let span=1;for(let next=lane+1;next<ends.length;next++){if(group.some(other=>lanes.get(other.id)===next&&minutes(e.start)<minutes(other.end)&&minutes(e.end)>minutes(other.start)))break;span++;}result.set(e.id,{lane,count:ends.length,span});}};
 for(const e of [...events].sort((a,b)=>a.start.localeCompare(b.start)||a.end.localeCompare(b.end))){if(group.length&&minutes(e.start)>=end){flush();group=[];}group.push(e);end=Math.max(group.length===1?0:end,minutes(e.end));}if(group.length)flush();return result;
}

function linesFor(text:string,width:number,size:number):string[]{
 const chars=Math.max(1,Math.floor(width/(size*.56)));const words=text.trim().split(/\s+/).flatMap(w=>w.match(new RegExp(`.{1,${chars}}`,'gu'))??[]);const lines:string[]=[];let line='';for(const word of words){if(line&&`${line} ${word}`.length>chars){lines.push(line);line=word;}else line+=(line?' ':'')+word;}if(line)lines.push(line);return lines;
}
export function fitPrintText(text:string,width:number,height:number,preferred:number):{lines:string[];size:number;lineHeight:number;truncated:boolean}{
 const minimum=Math.min(preferred,8);let size=preferred,lines:string[]=[];
 while(true){lines=linesFor(text,Math.max(1,width),size);const longest=Math.max(...text.trim().split(/\s+/).map(w=>Array.from(w).length));if((lines.length*size*1.15<=height&&longest*size*.56<=width)||size<=minimum)break;size=Math.max(minimum,size-.5);}
 const max=Math.max(0,Math.floor(height/(size*1.15))),truncated=lines.length>max;lines=lines.slice(0,max);if(truncated&&lines.length){const i=lines.length-1;lines[i]=lines[i].slice(0,-1)+'…';}return {lines,size,lineHeight:size*1.15,truncated};
}
