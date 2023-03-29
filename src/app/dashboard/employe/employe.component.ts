import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent {
  idProduit:number=15;
  constructor(private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.idProduit = this.activatedRoute.snapshot.params['id'];
  }
 retour(){
  this.router.navigate(['/employes']);

 }
}
