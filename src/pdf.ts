import { jsPDF } from 'jspdf';
import 'svg2pdf.js';
import {pdfPageOptions} from './pdf-options';

export async function downloadPreviewPdf(source:SVGSVGElement,width:number,height:number,filename:string):Promise<void>{
 const pdf=new jsPDF(pdfPageOptions(width,height));
 const wrapper=document.createElement('div');wrapper.style.cssText=`position:fixed;left:-10000px;top:0;width:${width}mm;height:${height}mm;pointer-events:none`;
 const svg=source.cloneNode(true) as SVGSVGElement;wrapper.append(svg);document.body.append(wrapper);
 try{await pdf.svg(svg,{x:0,y:0,width,height});pdf.save(filename);}finally{wrapper.remove();}
}
