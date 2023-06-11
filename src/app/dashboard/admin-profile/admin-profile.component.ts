import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AiService } from 'src/app/services/ai.service';
import { EmployesService } from 'src/app/services/employes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent {
  datetime = new Date().getTime()
  rh: User = {
  };
  idevent:String ;
  constructor(private activatedRoute: ActivatedRoute,private employesService: EmployesService,private ai:AiService) {}
  ngOnInit(): void {
    this.idevent = this.activatedRoute.snapshot.params['admin'];
    this.getEmployee();
   }
   getEmployee(): void {
    this.employesService.getEmploye(localStorage.getItem('idRh'))
     .subscribe(employee => this.rh= employee);
  }
  onclick() {
    Swal.fire('Please wait')
Swal.showLoading()
    this.ai.training().subscribe((res) => {
      console.log(res);
      Swal.fire({
        title: 'the face recognition model has been trained successfully ',
        icon: 'success',
        position: 'center',
        timer: 2000,
        showConfirmButton: false
    });
  },
    (error) => {
      console.log(error);
      Swal.fire({
        title: 'error training the face recognition model',
        icon: 'error',
        position: 'center',
        timer: 2000,
        showConfirmButton: false
    });})

      }

      }
 
