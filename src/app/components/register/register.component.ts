
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern(/^[6789]\d{9}$/)]],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  save() {
   
    
    if (this.registerForm.valid) {
      const bodyData = {
        name: this.registerForm.value.userName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        phone: this.registerForm.value.phone,
      };
   
    this.http.post("https://localhost:7086/api/User", bodyData, { responseType: 'text' }).subscribe({
      next: (resultData: any) => {
        console.log(resultData);
        alert("Registered successfully");
        this.router.navigateByUrl('login');
      },
      error: (error) => {
        // Handle error here
        if (error.status === 400) {
          alert('User Exist');
        }
      },
    });

 }
 
}
}
 