import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  correo: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordError: boolean = false;
  registerForm: FormGroup = new FormGroup({
    correo: new FormControl(''),
    password: new FormControl(''),
    passwordRepeat: new FormControl('')
  });
	returnUrl: string='';
  
  constructor(private fb: FormBuilder, public userService: UsersService, public router: Router) { }
  
  ngOnInit() {
    this.registerForm = this.fb.group({
      correo: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRepeat: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.returnUrl = '/home';
  }
  // passwordMatchValidator(g: FormGroup) {
    //   return g.get("password").value === g.get("passwordRepeat").value
    //     ? null
    //     : { mismatch: true };
  // }
  register() {
    if (this.registerForm.invalid) {
      console.log('invalido')
      return;
		}
		else{
      this.passwordError = false;
      this.correo = this.registerForm.get('correo')?.value;
      this.password = this.registerForm.get('password')?.value;
      this.confirmPassword = this.registerForm.get('passwordRepeat')?.value;
      if(this.password == this.confirmPassword){
        const user = { correo: this.correo, password: this.password };
        this.userService.register(user).subscribe((data) => {
          console.log(data);
          this.router.navigate([this.returnUrl]);
        });
      }
      else{
        this.passwordError = true;
      }
    }
  }
  Login() {
    this.router.navigate(['/login']);
  }
}
