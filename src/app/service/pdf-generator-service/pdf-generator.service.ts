import { Injectable } from '@angular/core';
import html2pdf from 'html2pdf.js';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { }

  downloadPdf(elementId: string, filename: string): void {
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
}
