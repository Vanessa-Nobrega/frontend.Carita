import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-desativar-conta',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './desativar-conta.component.html',
  styleUrl: './desativar-conta.component.css'
})
export class DesativarContaComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token'); // ou sessionStorage.clear();
    this.router.navigate(['/pagina-login']); // redireciona para a página de login
  }
}
