import { environment } from '../../../environments/environments.prod';  
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { pontoArrecadacao } from '../models/pontosArrecadacao.model';
 
@Injectable({
  providedIn: 'root'
})

export class pontoArrecadacaoService {
 
  // private baseUrl = 'https://backend-carita-1.onrender.com'; 
 
 
  constructor(private http: HttpClient) { }
 
getPontos(): Observable<pontoArrecadacao[]> {
  return this.http.get<{ pontosArrecadacao: pontoArrecadacao[] }>(`${environment.apiUrl}/pontosArrecadacao`)
      .pipe(
        map(response => response.pontosArrecadacao)
      );
}

createPonto(ponto: pontoArrecadacao): Observable<pontoArrecadacao> {
   return this.http.post<pontoArrecadacao>(`${environment.apiUrl}/pontosArrecadacao`, ponto);
}

updatePonto(id: number, ponto: pontoArrecadacao): Observable<pontoArrecadacao> {
  return this.http.put<pontoArrecadacao>(`${environment.apiUrl}/pontosArrecadacao/${id}`, ponto);
}


}