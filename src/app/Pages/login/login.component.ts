import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string;
  constructor(private router: Router,private fb:FormBuilder, private authService :AuthenticationService){
    

  }
  ngOnInit() {
    this.loginForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
   }
   login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      data => {
        if(data['msg']=='Logged In'){
        console.log(data);
        localStorage.removeItem('jwtToken');
        localStorage.setItem('jwtToken', data['token'].toString());
        localStorage.removeItem('idRh');
        localStorage.setItem('idRh', data['id'].toString());
        this.router.navigate(['navbar'])}
        else{console.log(data['msg']);
        this.errorMessage =data['msg'];
        }
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    );
  }
 
  forgot() {

 this.router.navigate(['forgotPassword']);
}

 
  

}
