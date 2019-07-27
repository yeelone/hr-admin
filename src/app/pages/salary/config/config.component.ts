import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/model/profile';
import { ProfileService } from 'src/app/service/profile.service';
import { RelatedSalary, SalaryProfileConfig } from 'src/app/model/salary';
import { SalaryService } from 'src/app/service/salary.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class SalaryConfigComponent implements OnInit {
  mapOfExpandData: { [key: string]: boolean } = {};

  selectorModalVisible:boolean = false ; 
  templateVisible:boolean = false ; 
  selectedOperator:string = '';
  opeateValue:number = 0 ;
  description:string = '';
  profile:Profile;
  templateField:RelatedSalary;

  loading:boolean = false;

  configList: SalaryProfileConfig[] = [];

  widthConfig = ['100px', '200px', '200px', '100px', '100px', '100px'];
  
  constructor(private salaryService:SalaryService) { }

  ngOnInit() {
    this.getConfig();
  }

  getConfig(){
    this.loading = true ;
    this.salaryService.getProfileConfig()
      .subscribe((resp)=>{
        if ( resp['code'] === 200 ){
          this.configList = resp['data']['config_list'];
        }

        this.loading = false; 
      });
  }

  changeMembers(profiles:Profile[]){
    this.profile = profiles[0];
  }

  selectProfile():void{
    this.selectorModalVisible = true ;
  }

  closeModal():void{
    this.selectorModalVisible = false ;
  }

  openSelectTemplateModal():void{
    this.templateVisible = true ;
  }

  onRelatedFieldSelected(r:RelatedSalary):void{
    this.templateField = r ;
  }

  closeTempalteSelector():void{
    this.templateVisible = false ;
  }

  deleteRow(id:number):void{
    this.loading = true ; 
    this.salaryService.deleteProfileConfig(id)
      .subscribe(
        (resp) => {
          if (resp['code'] === 200 ){
            alert("删除成功");
            this.getConfig();
          }else{
            alert("删除失败," +  resp['message']);
          }
          this.loading = false; 
        }
      )
  }


  saveConfig():void{

    const data = new SalaryProfileConfig();
    data.profile_id = this.profile.id;
    data.template_field_id = this.templateField.fieldId;
    data.operate = this.selectedOperator;
    data.value = this.opeateValue;
    data.description = this.description;

    this.loading = true; 
    this.salaryService.createProfileConfig(data)
      .subscribe((resp)=>{
        console.log(resp);
        if ( resp['code'] === 200){
          alert("保存成功");
          this.getConfig();
        }else{
          alert("出错啦...");
        }
        this.loading = false;
      })
  }
}