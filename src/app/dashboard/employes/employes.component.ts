import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { EmployesService } from 'src/app/services/employes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.css']
})
export class EmployesComponent {
  employees: User[];
  employee:User;

  constructor(private employesService: EmployesService,private router:Router) { }

  onclick =(id: String) => this.router.navigate(['/navbar/employes/', id]);
  add =() => this.router.navigate(['/navbar/employes/add/','addEmployee']);
 
  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(): void {
    this.employesService.getAllEmployes()
      .subscribe(employees => this.employees = employees);
  }
  deleteEmployee(id: String): void {
    this.employesService.deleteEmploye(id)
    .subscribe(employee => this.employee = employee);
  }
  onDelete(id:String){
    Swal.fire({
      title: 'are you sure you want to delete this employe?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.deleteEmployee(id);
        Swal.fire('deleted!', '', 'success')
        this.getAllEmployees()
      } else if (result.isDenied) {
        Swal.fire('Employe is still saved', '', 'info')
      }
    })
  }

}
