import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-acessibilidade',
  standalone: true,
  imports: [],
  templateUrl: './acessibilidade.component.html',
  styleUrl: './acessibilidade.component.css'
})
export class AcessibilidadeComponent implements OnInit {
  estado = false;
  fala!: SpeechSynthesisUtterance;
  botaoFala!: HTMLButtonElement | null;
  focaveis: HTMLElement[] = [];
  focoAtual = 0;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    // Carrega o script VLibras
    const vlibrasScript = this.renderer.createElement('script');
    vlibrasScript.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    vlibrasScript.onload = () => {
      new (window as any).VLibras.Widget('https://vlibras.gov.br/app');
    };
    this.renderer.appendChild(this.document.body, vlibrasScript);

    // Botão leitura
    this.botaoFala = this.document.querySelector("button.botao-flutuante");

    // Navegação com setas
    this.focaveis = Array.from(this.document.querySelectorAll('a, button, input, [tabindex="0"]')) as HTMLElement[];

    window.addEventListener('load', () => this.focarElemento(this.focoAtual));
    this.document.addEventListener('keydown', (event) => this.escutarTeclado(event));

    // Menu
    const menu = this.document.getElementById('menu');
    const navList = this.document.getElementById('nav-list');
    if (menu && navList) {
      menu.addEventListener('click', () => {
        navList.classList.toggle('active');
      });
    }
  }

  alternarEstadoLeitura(): void {
    this.estado = !this.estado;
    this.estado ? this.lerPagina() : this.pararLeitura();
  }

  lerPagina(): void {
    const texto = this.document.body.innerText;
    this.fala = new SpeechSynthesisUtterance(texto);
    this.fala.lang = 'pt-BR';
    if (this.botaoFala) {
      this.botaoFala.innerHTML = `<img src="../img/sem-som.png" alt="Iniciar Leitura" class="icone-botao">`;
    }
    speechSynthesis.speak(this.fala);
  }

  pararLeitura(): void {
    if (this.botaoFala) {
      this.botaoFala.innerHTML = `<img src="../img/volume.png" alt="Parar Leitura" class="icone-botao">`;
    }
    speechSynthesis.cancel();
  }

  trocaCor(): void {
    this.document.documentElement.classList.toggle("modo-preto-branco");
  }

  focarElemento(index: number): void {
    if (!this.focaveis.length) return;
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

  escutarTeclado(event: KeyboardEvent): void {
    if (!this.focaveis.length) return;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        window.scrollBy({ top: 100, behavior: 'smooth' });
        this.focoAtual = (this.focoAtual + 1) % this.focaveis.length;
        this.focarElemento(this.focoAtual);
        break;
      case 'ArrowUp':
        event.preventDefault();
        window.scrollBy({ top: -100, behavior: 'smooth' });
        this.focoAtual = (this.focoAtual - 1 + this.focaveis.length) % this.focaveis.length;
        this.focarElemento(this.focoAtual);
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.focoAtual = (this.focoAtual + 1) % this.focaveis.length;
        this.focarElemento(this.focoAtual);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.focoAtual = (this.focoAtual - 1 + this.focaveis.length) % this.focaveis.length;
        this.focarElemento(this.focoAtual);
        break;
      case 'Enter':
        event.preventDefault();
        const el = this.focaveis[this.focoAtual];
        if (el.tagName === 'A') {
          window.location.href = (el as HTMLAnchorElement).href;
        } else {
          el.click();
        }
        break;
    }
  }
}
