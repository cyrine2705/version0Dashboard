import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Conge } from 'src/app/models/conge';
import { CongesEmploye } from 'src/app/models/conges-emloye';
import { CongesService } from 'src/app/services/conges.service';
import { EmployesService } from 'src/app/services/employes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conges',
  templateUrl: './conges.component.html',
  styleUrls: ['./conges.component.css']
})
export class CongesComponent {
  public decodeURIComponent = window['decodeURIComponent'];
  conges:Conge[];
 leavesWithEmployee:CongesEmploye[] = [];
 
  constructor(private congesService: CongesService,private router:Router,private employesService :EmployesService) { }
  ngOnInit(): void {
    this.getAllConges();
  }

  getAllConges(): void {
    
    this.congesService.getAllConges().subscribe(leaves => {
      for (const leave of leaves) {
        if (leave.state === 'awaiting') { // add this if condition
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
      }
    });
     }
   
  

     public nbrJours(startDate: string, endDate: string):number{
     const date1=new Date(startDate);
     const date2=new Date(endDate);
     const diffInMs: number = date2.getTime() - date1.getTime();
const diffInDays: number = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
 return diffInDays +1;
     }
     onClick(id: string, state: string,nb:number): void {
      this.congesService.changeCongeState(id, state.toString(),nb).subscribe(
          (conge: Conge) => {
            console.log(nb,state)
            if(state=="Approuved"){
              Swal.fire({
                  title: `this Leave request has been aprrouved successfully `,
                  icon: 'success',
                  position: 'center',
                  timer: 2000,
                  showConfirmButton: false
              });}
              else {
                Swal.fire({
                  title: `this Leave request has been declined successfully`,
                  icon: 'error',
                  position: 'center',
                  timer: 2000,
                  showConfirmButton: false
              });

              }
          },
          (error) => {
              Swal.fire({
                  title: `Error updating leave request ${id} state: ${error}`,
                  icon: 'error',
                  position: 'center',
                  timer: 2000,
                  showConfirmButton: false
              });
          }
      );
  }
}
