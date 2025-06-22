import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizacoesService } from '../../services/organizacoes.service';
import { jwtDecode } from 'jwt-decode';
import { ParceirosService } from '../../services/parceiros.service';

@Component({
  selector: 'app-pagina-precadastro',
  standalone: true,
  templateUrl: './pagina-precadastro.component.html',
  styleUrl: './pagina-precadastro.component.css'
})
export class PaginaPrecadastroComponent {
  constructor(
    private router: Router,
    private organizacoesService: OrganizacoesService,
    private parceiroService: ParceirosService
  ) {}

  irParaOrganizacao() {
  const token = localStorage.getItem('token');
  if (!token) {
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

  this.parceiroService.getParceiroByUsuarioId(userId).subscribe({
    next: (parceiro) => {
      // ✅ Verifica se org é nulo, undefined ou objeto vazio
      if (parceiro && Object.keys(parceiro).length > 0) {
        this.router.navigate(['/pagina-parceiros']); // Visualização/Edição
      } else {
        this.router.navigate(['/pagina-parceirosId']); // Cadastro
      }
    },
    error: (err) => {
      // ✅ Se der erro (como 404), também redireciona para o cadastro
      console.warn('Organização não encontrada ou erro:', err);
      this.router.navigate(['/pagina-ong']);
    }
  });

}

irParaParceiro() {
  const token = localStorage.getItem('token');
  if (!token) {
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

  this.organizacoesService.getOrganizacaoByUsuarioId(userId).subscribe({
    next: (org) => {
      // ✅ Verifica se org é nulo, undefined ou objeto vazio
      if (org && Object.keys(org).length > 0) {
        this.router.navigate(['/pagina-parceirosId']); // Visualização/Edição
      } else {
        this.router.navigate(['/pagina-parceiros']); // Cadastro
      }
    },
    error: (err) => {
      // ✅ Se der erro (como 404), também redireciona para o cadastro
      console.warn('Organização não encontrada ou erro:', err);
      this.router.navigate(['/pagina-parceiros']);
    }
  });

}
}