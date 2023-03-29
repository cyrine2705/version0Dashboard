import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-login',
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {
  constructor(private router: Router){
    

  }
  login(){
    this.router.navigate(['navbar'])
  }

}
