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
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordError: boolean = false;
  user: FormGroup = new FormGroup({
    correo: new FormControl(''),
    password: new FormControl(''),
    passwordRepeat: new FormControl('')
  });
  
  constructor(private fb: FormBuilder, public userService: UsersService, public router: Router) { }
  
  ngOnInit() {
    this.user = this.fb.group({
      correo: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required]
    });
  }
  // passwordMatchValidator(g: FormGroup) {
    //   return g.get("password").value === g.get("passwordRepeat").value
    //     ? null
    //     : { mismatch: true };
  // }
  register() {
    const user = { email: this.email, password: this.password };
    this.userService.register(user).subscribe((data) => {
      console.log(data);
      this.userService.setToken(data.token);
      this.router.navigateByUrl("/");
    });
  }
  Login() {
    this.router.navigate(['/login']);
  }
}
