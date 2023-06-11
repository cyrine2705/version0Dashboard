import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { EmployesService } from 'src/app/services/employes.service';
import Swal from 'sweetalert2';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent {
  id:String;
  employee: User = {
};
  
  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
     this.getEmployee(this.id);
     this.employeeForm.get('situation').valueChanges.subscribe((value) => {
      if (value === 'single') {
        this.employeeForm.get('nbEnfants').disable();
      } else {
        this.employeeForm.get('nbEnfants').enable();
      }
    });
    
   }
  employeeForm: FormGroup;
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private employesService: EmployesService) {
    this.employeeForm = this.fb.group({
      firstName: [this.employee.firstName,[Validators.required, Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern('^[A-Z][a-z]*$')]],
      lastName:[this.employee.lastName,[Validators.required, Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern('^[A-Z][a-z]*( [A-Z][a-z]*)*$')
      ]],
      sexe: [this.employee.sexe, Validators.required],
      birthDate: [this.employee.birthDate, Validators.required],
      role: [this.employee.role, Validators.required],
      email: [this.employee.email, [Validators.required, Validators.email]],
      phoneNumber1: [this.employee.phoneNumber1, [Validators.required, Validators.pattern('^[95432]\\d{7}$')]],
      phoneNumber2: [this.employee.phoneNumber2, [ Validators.pattern('^[95432]\\d{7}$')]],
      adress: [this.employee.adress, [Validators.required,Validators.minLength(5)]],
      situation: [this.employee.situation, Validators.required,],
      nbEnfants: [this.employee.nbEnfants, Validators.required,],
      startTime: [this.employee.startTime, [Validators.required, Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)]],
      endTime: [this.employee.endTime, [Validators.required, Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)]],
      
    }
    
   );
  }
  onSubmit() {
    this.employesService.updateEmployeFromDashboard(this.employee.id, this.employeeForm.value).subscribe(res => {
      Swal.fire({
        title: `this Employee data has been updated successfully `,
        icon: 'success',
        position: 'center',
        timer: 2000,
        showConfirmButton: false
    });
      console.log(res);
      this.router.navigate(['navbar/employes']);
    }, err => {
      Swal.fire({
        title: 'error updating employee' +err.message,
        icon: 'error',
        position: 'center',
        timer: 2000,
        showConfirmButton: false
    });
    });
  }
 

  getEmployee(id: String): void {
    this.employesService.getEmploye(id)
      .subscribe(employee => this.employee = employee);
  }
 retour(){
  this.router.navigate(['/employes']);

 }
}
