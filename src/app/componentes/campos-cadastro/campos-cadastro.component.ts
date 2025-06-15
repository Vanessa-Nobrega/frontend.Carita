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

  constructor(private fb: FormBuilder, private router: Router, private service: UsuarioService ){
    this.myForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      cpf:['',[Validators.required,Validators.minLength(11)]],
      senha:['',[Validators.required, Validators.minLength(6)]]
    })
  }
  onSubmit(){
    console.log(this.myForm.value);
    console.log(">> ", this.myForm.valid);
    if(this.myForm.valid){
      console.log(this.myForm.value)
      try {
        this.service.postUsuario(this.myForm.value).subscribe()
      } catch (error) {
        console.error(error)
      }
      this.router.navigate(['/pagina-login'])
    }
  }
}
