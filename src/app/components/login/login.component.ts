import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = this.builder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  

  constructor(
    private builder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    ) {}

  
  onLogin() {
    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;
  
    this.httpService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login successful:', response.body?.role);
        localStorage.setItem('token', String(response.body?.token));
        alert('Successfully Logged In');
        localStorage.setItem('userId', response.body?.id);
  
        if (response.body?.role === 'Admin') {

          this.router.navigateByUrl('/admin');
        } else {
          this.router.navigateByUrl('/turflist');
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Invalid username and password');
      },
    });
  }
}


