import { Component,inject, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SharedService } from '../../services/shared.service';
import { IBooking } from '../../interfaces/booking';

@Component({
 selector: 'app-date-range',
 templateUrl: './bookings.component.html',
 styleUrls: ['./bookings.component.css'],

 
})
export class BookingsComponent implements OnInit {
   userId!: number ;
   turfId!: any;
   blogId?:any;
   date:any;
   constructor(private authservice:AuthService,private router:Router,private httpService:HttpService,private sharedservice:SharedService){}
  
 
   ngOnInit() {
      
      if(this.authservice.isUserLogged()){
 
        this.getAllSlots();
        //const id=this.route.snapshot.paramMap.get('id');
        const id=this.sharedservice.getTurfId()
        this.turfId=id;
       
       
        this.userId = Number(localStorage.getItem("userId"));
     
        console.log(this.turfId);
        console.log(this.userId);
      }
      else{
        this.router.navigate(['/login'])
        alert('You need to log in first to do anything!')
      }


      
     
   }
   slots:any=[];
   getAllSlots(){
      this.httpService.getSlots().subscribe((res:any)=>{
         console.log(res);
        this.slots=res;
      })
   }
 
   onSubmit() {
    if (!this.date) {
      alert('Please select a date');
      return;
    }
  
    if (!this.blogId) {
      alert('Please select a slot');
      return;
    }
      const userid = this.userId;
      const turfId = this.turfId;
      const slotId=this.blogId;
      console.log("slotId=>"+slotId);
      console.log("date=>"+this.date);
      console.log("userId=>"+this.userId);
      console.log("turfId=>"+this.turfId);
 
   
  //  const IBooking = {
  //    date: this.date,
  //    slotId:slotId,
  //    userId: userid,
  //    turfId: turfId
  //  };
  const booking: IBooking = {
    date: this.date,
    slotId: slotId,
    userId: userid,
    turfId: turfId
  };
 
   console.log(booking);
   this.httpService.createBooking(booking).subscribe({
      next: (response) => {
        console.log(response);
        alert('Slot Booked successfully');
        this.router.navigateByUrl('/my-bookings');
      },
      error: (error) => {
        if (error.status === 400) {
          alert('Slot Already booked');
        }
      },
    });
   
   
  
}
 
}
