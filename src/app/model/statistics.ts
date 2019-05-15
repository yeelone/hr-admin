export class StatisticsQuery {
    account:number ;
    year:string;
    templates: StatisticsTemplate[] ;
}

export class StatisticsTemplate {
    template:string ; 
    fields:String[];
}
