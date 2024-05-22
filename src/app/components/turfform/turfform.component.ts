
import { Component ,inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ITurf } from '../../interfaces/turf';



@Component({
  selector: 'app-turfform',
  templateUrl: './turfform.component.html',
  styleUrl: './turfform.component.css'
})
export class TurfformComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  turfForm = this.formBuilder.group({
  id:[0],
  name: ['', [Validators.required]],
  location: ['', [Validators.required]],
  availability: ['', []],
  });
  id!: number;
  isEdit = false;
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isEdit = true;
      this.httpService.getTurf(this.id).subscribe((result) => {
        console.log(result);
        this.turfForm.patchValue(result);
      });
    }
  }
  save() {
    console.log(this.turfForm.value);
    const turf: ITurf = {
      name: this.turfForm.value.name!,
      location: this.turfForm.value.location!,
      availability: this.turfForm.value.availability!,
      id: 0
    };
    if (this.isEdit) {
      this.httpService
        .updateTurf(this.id, turf)
        .subscribe(() => {
          console.log('success');
          alert("Record updated sucessfully.");
          this.router.navigateByUrl('admin');
        },);
    } else {
      this.httpService.createTurf(turf).subscribe(() => {
        console.log('success');
        alert("Record added sucessfully.");
        this.router.navigateByUrl('admin');
      });
    }
  }
}





