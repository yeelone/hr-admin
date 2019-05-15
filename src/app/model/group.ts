import { User } from "./user";
import { Tag } from "./tag";

export class Group {
    id:string;
    name: string;
    users: User[];
    tags:Tag[];
    code: number; 
    parent:number;
    levels: string;
    coefficient:number;
    locked:boolean;
    invalid:boolean;
    is_default:boolean;
}