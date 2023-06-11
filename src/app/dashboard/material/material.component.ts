import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent {
  constructor(private router: Router) {
    
  }
  onclick = (id:string) =>this.router.navigate(['navbar/material',id]);

}
