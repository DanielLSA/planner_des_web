import {test} from 'node:test';
import assert from 'node:assert/strict';
import {jsPDF} from 'jspdf';
import {pdfPageOptions} from '../src/pdf-options';
test('PDF preserva medidas físicas de paisagem, retrato, A3 e personalizado',()=>{for(const [width,height]of [[297,210],[210,297],[420,297],[320,240],[180,360]]){const doc=new jsPDF(pdfPageOptions(width,height));assert.ok(Math.abs(doc.internal.pageSize.getWidth()-width)<.01);assert.ok(Math.abs(doc.internal.pageSize.getHeight()-height)<.01);assert.equal(doc.getNumberOfPages(),1);}});
