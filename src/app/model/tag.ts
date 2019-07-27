
export class Tag {
    id:string;
    name: string;
    coefficient:number;
    parent:number;
    commensalism_group_ids:number[];
}

export class Tags {
    tag: Tag;
    children:Tag[];
}