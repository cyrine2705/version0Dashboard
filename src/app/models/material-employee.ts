import { Material } from "./material";
import { User } from "./user";

export interface MaterialEmployee extends Material {
   
    employee?:User;
}
