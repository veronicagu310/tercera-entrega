import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hiddenPass = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get email(): string {
    return this.form.get('email').value;
  }

  get password(): string {
    return this.form.get('password').value;
  }

  login() {
    let user = this.form.controls.email.value;
    localStorage.setItem('user', user);
    
    const {email, password} = this.form.getRawValue();
    this.authService.login(email, password)
      .then(response => {
          this.authService.setUser(response.user);
          this.toastr.success('Has iniciado sesión!', 'Bienvenido');
          this.router.navigate(['/dashboard']);
       })
       .catch(err => {
         console.log('error', err);
         this.toastr.error(err.message);
      });
  }

  forgotPass(){
    this.hiddenPass = false;
  } 

  goBack(){
    this.hiddenPass = true;
  }

  send(){

  }
}
