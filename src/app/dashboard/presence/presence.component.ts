import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { EmployesService } from 'src/app/services/employes.service';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css']
})
export class PresenceComponent {
  constructor (private router: Router,private userService: EmployesService){}
  onclick =(id: String) => this.router.navigate(['/navbar/employes/', id]);
  presentEmployees: User[] = [];
  ngOnInit(): void {
    this.loadPresentEmployees();
  }

  loadPresentEmployees() {
    this.userService.getAllEmployes().subscribe(
      (employees: User[]) => {
        this.presentEmployees = employees.filter(employee => employee.present === true);
      },
      (error: any) => {
        console.error('Failed to retrieve employees:', error);
      }
    );
  }
}











