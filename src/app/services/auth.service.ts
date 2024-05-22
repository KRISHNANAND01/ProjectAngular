import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
 
@Injectable({
 providedIn: 'root'
})
export class AuthService {
 constructor(private router:Router) { }
 
isUserLogged():boolean{
  return !!localStorage.getItem('token');
}

 logout() {
   localStorage.removeItem('token');
   localStorage.removeItem('userId');
   this.router.navigate(['/login']);
 }

}
