
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ITurf } from '../interfaces/turf';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IBooking } from '../interfaces/booking';
import { SharedService } from './shared.service';
import { ListTurf } from '../interfaces/listturfs';

 
 
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl = 'https://localhost:7086';
  //http = inject(HttpClient);
  constructor(private http:HttpClient) {}

  createBooking(book:IBooking){
    return this.http.post(this.apiUrl + '/api/Booking',book);
  }
  getSlots(){
    return this.http.get(this.apiUrl + '/api/Slot');
  }
  getAllTurf() {
    
    return this.http.get<ITurf[]>(this.apiUrl + '/api/Turf');
  }
  createTurf(turf: ITurf) {
    return this.http.post(this.apiUrl + '/api/Turf', turf);
  }
  getTurf(turfId: number) {
    return this.http.get<ITurf>(
      this.apiUrl + '/api/Turf/' + turfId
    );
  }
  getTurfs(): Observable<ListTurf[]> {
    return this.http.get<ListTurf[]>(this.apiUrl + '/api/Turf');
  }
  updateTurf(turfId: number, turf: ITurf) {
   
    const availability = turf.availability === 'true' ? true : false;
    return this.http.put<ITurf>(
     
       `${this.apiUrl}/api/Turf/${turfId}`,
       { availability: availability} // This is the request body
    );
   }
   
  deleteTurf(turfId: number) {
    return this.http.delete(this.apiUrl + '/api/Turf/' + turfId);
  }
  
  getUserBookings(userId: string): Observable<any[]> {
    const url = `${this.apiUrl}/api/Booking/user/${userId}`;
    return this.http.get<any[]>(url);
  }
 
  getTurfName(turfId: number): Observable<string> {
  return this.http.get<string>(`${this.apiUrl}/api/Turfs/${turfId}/name`);
  } 
 
  cancelBooking(bookingId: number): Observable<any> {
    const url = `${this.apiUrl}/api/Booking/${bookingId}`;
    return this.http.delete(url);
  }
 
  getSlotName(slotId: number): Observable<string> {
    const url = `${this.apiUrl}/api/Slot/${slotId}`;
    return this.http.get<{ time: string }>(url).pipe(
      map((slotData: { time: any; }) => slotData.time)
    );
  }

  login(email: string, password: string): Observable<HttpResponse<{ UserName: string; id: any; token: string;role:string }>> {
    return this.http.post<{ UserName: string; id:number; token: string ;role:string}>(this.apiUrl + '/api/User/login', {
       email: email,
       password: password,
    }, { observe: 'response' }).pipe(
       catchError(error => {
         // Handle the error here
         console.error('Login error:', error);
         // You can rethrow the error if you want to handle it further up the chain
         return throwError(error);
       })
    );
   }
}
   
   
  

 