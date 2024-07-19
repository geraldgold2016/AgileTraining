import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-certificato-corso',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './certificato-corso.component.html',
  styleUrl: './certificato-corso.component.css'
})
export class CertificatoCorsoComponent 
{
  downloadPDF() 
  {
    const certificate = document.getElementById('contenitoreCertificato');
    
    if (certificate) 
    {
      html2canvas(certificate).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Dimensioni della pagina PDF
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Dimensioni dell'immagine
        const imgWidth = pageWidth - 40; // Margine di 20mm a destra e sinistra
        const imgHeight = canvas.height * imgWidth / canvas.width;

        // Posizione dell'immagine centrata
        const x = (pageWidth - imgWidth) / 2;
        const y = (pageHeight - imgHeight) / 2;

        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
        pdf.save('certificato.pdf');
      }).catch(error => {
        console.error('Errore durante la generazione del PDF', error);
      });
    } 
    else 
    {
      console.error('Elemento #contenitoreCertificato non trovato');
    }
  }

  stampaPDF() {
    const certificate = document.getElementById('contenitoreCertificato');
    
    if (certificate) {
      html2canvas(certificate).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        // Dimensioni della pagina PDF
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Dimensioni dell'immagine
        const imgWidth = pageWidth - 40; // Margine di 20mm a destra e sinistra
        const imgHeight = canvas.height * imgWidth / canvas.width;

        // Posizione dell'immagine centrata
        const x = (pageWidth - imgWidth) / 2;
        const y = (pageHeight - imgHeight) / 2;

        // Aggiungi l'immagine come pagina al PDF
        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);

        // Salva il PDF temporaneamente
        const pdfFile = new Blob([pdf.output('blob')], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfFile);

        // Naviga l'utente alla pagina del PDF
        window.open(pdfUrl, '_blank');
      }).catch(error => {
        console.error('Errore durante la generazione del PDF', error);
      });
    } else {
      console.error('Elemento #contenitoreCertificato non trovato');
    }
  }

}
