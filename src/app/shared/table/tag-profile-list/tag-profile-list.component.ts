import { Component, OnInit,Input } from '@angular/core';
import { Profile } from '../../../model/profile';
import { Tag } from '../../../model/tag';
import { ProfileService } from '../../../service/profile.service';
@Component({
  selector: 'app-tag-profile-list',
  templateUrl: './tag-profile-list.component.html',
  styleUrls: ['./tag-profile-list.component.css']
})
export class TagProfileListComponent implements OnInit {
  selectorModalVisible:boolean = false ; 
 
  targetTag:Tag = new Tag();
  profiles: Profile[] = [];
  remark:string ;

  @Input()
  set tag(tag: Tag) {
    this.targetTag = tag;
    if ( Object.keys(tag).length  ){
      this.getProfiles();
    }
  }

  constructor(private profileService:ProfileService) { }

  ngOnInit() {
    
  }
  
  getProfiles(){
    this.profileService.getProfilesByTag(+this.targetTag.id,0,1000)
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
    this.profileService.addProfilesToTag(this.targetTag,ids,this.remark )
      .subscribe(
        (event : {}) => {
           this.getProfiles();
        } ,
        err => {

        }
      )
  }

  openModal(){
    this.selectorModalVisible = true ;
  }

  closeModal(){
    this.selectorModalVisible = false ;
  }
  
  removeProfile(id:number){
    this.profileService.removeProfilesToTag(this.targetTag,[id],this.remark )
      .subscribe(
        (event : {}) => {
          this.getProfiles();
        } ,
        err => {

        }
      )
  }
}
