import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = 'https://example.com/api/image';

  constructor(private http: HttpClient) { }

  uploadImage(userId: number, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<string>(`${this.apiUrl}/upload/${userId}`, formData);
  }

  getProfilePictureUrl(userId: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/profile-picture/${userId}`);
  }
}
