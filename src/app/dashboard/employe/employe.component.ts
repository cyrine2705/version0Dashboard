import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { EmployesService } from 'src/app/services/employes.service';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent {
  id:String;
  employee: User;
  constructor(private activatedRoute:ActivatedRoute, private router:Router,private employesService:EmployesService) { }

  ngOnInit(): void {
   this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getEmployee(this.id);
  }

  getEmployee(id: String): void {
    this.employesService.getEmploye(id)
      .subscribe(employee => this.employee = employee);
  }
 retour(){
  this.router.navigate(['/employes']);

 }
}
