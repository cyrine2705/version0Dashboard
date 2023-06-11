import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EmployesService } from 'src/app/services/employes.service';
import Swal from 'sweetalert2';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.css']
})
export class AddEmployeComponent {
  id:string ;
  matcher = new MyErrorStateMatcher();
  employeeForm: FormGroup ;
  imageFile: File ;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private employesService: EmployesService, private registerService: AuthenticationService ) {
    this.employeeForm = this.fb.group({
      firstName: ["",[Validators.required, Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern('^[A-Z][a-z]*( [A-Z][a-z]*)*$')]],
      lastName:["",[Validators.required, Validators.minLength(3),
        Validators.maxLength(15),
        Validators.pattern('^[A-Z][a-z]*( [A-Z][a-z]*)*$')
      ]],
      email: ["", [Validators.required, Validators.email]],
      birthDate: ["", Validators.required],
      adress: ["", [Validators.required,Validators.minLength(5)]],
      cin: [null, [Validators.required, Validators.pattern('^(1|0)[0-9]{7}$')]],
      phoneNumber1: [0, [Validators.required, Validators.pattern('^[95432]\\d{7}$')]],
      phoneNumber2: [null, [ Validators.pattern('^[95432]\\d{7}$')]],
      image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
      sexe: ["", Validators.required],
      situation: ["", Validators.required,],
      nbEnfants: [0, Validators.required,],
      nbConge:[20,Validators.required],
      startTime: ["", [Validators.required, Validators.pattern(/^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/),
      ]],
      endTime:  ["", [Validators.required, Validators.pattern(/^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/),
   ]],
      role: ["", Validators.required],
    },
    {
      validators: [this.phoneNumbersMustBeDifferentValidator,this.timeRangeValidator]
     
    },
    );
   
   
  
  this.employeeForm.get('situation').valueChanges.subscribe((value: string) => {
    if (value === 'single') {
      this.employeeForm.get('nbEnfants').disable();
      this.employeeForm.get('nbEnfants').setValue(0);
      
    } else {
      this.employeeForm.get('nbEnfants').enable();
    }
  });
  }
  phoneNumbersMustBeDifferentValidator(formGroup: FormGroup): ValidationErrors  {
    const phoneNumber1 = formGroup.get('phoneNumber1').value;
    const phoneNumber2 = formGroup.get('phoneNumber2').value;
    if (phoneNumber1 === phoneNumber2) {
      formGroup.get('phoneNumber2').setErrors({ phoneNumbersMustBeDifferent: true });
      return { phoneNumbersMustBeDifferent: true };
    } 
    return null;
  }
   timeRangeValidator(formGroup: FormGroup): ValidationErrors{
    const startTime = formGroup.get('startTime').value;
    const endTime = formGroup.get('endTime').value;
    if ((new Date("1970-01-01T"+startTime) >new Date("1970-01-01T"+endTime)) ){
      formGroup.get('endTime').setErrors({ timeRange: true });
      return { 
      'timeRange': true,
      }
    }
 
    return null;
   
  }
  
  

  
  onFileSelected(event): void {
    this. imageFile = event.target.files[0];
    this.employesService.uploadImage(this.imageFile).subscribe((result) => {
      console.log("thiiiiiis"+result);
      
      this.employeeForm.patchValue({ image: JSON.stringify(result)});
     
    }, error => {
      console.log(error.message
        );
    }); // Set the selected file
  }
  onSubmit() {
    
      
   
      this.addEmployee();
    }
  
  
  addEmployee() {
    console.log("adddd")
    console.log(this.employeeForm.value);
    let u:User = new User();
   u.firstName = this.employeeForm.value.firstName;
   u.lastName = this.employeeForm.value.lastName;
   u.email=this.employeeForm.value.email;
   u.birthDate=this.employeeForm.value.birthDate;
   u.adress=this.employeeForm.value.adress;
   u.cin=this.employeeForm.value.cin;
   u.phoneNumber1=this.employeeForm.value.phoneNumber1;
   u.phoneNumber2=this.employeeForm.value.phoneNumber2;
   u.image=this.employeeForm.value.image;
   u.sexe=this.employeeForm.value.sexe;
   u.situation=this.employeeForm.value.situation;
   u.nbEnfants=this.employeeForm.value.nbEnfants;
   u.nbConge=this.employeeForm.value.nbConge;
   u.startTime=this.employeeForm.value.startTime;
   u.endTime=this.employeeForm.value.endTime;
   console.log("thiiiiiiis iiissss user"+JSON.stringify(u))
   if(this.employeeForm.value.role==="EMPLOYE")
   {
    this.registerService.addEmploye(u).subscribe((res) => {
      console.log(res);
      if(res['msg']==null){
      Swal.fire({
        title: `this employe has been added successfully `,
        icon: 'success',
        position: 'center',
        timer: 2000,
        showConfirmButton: false
    });
  }
    else{
      Swal.fire({
        title:res['msg'] ,
        icon: 'error',
        position: 'center',
        timer: 2000,
        showConfirmButton: false
    });
    }
     
    })}
    else{
      this.registerService.addRH(u).subscribe((res) => {
        console.log(res);
        if(res['msg']==null){
          Swal.fire({
            title: `this rh has been added successfully `,
            icon: 'success',
            position: 'center',
            timer: 2000,
            showConfirmButton: false
        });
      this.router.navigate['navbar/employes']}
        else{
          Swal.fire({
            title:res['msg'] ,
            icon: 'error',
            position: 'center',
            timer: 2000,
            showConfirmButton: false
        });
        }
       
      },);

    }
  }
  
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('addEmployee');
}}
