import { Component, inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import {  Router } from '@angular/router';
import { ITurf } from '../../interfaces/turf';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  router = inject(Router);
  turfList: ITurf[] = [];
  //turfList: Turf[] = [];
  httpService = inject(HttpService);
  displayedColumns: string[] = [
    
    'name',
    'location',
    'avaliability',
    'action'
  ];
  ngOnInit() {
    this.getTurfFromServer();
 
  }
  navigateToAddTurf() {
    this.router.navigateByUrl('create-turf')
  }
    getTurfFromServer() {
      this.httpService.getAllTurf().subscribe((result) => {
        this.turfList = result;
        console.log(this.turfList);
        //return this.turfList;
      });
    }
   
    edit(id: number) {
      console.log(id);
      this.router.navigateByUrl('/turf/' + id);
    }
    delete(id: number) {
      this.httpService.deleteTurf(id).subscribe(() => {
        console.log('deleted');
        this.getTurfFromServer();
        alert('Record deleted sucessfully');
      });
    }
  }
 


