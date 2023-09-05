import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

export class PdfGeneratorService {

  generatePdfFromHtml(htmlContent: string, fileName: string) {
    const pdf = new jspdf.jsPDF();

    const contentElement = document.getElementById('pdf-content');

    if (contentElement) {
      html2canvas(contentElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
        pdf.save(fileName + '.pdf');
      });
    } else {
      console.error("Element with ID 'pdf-content' not found.");
    }
  }
}
