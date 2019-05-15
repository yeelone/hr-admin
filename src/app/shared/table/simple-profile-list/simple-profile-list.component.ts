import { Component, OnInit,Input } from '@angular/core';
import { Profile } from '../../../model/profile';
import { Group } from '../../../model/group';
import { ProfileService } from '../../../service/profile.service';

@Component({
  selector: 'app-simple-profile-list',
  templateUrl: './simple-profile-list.component.html',
  styleUrls: ['./simple-profile-list.component.css']
})
export class SimpleProfileListComponent implements OnInit {
  selectorModalVisible:boolean = false ; 
 
  targetGroup:Group = new Group();
  profiles: Profile[] = [];
  remark: string ;
  @Input()
  set group(group: Group) {
    this.targetGroup = group;
    if ( group ){
      this.getProfiles();
    }
  }

  constructor(private profileService:ProfileService) { }

  ngOnInit() {
    
  }
  
  getProfiles(){
    this.profileService.getProfilesByGroup(+this.targetGroup.id,0,1000,"false")
        .subscribe(response => {
          this.profiles = response["data"]["profileList"];
        })
  }

  changeMembers(profiles:Profile[]){
    this.selectorModalVisible = false;
    let ids:number[] = [];
    for( let i=0;i< profiles.length ; i++){
      ids.push(profiles[i].id);
    }
    this.profileService.addProfilesToGroup(this.targetGroup,ids ,this.remark)
      .subscribe(
        (event : {}) => {
           this.getProfiles();
        } ,
        err => {

        }
      )
  }

  openModal():void{
    this.selectorModalVisible = true ;
  }

  closeModal():void{
    this.selectorModalVisible = false ;
  }
  
  removeProfile(id:number):void{
    this.profileService.removeProfilesToGroup(this.targetGroup,[id] ,this.remark)
      .subscribe(
        (event : {}) => {
          this.getProfiles();
        } ,
        err => {

        }
      )
  }

}
