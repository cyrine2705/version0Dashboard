import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {
  constructor(private router: Router,private dialog : MatDialog){
    

  }
  login(){
    this.router.navigate(['navbar'])
  }
  forgot() {

 this.router.navigate(['forgotPassword']);
}

 
  

}
