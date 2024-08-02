import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-certificato-corso',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './certificato-corso.component.html',
  styleUrl: './certificato-corso.component.css'
})
export class CertificatoCorsoComponent 
{
  userId: string = '';
  idCorso: string = '';
  nomeCorso: string = '';
  nomeUtente: string = '';
  cognomeUtente: string = '';

  isIssued: boolean = true;
  certificateKey: string = '';
  testDate: string = '';
  error: string = '';

  constructor(private dataService: DataService) {};

  ngOnInit(): void 
  {
    // Ottengo l'idUtente e il Token dal Local Storage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId != null) {
      this.userId = storedUserId;
    } else {
      this.userId = 'idUtente non trovato';
    }
  
    // Ottengo l'idCorso dal Local Storage
    const storedCorsoId = localStorage.getItem('selectedCourseId');
    if (storedCorsoId != null) {
      this.idCorso = storedCorsoId;
    } else {
      this.idCorso = 'idCorso non trovato';
    }


    // Richiamo il metodo getCoursesById per ottenere il nome del corso
    this.dataService.getCoursesById(this.idCorso).subscribe({
      next: (data: any) => {
        this.nomeCorso = data.courseName;
      },
      error: (err: any) => {
        console.error('Errore nel recupero del corso', err);
        this.error = 'Errore nel recupero del corso';
      }
    });
    
    // Richiamo il metodo getUserById per ottenere il nome dell'utente
    this.dataService.getUtenteById(this.userId).subscribe({
      next: (data: any) => {
        this.nomeUtente = data.name;
        this.cognomeUtente = data.surname;
      },
      error: (err: any) => {
        console.error("Errore nel recupero dell'utente", err);
        this.error = "Errore nel recupero dell'utente";
      }
    });

    // Richiamo il metodo getCertificate per ottenere il certificato
    this.dataService.getCertificate(this.idCorso, this.userId).subscribe({
      next: (data: any) => {
        this.isIssued = data.isIssued;
        this.certificateKey = data.certificateKey;
        this.testDate = data.testDate;
      },
      error: (err: any) => {
        console.error('Errore nel recupero del certificato', err);
        this.error = 'Errore nel recupero del certificato';
      }
    });
    
  }


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

  stampaPDF() 
  {
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
