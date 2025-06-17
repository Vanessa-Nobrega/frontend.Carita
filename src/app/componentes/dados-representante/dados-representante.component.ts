import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import  {UsuarioService } from '../../services/usuario.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-dados-representante',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './dados-representante.component.html',
  styleUrl: './dados-representante.component.css'
})
export class DadosRepresentanteComponent implements OnInit {
  RepresentanteForm: FormGroup;
  errorMessage = '';
  showAlert = false;
  userId: number = 0;

  constructor(private fb: FormBuilder,private usuarioService : UsuarioService){

    const token: any = localStorage.getItem("token");
          console.log(token)
          if (token) {
            const decoded: any = jwtDecode(token);
            console.log(decoded);
            this.userId = decoded.id;
          }

    this.RepresentanteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Usando array para validadores
      CPF: ['', [Validators.required, Validators.minLength(11)]],  // Usando array para validadores
      nome: ['', [Validators.required, Validators.minLength(3)]]  // Usando array para validadores
    });
  }

   ngOnInit(): void {
    if (this.userId) {
      this.usuarioService.getUsuarioPorId(this.userId).subscribe({
        next: (usuario) => {
          console.log('Usuário carregado:', usuario);
          this.RepresentanteForm.patchValue({
            email: usuario.email,
            CPF: usuario.cpf,
            
          });
        },
        error: (err) => {
          console.error('Erro ao buscar usuário:', err);
          alert('Usuário não encontrado');
        }
      });
    }
  }

  

  onSubmit(): void {
    if (this.RepresentanteForm.valid) {
      console.log('Formulário válido:', this.RepresentanteForm.value);
      this.showAlert = true;
      setTimeout(() => (this.showAlert = false), 4000);
      this.RepresentanteForm.reset();
    } else {
      console.log('Formulário inválido');
    }
  }
}



 