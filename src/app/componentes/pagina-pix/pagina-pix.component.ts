import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizacoesService } from '../../services/organizacoes.service';
import { Organizacao } from '../../models/organizacoes.model';

@Component({
  selector: 'app-pagina-pix',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagina-pix.component.html',
  styleUrls: ['./pagina-pix.component.css']
})
export class PaginaPixComponent implements OnInit {

  organizacoes: Organizacao[] = [];

  constructor(private organizacoesService: OrganizacoesService) {}

  ngOnInit(): void {
    this.organizacoesService.getOrganizacoes().subscribe({
      next: (res) => {
        this.organizacoes = res.organizacoes || res;
      },
      error: (err) => {
        console.error('Erro ao buscar organizações:', err);
      }
    });
  }
}
