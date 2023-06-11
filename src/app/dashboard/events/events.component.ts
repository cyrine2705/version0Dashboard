import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  events:Events[];
  constructor(private router: Router, private eventsService: EventService) {
    
  }
  onclick = () =>this.router.navigate(['navbar/events','addEvent']);
  ngOnInit(): void {
   this.getAllEvents();
  }
  getAllEvents(): void {
    this.eventsService.getAllEvents()
      .subscribe(events => this.events = events);
  }
  onupdate =(id: String) => this.router.navigate(['/navbar/events/edit/', id]);

}
