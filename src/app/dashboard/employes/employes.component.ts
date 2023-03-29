import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.css']
})
export class EmployesComponent {
  constructor (private router: Router){}
  onclick = () =>this.router.navigate(['/navbar/employes', 15]);

}
