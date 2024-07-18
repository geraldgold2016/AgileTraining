import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpEventType } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-foto-profilo',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, HeaderComponent, FooterComponent],
  templateUrl: './foto-profilo.component.html',
  styleUrls: ['./foto-profilo.component.css']
})
export class FotoProfiloComponent {
  selectedFile: File | null = null;
  retrievedImage: any = null;
  base64Data: any = null;
  retrieveResonse: any = null;
  message: string = '';
  imageName: string = '';

  constructor(private httpClient: HttpClient) { }

  // Gets called when the user selects an image
  public onFileChanged(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // Gets called when the user clicks on submit to upload the image
  public onUpload(): void {
    if (this.selectedFile) {
      console.log(this.selectedFile);

      // FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

      // Make a call to the Spring Boot Application to save the image
      this.httpClient.post('http://localhost:8080/image/upload', uploadImageData, { observe: 'response' })
        .subscribe((response) => {
          if (response.status === 200) {
            this.message = 'Image uploaded successfully';
            // Update the profile picture
            this.updateProfilePicture(this.selectedFile?.name);
          } else {
            this.message = 'Image not uploaded successfully';
          }
        });
    } else {
      this.message = 'No file selected';
    }
  }

  // Function to update the profile picture
  private updateProfilePicture(imageName: string | undefined): void {
    if (imageName) {
      this.httpClient.post('http://localhost:8080/user/updateProfilePicture', { imageName })
        .subscribe(
          res => {
            this.message = 'Profile picture updated successfully';
          },
          err => {
            this.message = 'Error updating profile picture';
          }
        );
    }
  }

  // Gets called when the user clicks on retrieve image button to get the image from backend
  public getImage(): void {
    if (this.imageName) {
      // Make a call to Spring Boot to get the Image Bytes.
      this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
        .subscribe(
          res => {
            this.retrieveResonse = 
            res;
            this.base64Data = this.retrieveResonse.picByte;
            this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          }
        );
    } else {
      this.message = 'Please enter an image name';
    }
  }
}
