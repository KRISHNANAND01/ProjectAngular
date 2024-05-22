import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ITurf } from '../../interfaces/turf';
import { ListTurf } from '../../interfaces/listturfs';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-turflist',
  templateUrl: './turflist.component.html',
  styleUrl: './turflist.component.css'
})
export class TurflistComponent implements OnInit{
  //sharedservice= inject(SharedService);
  turfs: ListTurf[] = [];
  turfId: number=0;

  constructor(private router:Router,private authservice:AuthService,private httpService:HttpService,private sharedservice:SharedService) { }

  ngOnInit(): void {
    if(this.authservice.isUserLogged()){
    this.getTurfs();
    }
    else{
      this.router.navigate(['/login'])
      alert('You need to log in first to do anything!')
    }


  }

  
 
  getTurfs(): void {
    this.httpService.getTurfs().subscribe({
      next: (turfsData: ListTurf[]) => {
        this.turfs = turfsData;
      },
      error: (error) => {
        console.error('Error fetching turfs:', error);
      },
    });
  }

bookTurf(turfId: number): void {
  console.log(`Booking turf with ID: ${turfId}`);
  this.sharedservice.setTurfId(turfId);
  console.log(`turfid ${this.sharedservice.getTurfId()}`);
  this.router.navigate(['/bookings', turfId]);
}

showUnavailableAlert(): void {
  alert('Turf is not available');
}
}
