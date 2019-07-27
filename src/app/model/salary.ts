import { Template } from "./template";
import { Group } from "./group";
import { Profile } from "./profile";

export class BaseSalary{
    base:number;
    tax_threshold:number;
}

export class SalaryTemplate{
    id:number;
    name:string;
    type:string;
    months:number;
    startup:boolean;
    order:number;
    file:string;
    groups:number[];
    user_id:number;
    body:Map<string,Template>;
    Fields:Template[];
}
export class SalaryProfileConfig{
    template_field_id:string;
    template_field:Template;
    description:string;
    value:number;
    operate:string;
    profile_id:number;
    profile:Profile;
}

export class SalaryTemplateAccount{
    id:number;
    name:string;
    order:number[];
    templates:SalaryTemplate[];
    groups:Group[];
}

export class QuerySalary{
    accountid:number;
    year:string;
    month:string;
    template:string;
}

export class DownloadSalary {
    file:string;
}

export class RelatedSalary{
    id:number; 
    account:string;
    template:string;
    field:string;
    fieldId:string;
    fields:string[];
    year:string;
    month:string;
}

export class TaxConf {
    threshold:number;
    old_age_rating:number;
    medical_rating:number;
    unemployment_rating:number;
    housing_fund_rating:number;
    level:number[];
    rating:number[];
    deduction:number[];
}