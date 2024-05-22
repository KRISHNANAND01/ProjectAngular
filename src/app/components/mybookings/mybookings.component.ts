import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.css']
})
export class MyBookingsComponent implements OnInit {
  bookings: any[] = [];
  //slotTime: string = '';

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId !== null) {
      this.fetchUserBookings(userId);
    } else {
      console.error('User ID not found in localStorage');
    }
  }

  
  
  fetchUserBookings(userId: string) {
    this.httpService.getUserBookings(userId).subscribe({
      next: bookings => {
        this.bookings = bookings;
        this.fetchSlotNames();
      },
      error: error => {
        console.error('Error fetching user bookings:', error);
      }
    });
  }
 
  fetchSlotNames() {
    const slotIdRequests = this.bookings.map(booking => this.httpService.getSlotName(booking.slotId));
  
    forkJoin(slotIdRequests).subscribe({
      next: slotNames => {
        this.bookings.forEach((booking, index) => {
          booking.slotName = slotNames[index];
        });
      },
      error: error => {
        console.error('Error fetching slot names:', error);
      }
    });
  }
  
  cancelBooking(bookingId: number) {
    this.httpService.cancelBooking(bookingId).subscribe({
      next: () => {
        this.bookings = this.bookings.filter(booking => booking.id !== bookingId);
        alert("Booking cancelled Successfully");
      },
      error: error => {
        console.error('Error canceling booking:', error);
      }
    });
  }
}
