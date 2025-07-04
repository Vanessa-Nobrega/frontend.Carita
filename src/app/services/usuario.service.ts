import { environment } from '../../../environments/environments.prod';  
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {


  // private baseUrl = 'https://backend-carita-1.onrender.com';



  constructor(private http: HttpClient) { }

  private getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`
    };
  }

  getUsuario(): Observable<any> {

  const token: any = localStorage.getItem("token");

  if (token) {
    const decoded: any = jwtDecode(token);
    const userId = decoded.id || decoded.userId;
    console.log(userId);
  }
    return this.http.get<any>(`${environment.apiUrl}/usuarios`, {
      headers: this.getAuthHeaders()
    });


  }

  getUsuarioPorId(id: number): Observable<any> {
    const token = localStorage.getItem('token');

  return this.http.get<any>(`${environment.apiUrl}/usuarios/${id}`, {
      headers: this.getAuthHeaders()
    });
}

  postUsuario(payload: any): Observable<any> {
    console.log("Payload enviado:", payload);
    return this.http.post<any>(`${environment.apiUrl}/usuarios`, payload);
  }

  updateUsuario(id: number, payload: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.put<any>(`${environment.apiUrl}/usuarios/${id}`, payload, {
      headers: this.getAuthHeaders()
    });
}

  loginUsuario(payload:any): Observable<any>{
  return this.http.post<any>(`${environment.apiUrl}/autenticacao`, payload);

}

desativarUsuario(id: number): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.post<any>(`${environment.apiUrl}/usuarios/${id}/desativar`, {}, {
      headers: this.getAuthHeaders()
    });
}

reativarConta(id: number): Observable<any> {
  return this.http.post<any>(`${environment.apiUrl}/usuarios/${id}/reativar`, {});
}


}
