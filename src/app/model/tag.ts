
export class Tag {
    id: string;
    name: string;
    coefficient: number;
    parent: number;
    profileCount: number;
    commensalismGroupIds: number[];
}

export class Tags {
    tag: Tag;
    children: Tag[];
}
