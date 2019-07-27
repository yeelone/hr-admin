import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { SalaryTemplate,RelatedSalary } from '../../../../model/salary';
import { Template } from '../../../../model/template';
import { SalaryTemplateAccount } from '../../../../model/salary';
import { TemplateService } from  '../../../../service/template.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-template-fields-selector',
  templateUrl: './template-fields-selector.component.html',
  styleUrls: ['./template-fields-selector.component.css']
})
export class TemplateFieldsSelectorComponent implements OnInit {
  fields:Template[]
  templates:SalaryTemplate[];
  selectedAccount:SalaryTemplateAccount;
  selectedTemplate:SalaryTemplate;
  selectedMonth:any ;

  checked:boolean = false; 
  
  radioValue:string;

  @Output()
  selectedField:EventEmitter<RelatedSalary>=new EventEmitter();

  @Output()
  onClose:EventEmitter<boolean>=new EventEmitter();

  constructor(private templateService:TemplateService, private msg: NzMessageService) { }
  
  ngOnInit(){}

  getTemplates():void{
    this.templateService.listAccountTemplate(this.selectedAccount.id)
      .subscribe(response => {
        if ( response['code'] == 200 ){
          this.templates = response['data']['templates'];
        }else{
          this.msg.error("无法获取模板:"+ response["message"])
        }
        
      })
  }

  selectedChange(t:SalaryTemplate):void{
    this.checked = true ; 
    this.templateService.get(t.id)
      .subscribe(response => {
        if ( response['code'] == 200 ){
          this.fields = response['data']['Fields']; 
        }else{
          this.msg.error("无法获取字段:"+ response["message"])
        }
      })
  }

  close():void{
    this.onClose.emit(true);
  }

  submit():void{
    let t = new RelatedSalary();
    t.account = this.selectedAccount.name;
    t.template = this.selectedTemplate.name;
    t.field = this.radioValue;
    t.year = "" //moment(this.selectedMonth).format('YYYY'),
    t.month = "" //moment(this.selectedMonth).format('MM')

    this.fields.map((field)=>{
      if (field.key === t.field ) {
        t.fieldId = field.id;
      }
    });

    this.selectedField.emit(t);
  }

  onSelectedTemplateAccount(tc:SalaryTemplateAccount):void{
    this.selectedAccount = tc ;
    this.getTemplates(); 
  }
}
