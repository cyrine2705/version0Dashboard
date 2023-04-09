import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { EmployesService } from 'src/app/services/employes.service';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.css']
})
export class EmployesComponent {
  employees: User[];

  constructor(private employesService: EmployesService,private router:Router) { }

  onclick =(id: String) => this.router.navigate(['/navbar/employes/', id]);
 
  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(): void {
    this.employesService.getAllEmployes()
      .subscribe(employees => this.employees = employees);
  }

}
