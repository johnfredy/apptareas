import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../interfaces/user';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit {

	model: User = { correo: "admin", password: "admin123" };
	loginForm: FormGroup =  new FormGroup({
    correo: new FormControl(''),
    password: new FormControl('')
  });
	message: string='';
	returnUrl: string='';

  userId: string = "1";
  correo: string = '';
  password: string = '';
  user$!: Observable<User>;

	constructor(public userService: UsersService, private formBuilder: FormBuilder,private router: Router, public authService: AuthService) { }

	ngOnInit() {

		if (localStorage.getItem('isLoggedIn') === 'true') {
				this.router.navigate(['/home']);
			} else{
					this.router.navigate(['/login']);
				}
			
		this.loginForm = this.formBuilder.group({
			correo: ['', Validators.required, , Validators.minLength(2)],
			password: ['', Validators.required,, Validators.minLength(8)]
		});
		this.returnUrl = '/home';
		// this.authService.logout();
	}

	// convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  // passwordMatchValidator(g: FormGroup) {
  //   return g.get("password").value === g.get("passwordRepeat").value
  //     ? null
  //     : { mismatch: true };
  // }
  login() {
    // stop here if form is invalid
		if (this.loginForm.invalid) {
      console.log('invalido')
      return;
		}
		else{
      console.log('group', this.loginForm.value);
      this.correo = this.loginForm.get('correo')?.value;
      this.password = this.loginForm.get('password')?.value;
      const user = { correo: this.correo, password: this.password };
      this.userService.login(user).subscribe({
        next: (response) => {
          console.log('la petición fue exitosa')
          console.log(response);
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('usuario', this.loginForm.get('correo')?.value);
          localStorage.setItem('token', response.token);
          this.router.navigate([this.returnUrl]);
        }, 
        error: () =>{
          console.log('ocurrió un error al hacer la petición')
        }
      });

		}    
	}
  Registrarse() {
    this.router.navigate(['/register']);
  }
}
