import { environment } from '../../../environments/environments.prod';  
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})

export class ParceirosService {
 
  // private baseUrl = 'https://backend-carita-1.onrender.com'; // URL do seu backend
 
 
  constructor(private http: HttpClient) { }
 
  getParceiros(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/parceiros`);
  }
 
postParceiros(payload: any): Observable<any> {
   return this.http.post<any>(`${environment.apiUrl}/parceiros/cadastrar-com-ponto`, payload);
}

getParceiroByUsuarioId(idUsuario: number | string): Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/parceiros/usuario/${idUsuario}`);

}

}