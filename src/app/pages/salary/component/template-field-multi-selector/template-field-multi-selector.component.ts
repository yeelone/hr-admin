import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { SalaryTemplate,RelatedSalary } from '../../../../model/salary';
import { Template } from '../../../../model/template';
import { TemplateService } from  '../../../../service/template.service';

@Component({
  selector: 'app-template-field-multi-selector',
  templateUrl: './template-field-multi-selector.component.html',
  styleUrls: ['./template-field-multi-selector.component.css']
})
export class TemplateFieldMultiSelectorComponent implements OnInit {
  fields:Template[] = [];
  templates:SalaryTemplate[] = [];;
  selectedTemplate:SalaryTemplate;

  checked:boolean = false; 
  
  radioValue:string;

  @Output()
  onSelected:EventEmitter<RelatedSalary>=new EventEmitter();
  
  constructor(private templateService:TemplateService) { }

  ngOnInit() {
    this.getTemplates();
  }

  getTemplates():void{
    this.templateService.list()
      .subscribe(response => {
        this.templates = response['data']['List'];
      })
  }

  selectedChange(t:SalaryTemplate):void{
    this.checked = true ; 
    this.selectedTemplate = t ; 
    this.templateService.get(t.id)
      .subscribe(response => {
        this.fields = response['data']['Fields']; 
      })
  }

  onChecked(fields):void{
    let m = new RelatedSalary();
    m.id = this.selectedTemplate.id ; 
    m.template = this.selectedTemplate.name; 
    m.fields = fields ; 
    this.onSelected.emit(m);
  }

}
