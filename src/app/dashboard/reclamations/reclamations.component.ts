import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Conge } from 'src/app/models/conge';
import { CongesEmploye } from 'src/app/models/conges-emloye';
import { Reclam } from 'src/app/models/reclam';
import { ReclamEmploye } from 'src/app/models/reclam-employe';
import { CongesService } from 'src/app/services/conges.service';
import { EmployesService } from 'src/app/services/employes.service';
import { ReclamationService } from 'src/app/services/reclamation.service';

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.css']
})
export class ReclamationsComponent {
  reclams:Reclam[];
  reclamsWithEmployee:ReclamEmploye[] = [];
 
  constructor(private reclamService: ReclamationService,private router:Router,private employesService :EmployesService) { }
  ngOnInit(): void {
    this.getAllReclams();
  }

  getAllReclams(): void {
    
    this.reclamService.getAllReclams().subscribe(reclams => {
      for (const reclam of reclams) {
          this.employesService.getEmploye(reclam.idEmploye).subscribe(employee => {
            const reclamWithEmployee: ReclamEmploye = {
              id: reclam.id,
              topic: reclam.topic,
              description: reclam.description,
              
              idEmploye: reclam.idEmploye,
              employee: employee
            };
            this.reclamsWithEmployee.push(reclamWithEmployee);
          });
        
      }
    });
     }
   

}
