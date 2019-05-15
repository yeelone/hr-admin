import { User } from "./user";

export class UserGroup {
    id:string;
    name: string;
    users: User[];
    parent:number;
    levels: string;
}