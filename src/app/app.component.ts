import { Component, AfterViewInit, Injectable } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./componentes/footer/footer.component";
import { AcessibilidadeComponent } from "./componentes/acessibilidade/acessibilidade.component";
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, AcessibilidadeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CaritaII';
  focaveis: HTMLElement[] = [];
  focoAtual = 0;
  pokemons: any;

  constructor(private apiService: ApiService) {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.inicializarNavegacaoTeclado();
      this.getPokemons();
    });
  }

  inicializarNavegacaoTeclado() {
    this.atualizarFocaveis();
    this.focarElemento(this.focoAtual);

    document.addEventListener('keydown', (event) => {
      this.atualizarFocaveis();
      if (this.focaveis.length === 0) return;

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault();
          this.focoAtual = (this.focoAtual + 1) % this.focaveis.length;
          this.focarElemento(this.focoAtual);
          break;

        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault();
          this.focoAtual = (this.focoAtual - 1 + this.focaveis.length) % this.focaveis.length;
          this.focarElemento(this.focoAtual);
          break;

        case 'Enter':
          event.preventDefault();
          const el = this.focaveis[this.focoAtual];
          if (el.tagName === 'A') {
            window.location.href = el.getAttribute('href')!;
          } else {
            el.click();
          }
          break;
      }
    });
  }

  atualizarFocaveis() {
    this.focaveis = Array.from(document.querySelectorAll('a, button, input, [tabindex="0"]')) as HTMLElement[];
  }

  focarElemento(index: number) {
    if (this.focaveis.length === 0) return;
    this.focaveis.forEach((el, i) => {
      if (i === index) {
        el.focus();
        el.style.outline = '3px solid blue';
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        el.style.outline = 'none';
      }
    });
  }

  getPokemons() {
    this.apiService.getPokemons().subscribe((res) => {
      console.log(res);
      this.pokemons = res;
    });
  }

}
