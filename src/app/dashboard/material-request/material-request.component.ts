import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Material } from 'src/app/models/material';
import { MaterialEmployee } from 'src/app/models/material-employee';
import { EmployesService } from 'src/app/services/employes.service';
import { MaterialService } from 'src/app/services/material.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from 'src/app/models/notification';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-material-request',
  templateUrl: './material-request.component.html',
  styleUrls: ['./material-request.component.css']
})
export class MaterialRequestComponent {
  idMaterial:String = 'addEvent';
  materialsWithEmployee: MaterialEmployee[] = [];;
  constructor(private activatedRoute:ActivatedRoute, private router:Router , private materialService:MaterialService, private employeService: EmployesService,private notifService:NotificationService ) { }
  ngOnInit() {
    this.idMaterial = this.activatedRoute.snapshot.params['idfs'];
  console.log(this.idMaterial);
    
    this.getMaterials();
  
 
  }
  getMaterials(): void {
    this.materialService.getAllMaterial().subscribe(
    
      (materials: Material[]) => {
        materials.filter(material => material.state === 'Awaiting' && material.type == this.idMaterial)
     
          .map(material => {
            this.employeService.getEmploye(material.idEmploye).subscribe(employee => {
              const materialWithEmployee: MaterialEmployee = {
                id: material.id,
                type: material.type,
                date: material.date,
                description: material.description,
                quantity: material.quantity,
                state: material.state,
                idEmploye: material.idEmploye,
                employee: employee,
              };
              
              this.materialsWithEmployee.push(materialWithEmployee);
              console.log("wooooork"+materialWithEmployee);
            });
          });
          console.log("hhhhh", this.materialsWithEmployee);
      },
      
    );

  }
  onClick(id: string, state: string,deviceToken:string): void {
    this.materialService.changeMaterialState(id, state.toString()).subscribe(
        async (mat: Material) => {
          console.log(state)
          if(state=="Approuved"){
            const { value: text } = await Swal.fire({
              input: 'textarea',
              inputLabel: 'Material approuved',
              inputPlaceholder: 'Type your message here...',
              inputAttributes: {
                'aria-label': 'Type your message here'
              },
              showCancelButton: true
            })
            
            if (text) {
              Swal.fire(text);
              
              const notif:Notification={title:"Material Approuved",message:text,token:deviceToken.replace(/"/g, '')};
              this.notifService.sendNotification(notif).subscribe(data =>{console.log(data)});

            }}
            else {
              const { value: text } = await Swal.fire({
                input: 'textarea',
                inputLabel: 'Leave Declined',
                inputPlaceholder: 'Type your message here...',
                inputAttributes: {
                  'aria-label': 'Type your message here'
                },
                showCancelButton: true
              })
              console.log(deviceToken.replace(/"/g, ''))
              
              if (text) {
                Swal.fire(text);
                
                const notif:Notification={title:"Leave Declined",message:text,token:deviceToken.replace(/"/g, '')};
                this.notifService.sendNotification(notif).subscribe(data =>{console.log(data)});

              }

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
  
  

  retour() {
    this.router.navigate(['/employes']);
  }
}




