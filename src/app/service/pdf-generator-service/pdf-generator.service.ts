import { Injectable } from '@angular/core';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import html2canvas from 'html2canvas';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  constructor() {}

  async downloadPdf(elementId: string, filename: string) {
    const { default: html2pdf } = await import('html2pdf.js');
    const element = document.getElementById(elementId);
    if (element) {
      const options = {
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
      html2pdf().from(element).set(options).save();
    }
  }

  public generatePdf(): void {
    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).download('example.pdf');
  }

  private async getDocumentDefinition() {
    const chartImage1 = await this.captureChart('chart1');

    return {
      content: [
        {
          text: 'Title',
          style: 'header',
        },
        {
          text: 'This is a sample paragraph to be included in the PDF.',
          style: 'paragraph',
        },
        {
          text: 'Here are some charts:',
          style: 'paragraph',
        },
        {
          image: chartImage1,
          width: 500,
          style: 'image',
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        paragraph: {
          fontSize: 12,
          margin: [0, 0, 0, 10],
        },
        image: {
          margin: [0, 10, 0, 10],
        },
      },
    };
  }

  private async captureChart(chartId: string): Promise<string> {
    const chartElement = document.getElementById(chartId);
    if (!chartElement) {
      console.error(`Element with id ${chartId} not found.`);
      return '';
    }
    const canvas = await html2canvas(chartElement);
    return canvas.toDataURL('image/png');
  }
}
