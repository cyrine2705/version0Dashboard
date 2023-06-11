
import { Reclam } from "./reclam";
import { User } from "./user";

export interface ReclamEmploye extends Reclam {
    employee?:User;
}
