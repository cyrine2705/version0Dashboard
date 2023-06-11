import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
  constructor(private router: Router) {
    
  }
  onclick = () =>this.router.navigate(['navbar/rh/profile','admin']);
  

}
