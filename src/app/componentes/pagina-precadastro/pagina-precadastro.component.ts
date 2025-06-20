import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { OrganizacoesService } from '../../services/organizacoes.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-pagina-precadastro',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pagina-precadastro.component.html',
  styleUrl: './pagina-precadastro.component.css'
})
export class PaginaPrecadastroComponent implements OnInit {

  constructor(
    private router: Router,
    private organizacoesService: OrganizacoesService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      // Se não tiver token, redireciona para login (ou onde quiser)
      this.router.navigate(['/pagina-login']);
      return;
    }

    let userId: number | null = null;

    try {
      const decoded: any = jwtDecode(token);
      userId = decoded.id;
    } catch (error) {
      console.error('Token inválido', error);
      this.router.navigate(['/pagina-login']);
      return;
    }

    if (!userId) {
      this.router.navigate(['/pagina-login']);
      return;
    }

    // Consulta no backend se já existe organização para o usuário
    this.organizacoesService.getOrganizacaoByUsuarioId(userId).subscribe({
      next: (org) => {
        if (org && Object.keys(org).length > 0) {
          // Organização existe: vai para visualização/edição
          this.router.navigate(['/pagina-ongId']);
        } else {
          // Não existe: vai para cadastro
          this.router.navigate(['/pagina-ong']);
        }
      },
      error: (err) => {
        console.error('Erro ao consultar organização', err);
        // Por segurança, direciona para cadastro
        this.router.navigate(['/pagina-login']);
      }
    });
  }
}
