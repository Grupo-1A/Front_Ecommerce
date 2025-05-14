import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Navbar2Component } from '../../header/navbar2/navbar2.component';
import { Footer2Component } from '../../footer/footer2/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink,
    Navbar2Component,
    Footer2Component,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Si tienes un archivo de estilos
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  apiUrl = 'http://localhost:3000/api/auth/register'; // ¡Reemplaza esto con la URL real de tu API!
  formSubmitted = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      documento: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      ciudad: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      confirmarContrasena: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    // Aquí puedes agregar lógica de inicialización si es necesario
  }

  passwordMatchValidator(group: FormGroup) {
    const contrasena = group.get('contrasena')?.value;
    const confirmarContrasena = group.get('confirmarContrasena')?.value;
    return contrasena === confirmarContrasena ? null : { notSame: true };
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.http.post(this.apiUrl, this.registerForm.value).subscribe(
        (response: any) => {
          console.log('Registro exitoso', response);

          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error en el registro', error);

        }
      );
    } else {
      this.markAllAsTouched();
    }
  }

  markAllAsTouched() {
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.controls[key].markAsTouched();
    });
  }
}
