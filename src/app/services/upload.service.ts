import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private baseUrl = 'https://seu-backend.onrender.com/upload';

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ url: string }>(this.baseUrl, formData);
  }
}
