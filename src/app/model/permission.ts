export class Permission{
    name:string;
    subjects:PermissionSubject[];
}

export class PermissionSubject{
    id:number;
    checked:boolean;
}