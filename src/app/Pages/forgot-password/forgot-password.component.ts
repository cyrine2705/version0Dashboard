import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers:[ResetPasswordService]
})
export class ForgotPasswordComponent {
  emailForm!: FormGroup;

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private passwordService: ResetPasswordService, private fb:FormBuilder) {
    
   }

 retour(){
  this.router.navigate(['/login']);

 }


 ngOnInit() {
  this.emailForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });
 }

 onSubmit() {
   if (this.emailForm.invalid) {
     return;
   }
   this.passwordService.resetPassword(this.emailForm.value.email).subscribe(
     (response) => {
       console.log(response);
     return "an email has been sent successfully"
     },
     (error) => {
       console.error(error);
       "your email doesnt exist"
     }
   );
 }

}
