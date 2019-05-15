export class Template{
	id:string;
    key:string;
	type:string;
	invalid:boolean;
	name:string;
	alias:string;
	require:string[];
	call:string;
	order:number;
	formula:string;
	from:string;
	value:number;
	params: string[];
	related_templateaccount: string;
	related_template: string;
	related_key:string;
	related_year:string;
	related_month:string;
	should_tax:boolean;    //是否纳税
	is_income:boolean;    //收入项
	is_deduct:boolean;    //扣除项
	description:string;
	fit_into_month:string; //纳入月份,LASTMONTH 指上个月，默认当月
	fixed_data:boolean;
	must_rounding:boolean;
	visible:boolean ; //可见性,导出时是否显示在excel中
}

export class BuildinFunc {
	Name: string;
	Alias: string;
	Mehtod:string;
	Required:string[];
	NeedRequired: boolean;
	NeedParams: boolean;
	Params:string[];
	Return:string;
}