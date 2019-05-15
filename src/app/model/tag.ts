
export class Tag {
    id:string;
    name: string;
    coefficient:number;
    parent:number;
}

export class Tags {
    tag: Tag;
    children:Tag[];
}