import { Component, HostListener, AfterViewInit  } from '@angular/core';

@Component({
  selector: 'app-acessibilidade',
  templateUrl: './acessibilidade.component.html',
  styleUrls: ['./acessibilidade.component.css'],
  standalone: true,
})
export class AcessibilidadeComponent implements AfterViewInit {
  estado = false;
  fala: SpeechSynthesisUtterance | null = null;
  iconeLeitura: HTMLImageElement | null = null;
  focaveis: HTMLElement[] = [];
  focoAtual: number = 0;

  ngAfterViewInit(): void {
    this.iconeLeitura = document.getElementById('iconeLeitura') as HTMLImageElement;

    this.focaveis = Array.from(
      document.querySelectorAll('a, button, input, [tabindex="0"]')
    ) as HTMLElement[];
 this.loadVlibrasScript();
    this.focarElemento(this.focoAtual);

    window.addEventListener('load', () => this.focarElemento(this.focoAtual));

    document.addEventListener('keydown', (event) => this.navegacaoTeclado(event));
  }

  alternarEstadoLeitura() {
    this.estado = !this.estado;
    this.estado ? this.lerPagina() : this.pararLeitura();
  }

  lerPagina() {
    const texto = document.body.innerText;
    this.fala = new SpeechSynthesisUtterance(texto);
    this.fala.lang = 'pt-BR';

    if (this.iconeLeitura) {
      this.iconeLeitura.src = '../img/sem-som.png';
      this.iconeLeitura.alt = 'Parar Leitura';
    }

    speechSynthesis.speak(this.fala);
  }

  pararLeitura() {
    if (this.iconeLeitura) {
      this.iconeLeitura.src = '../img/volume.png';
      this.iconeLeitura.alt = 'Iniciar Leitura';
    }

    speechSynthesis.cancel();
  }

 trocaCor() {
   console.log('Botão Preto e Branco clicado!');
  document.body.classList.toggle('modo-preto-branco');
}

loadVlibrasScript() {
  const script = document.createElement('script');
  script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
  script.onload = () => {
    if (window && (window as any).VLibras) {
      new (window as any).VLibras.Widget('vlibras-plugin'); // CORRETO AQUI
    }
  };
  document.body.appendChild(script);
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



  navegacaoTeclado(event: KeyboardEvent) {
    if (this.focaveis.length === 0) return;

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
          (el as HTMLElement).click();
        }
        break;
    }
  }
}
