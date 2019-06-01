import { Component, OnInit } from '@angular/core';
import { Profile } from '../../../model/profile';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { SalaryService } from '../../../service/salary.service';
import { Template } from 'src/app/model/template';
import * as moment from 'moment';
import { User } from 'src/app/model/user';
import { GroupService } from 'src/app/service/group.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-adjust',
  templateUrl: './adjust.component.html',
  styleUrls: ['./adjust.component.scss']
})
export class AdjustComponent implements OnInit {
  selectedProfile:Profile = new Profile();
  selectedMonth:any ;
  selectorModalVisible:boolean = false ; 
  monthPickerDisable:boolean = true; 

  templates:Template[] = [];

  changeValueMap:Map<string,number> ;
  inputBtnDisable = {};
  currentUser:User; 
  showPorfileSelector: boolean = true;

  profileInfoMap = {};
  department:string = "";
  post:string = "";
  groupMap = {};

  loading:boolean = false;

  constructor(private msg: NzMessageService,private salaryService:SalaryService,
            private groupService:GroupService,
            private profileService:ProfileService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || new User();
    
    for ( let i=0;i< this.currentUser.roles.length ;i++){
      if (this.currentUser.roles[i].name == "查询岗") {
        this.showPorfileSelector = false;
        this.monthPickerDisable = false;
        this.selectedProfile = this.currentUser.profile;
      }
    }
   
    this.groupService.getTopGroup()
      .subscribe(resp => {
        if ( resp['code'] == 200 ){
          this.groupMap = {};
          let groups = resp['data']['groupList'];
          for(let i = 0 ;i< groups.length;i++){
            this.groupMap[groups[i].id] = groups[i].name;
          }
          if ( this.currentUser.profile.groups ){
            for(let i = 0 ;i< this.currentUser.profile.groups.length;i++){
              let g = this.currentUser.profile.groups[i];
              this.profileInfoMap[this.groupMap[g.parent]] = g.name;
            }
          }
          
        }
      });
    
  }

  closeModal():void{
    this.selectorModalVisible = false ;
  }

  changeMembers(profiles:Profile[]):void{
    this.selectorModalVisible = false;
    
    if ( profiles.length > 1 ) {
      this.msg.error("只允许选择一个员工，请重新选择");
      return ; 
    }
    this.monthPickerDisable = false;
    this.loading = true ; 
    this.profileService.getProfile(profiles[0].id)
      .subscribe(resp=>{
          if (resp["code"] != 200 ){
            alert("无法查询到员工信息，错误:"+ resp["message"] + "," + resp["data"]);
            return ;
          }
           this.selectedProfile = resp["data"]["profile"];
            if ( this.selectedProfile.groups ){
            for(let i = 0 ;i< this.selectedProfile.groups.length;i++){
              let g = this.selectedProfile.groups[i];
              this.profileInfoMap[this.groupMap[g.parent]] = g.name;
            }
          }
          this.loading = false;
      })
   
    
  }

  showProfileSelector():void{
    this.selectorModalVisible = true;
    this.monthPickerDisable = true;
  }

  showProfileSalary():void{
    var month =  moment(this.selectedMonth).format('MM');
    var year =  moment(this.selectedMonth).format('YYYY');
    this.salaryService.getProfileSalaryByYearAndMonth(this.selectedProfile.id, year, month)
    // this.salaryService.getProfileSalaryByYearAndMonth(710, "2019", "01")
      .subscribe(response=>{
        if( response["code"] != 200 ){
          alert(response["message"] + response["data"]);
          return ;
        }
        //处理一下模板
        let list = response["data"]["template_list"] ;
        for( let i=0 ;i < list.length ; i++){
           let template = list[i];
           let key = Object.keys(template)[0];
           let valid:number = 0 ;
           let fields = template[key] ;
           for (let j=0 ; j< fields.length;j++){
             let field = fields[j];
             if (field['type'] != 'Base' && field['type'] != 'Related' && field['value'] != 0){
               valid++ ;
             }
           }
           if ( valid > 0 ){
            this.templates.push(template);
           }
           
        }
        
        this.selectedProfile = response["data"]["profile"];
        this.department = response["data"]["department"];
        this.post = response["data"]["post"];
        this.disableAllInput();
      })
  }

  //将所有的数值项都disable掉，用户
  disableAllInput(){
    for( let i=0; i< this.templates.length; i++ ){
      let fields = Object.values(this.templates[i])[0] ;
      for( let j=0; j< fields.length;j++){
        let field = fields[j];
        this.inputBtnDisable[field["key"]] = true;
      }
    }
  }

  enableInput(key:string):void{
    this.inputBtnDisable[key] = false;
  }

  keys() : Array<string> {
    return Object.keys(this.templates);
  }

  getKey(obj):string{
    return Object.keys(obj)[0];
  }

}
