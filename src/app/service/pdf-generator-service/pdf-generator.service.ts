import { Injectable } from '@angular/core';
import html2pdf from 'html2pdf.js';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { }

  async downloadPdf(elementId: string, filename: string) {
    const { default: html2pdf } = await import('html2pdf.js');
    const element = document.getElementById(elementId);
    if (element) {
      const options = {
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      html2pdf().from(element).set(options).save();
    }
  }

  /*async downloadPdf(content: string) {
    const { default: html2pdf } = await import('html2pdf.js');
    const options = {
      margin: 1,
      filename: 'generated.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(content).set(options).save();
  }*/
}
