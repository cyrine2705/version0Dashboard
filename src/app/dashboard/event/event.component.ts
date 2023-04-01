import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  idevent:String = 'addEvent';
  constructor(private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.idevent = this.activatedRoute.snapshot.params['id'];
  }
 retour(){
  this.router.navigate(['/employes']);

 }

}
