import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Conge } from 'src/app/models/conge';
import { CongesEmploye } from 'src/app/models/conges-emloye';
import { CongesService } from 'src/app/services/conges.service';
import { EmployesService } from 'src/app/services/employes.service';

@Component({
  selector: 'app-conges',
  templateUrl: './conges.component.html',
  styleUrls: ['./conges.component.css']
})
export class CongesComponent {
  conges:Conge[];
 leavesWithEmployee:CongesEmploye[] = [];
 
  constructor(private congesService: CongesService,private router:Router,private employesService :EmployesService) { }
  ngOnInit(): void {
    this.getAllConges();
  }

  getAllConges(): void {
    
   this.congesService.getAllConges().subscribe(leaves => {
   
   
     for (const leave of leaves) {
       this.employesService.getEmploye(leave.idEmploye).subscribe(employee => {
      
         const leaveWithEmployee: CongesEmploye = {
           id: leave.id,
           type: leave.type,
           description: leave.description,
           startDate: leave.startDate,
           endDate: leave.endDate,
           proof: leave.proof,
           state: leave.state,
           idEmploye: leave.idEmploye,
           employee: employee
         };
   
        
         this.leavesWithEmployee.push(leaveWithEmployee);
       });
     }
   
     // Now you have an array of LeaveWithEmployee objects that includes both leave and employee info
     console.log(this.leavesWithEmployee);
   });
     }

     public nbrJours(startDate: string, endDate: string):Number{
     const date1=new Date(startDate);
     const date2=new Date(endDate);
     const diffInMs: number = date2.getTime() - date1.getTime();
const diffInDays: number = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
 return diffInDays;
     }
}
