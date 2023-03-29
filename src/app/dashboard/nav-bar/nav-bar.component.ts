import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  elements = [
    { id: 1, name: 'Overview', imageUrl: "../assets/icons/overview.png", place: "overview"},
    { id: 2, name: 'Employes', imageUrl: "../assets/icons/employees.png", place: "employes"},
    { id: 3, name: 'Presence', imageUrl: "../assets/icons/presence.png", place: 'presence' },
    { id: 4, name: 'Material', imageUrl: "../assets/icons/material.png", place: 'material' },
    { id: 5, name: 'Leaves', imageUrl: "../assets/icons/conge.png", place: 'conges' },
    { id: 6, name: 'Reclamations', imageUrl: "../assets/icons/reclamation.png", place: 'reclamations' },
  ];
  showNotifications: boolean=false;
  selectedElement: any;

  constructor(private router: Router) {}
  show(): void {

    this.showNotifications=!this.showNotifications;
  }


  selectElement(element: any) {
    this.selectedElement = element;
  
  }
}







  
 


