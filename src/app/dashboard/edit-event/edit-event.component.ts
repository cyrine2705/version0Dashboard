import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent {
  idevent:String ;
  ev:Events = {
  };
  ngOnInit(): void {
    this.idevent = this.activatedRoute.snapshot.params['ev'];
    this.getEvent(this.idevent);
  }
  getEvent(id:String){
    this.eventService.getEvent(id).subscribe(ev => this.ev= ev);
    }
  eventForm: FormGroup;
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private eventService: EventService) {
    this.eventForm = this.fb.group({
      id:"",
      type: [this.ev.type, Validators.required],
      from: [this.ev.from, Validators.required],
      to: [this.ev.to, Validators.required],
      description: [this.ev.description, Validators.required],
      title: [this.ev.title, Validators.required,],
    },
    {
      validators: this.timeRangeValidator
     
    },
    
   );
  }

 
  timeRangeValidator(formGroup: FormGroup): ValidationErrors{
    const startTime = formGroup.get('from').value;
    const endTime = formGroup.get('to').value;
    console.log((new Date(startTime)))
    console.log(endTime)
    if ((new Date(startTime)) > (new Date(endTime))){
      formGroup.get('to').setErrors({ timeRange: true });
      return { 
      'timeRange': true,
      }
    }
 
    return null;
   
  }
  onSubmit() {
    console.log("e5dem")
    console.log(this.idevent);
    console.log(this.eventForm.value.id)
    this.eventForm.get('id').setValue(this.idevent);
    console.log(this.eventForm.value)
    
    this.eventService.updateEvent(this.eventForm.value).subscribe((res) => {
      console.log(res);
      Swal.fire({
        title: `this event has been updated successfully `,
        icon: 'success',
        position: 'center',
        timer: 2000,
        showConfirmButton: false
    });
  this.router.navigate(['navbar/events']);},
    (error) => {
      console.log(error);
      Swal.fire({
        title: `error while updating this event`,
        icon: 'error',
        position: 'center',
        timer: 2000,
        showConfirmButton: false
    });}
    )
     
  }


}
