import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  idevent:String= 'addEvent';
  eventForm: FormGroup;
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private eventService: EventService) {
    this.eventForm = this.fb.group({
      type: ["", Validators.required],
      from: ["", Validators.required],
      to: ["", Validators.required],
      description: ["", Validators.required],
      title: ["", Validators.required,],
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
    this.eventService.addEvent(this.eventForm.value).subscribe((res) => {
      console.log(res);
      Swal.fire({
        title: `this event has been added successfully `,
        icon: 'success',
        position: 'center',
        timer: 2000,
        showConfirmButton: false
    });},
    (error) => {
      console.log(error);
      Swal.fire({
        title: `error while adding event`,
        icon: 'error',
        position: 'center',
        timer: 2000,
        showConfirmButton: false
    });}
    )
     
  }


}
