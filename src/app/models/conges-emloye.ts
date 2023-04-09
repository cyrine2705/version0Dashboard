import { Conge } from "./conge";
import { User } from "./user";

export interface CongesEmploye extends Conge {
    employee?:User;
}
