import { Component,  OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OrganizacoesService } from '../../services/organizacoes.service';
import { jwtDecode } from 'jwt-decode';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-dados-instituicao',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './dados-instituicao.component.html',
  styleUrl: './dados-instituicao.component.css'
})
export class DadosInstituicaoComponent implements OnInit {
   logo: string = "";
  //  documento: string
   formOrganizacao: FormGroup;
   errorMessage = '';
  showAlert = false; 
    userId: number = 0;
    selectedFile: ImageSnippet | undefined;
   arquivos: { [key: string]: File } = {};


  constructor(private fb: FormBuilder, 
    private organizacaoService: OrganizacoesService,private router: Router){
      
    const token: any = localStorage.getItem("token");
      console.log(token)
      if (token) {
        const decoded: any = jwtDecode(token);
        console.log(decoded);
        this.userId = decoded.id;
      }
    this.formOrganizacao = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cnpj: ['', [Validators.required, Validators.pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)]],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required, Validators.minLength(2)]],
      bairro: ['', [Validators.required, Validators.minLength(5)]],
      cidade: ['', [Validators.required, Validators.minLength(2)]],
      estado: ['', [Validators.required, Validators.minLength(2)]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      
      numeroPix: ['',[Validators.required]],
      site: [''],
      tipoInstituicao: ['', [Validators.required]],
      anoFundacao: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      areaAtuacao: ['', [Validators.required]],
      descricaoInstituicao: ['', [Validators.required, Validators.maxLength(500)]],
      logo: [null],
      documento: [null],
      qrCode: [null],
      idUsuario: this.userId
    });
  }

  ngOnInit(): void {
  if (this.userId) {
    this.organizacaoService.getOrganizacaoByUsuarioId(this.userId).subscribe({
      next: (data) => {
        console.log('Organização carregada:', data);
        this.formOrganizacao.patchValue(data);
      },
      error: (err) => {
        console.error('Erro ao buscar organização:', err);
      }
    });
  }
}



  onFileChange(event: Event, campo: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.arquivos[campo] = input.files[0];
    }
  }


  onSubmit(){
    console.log(this.formOrganizacao.value);
    console.log(">> ", this.formOrganizacao.valid);
    if(this.formOrganizacao.valid){
      const formData = this.formOrganizacao.value;
      console.log("Teste da mensagem")
      const data = new FormData();
      console.log("Teste da mensagem")
      // Adiciona arquivo
     
      // data.append('qrCode', this.selectedFile.file);
      
      for (const chave in this.arquivos) {
        data.append(chave, this.arquivos[chave]);
      }
    console.log("Teste da mensagem")

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          data.append(key, value as string);
        }
      });

      this.organizacaoService.postOrganizacoes(data).subscribe({
      next: (res: any) => {
        console.log("Cadastrado com Sucesso")
       
      },
      error: (err: any) => {
        
        console.error(err);
      }
    });
     


    }
    
  }
   logout() {
    localStorage.removeItem('token'); // ou sessionStorage.clear();
    this.router.navigate(['/pagina-login']); // redireciona para a página de login
  }
}

