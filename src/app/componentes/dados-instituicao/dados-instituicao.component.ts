import { Component,  OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OrganizacoesService } from '../../services/organizacoes.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-dados-instituicao',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './dados-instituicao.component.html',
  styleUrl: './dados-instituicao.component.css'
})
export class DadosInstituicaoComponent implements OnInit {

   formOrganizacao: FormGroup;
   errorMessage = '';
  showAlert = false; 
    userId: number = 0;
 

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



  onSubmit(){
    console.log(this.formOrganizacao.value);
    console.log(">> ", this.formOrganizacao.valid);
    if(this.formOrganizacao.valid){
      const formData = this.formOrganizacao.value;

      this.organizacaoService.postOrganizacoes(formData).subscribe({
      next: (res) => {
      
       
      },
      error: (err) => {
        
        console.error(err);
      }
    });
     


    }
  }
}

