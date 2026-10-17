import { id, type Event, type State } from './domain';

export function seriesFor(state:State,event:Event):Event|undefined {
 return event.days.length?event:state.events.find(e=>e.days.length&&Object.values(e.exceptions).includes(event.id));
}

/** Applies edits without silently discarding the selected date or recurrence. */
export function applyEdit(state:State,original:Event|undefined,edited:Event,scope:string,occurrence:string):{next:State;entry:Event}{
 const next=structuredClone(state),entry=structuredClone(edited);
 const series=original?seriesFor(state,original):undefined;
 if(series&&scope==='all'){
  entry.id=series.id;entry.exceptions=structuredClone(series.exceptions);
  if(original!.id!==series.id){for(const [day,target]of Object.entries(entry.exceptions))if(target===original!.id)delete entry.exceptions[day];next.events=next.events.filter(e=>e.id!==original!.id);}
 }else if(original?.days.length){
  entry.id=id();entry.days=[];entry.until='';entry.exceptions={};next.events.find(e=>e.id===original.id)!.exceptions[occurrence]=entry.id;
 }
 const index=next.events.findIndex(e=>e.id===entry.id);if(index<0)next.events.push(entry);else next.events[index]=entry;
 return {next,entry};
}
