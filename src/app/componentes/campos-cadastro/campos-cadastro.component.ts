import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';



@Component({
  selector: 'app-campos-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, RouterLink],
  templateUrl: './campos-cadastro.component.html',
  styleUrl: './campos-cadastro.component.css'
})
export class CamposCadastroComponent {
  myForm: FormGroup;

  errorMessage: string = '';

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router){

    this.myForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      cpf:['',[Validators.required,Validators.minLength(11)]],
      senha:['',[Validators.required, Validators.minLength(6)]]
    })
  }

onSubmit() {
  this.errorMessage = '';

  if (this.myForm.valid) {
    const { email, senha, cpf: CPF } = this.myForm.value;

    this.usuarioService.postUsuario({
      email,
      senha,
      cpf: CPF,
      status: true
    }).subscribe({
      next: (res) => {
        // ✅ Limpa token antes de ir pro login
        localStorage.removeItem('token');
        this.router.navigate(['/pagina-login']);
        console.log('Cadastro realizado com sucesso. Redirecionando para login...');
      },
      error: (err) => {
        if (this.myForm.invalid) {
          this.errorMessage = 'Preencha todos os campos corretamente.';
          this.myForm.markAllAsTouched();
          return;
        }

        if (err.status === 400 && err.error?.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'E-mail já cadastrado.';
        }
      }
    });
  }
}
}
