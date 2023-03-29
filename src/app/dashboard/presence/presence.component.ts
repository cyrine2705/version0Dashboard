import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css']
})
export class PresenceComponent {
  constructor (private router: Router){}
  onclick = () =>this.router.navigate(['/navbar/employes', 15]);

}
