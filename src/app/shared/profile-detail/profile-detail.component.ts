import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title }     from '@angular/platform-browser';
import { ProfileService } from '../../service/profile.service';
import { TagsService } from '../../service/tags.service';
import { Profile } from '../../model/profile';
import { Tags, Tag } from '../../model/tag';
import { TransferRecord } from '../../model/transfer';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  profile: Profile;
  tags: Tags[] = [];
  transferRecords:TransferRecord[];
  loading:boolean = false;
  tagsLoading:boolean = false ; 
  
  modalVisible:boolean = false;
  selectedTags:Tag[] = [];
  selectedTopTag:Tag;
  checkedResult:any = {};
  defaultChecked:Tag[] = [];
  isOkLoading:boolean = false ;

  constructor(private route:ActivatedRoute,private profileService:ProfileService,private tagsService:TagsService,private titleService: Title ) {
  }

  ngOnInit() {
      let id = this.route.snapshot.paramMap.get('id');
      this.getProfile(+id);
      this.titleService.setTitle( this.profile.name );
      this.getRecords(+id);
  }
  
  getProfile(id:number):void{
    this.loading = true ; 
    this.profileService.getProfileWithTags(id)
      .subscribe(
        response => {
          console.log(response)
          if (response["code"] !== 200 ){
            alert("获取用户详细信息失败，请联系系统管理员" + response["message"] );
            console.log("获取用户详细信息失败，请联系系统管理员" + response["message"] );
            return ; 
          }
          
          this.profile = response["data"]["profile"];
          this.tags = response["data"]["tags"];
          this.loading = false;
        }
      )
  }

  getRecords(id:number):void{
    this.loading = true ; 
    this.profileService.getProfileTransferRecord(id)
      .subscribe(
        response => {
          if (response["code"] !== 200 ){
            alert("获取职工变更记录失败，请联系系统管理员" + response["message"] );
            console.log("获取职工变更记录失败，请联系系统管理员" + response["message"] );
            return ; 
          }
          
          this.transferRecords = response["data"]["transfer"];
          this.loading = false;
        }
      )
  }

  onDeleteTag(event):void{
    console.log(event);
  }

  openModal():void{
    this.modalVisible = true ; 
  }
  
  closeModal():void{
    this.modalVisible = false;
  }

  onSelected(checked:any):void{
    this.checkedResult = checked;
  }

  onSelectedTop(tag:Tag):void{
    this.selectedTopTag = tag ;
    this.defaultChecked = [];
    if ( !this.tags ) {
      return ;
    }

    for(let i=0;i < this.tags.length;i++) {
      if ( this.tags[i].tag.id === tag.id ){
        this.defaultChecked = this.tags[i].children;
      }
    }
  }

  submitTags():void{
    this.isOkLoading = true;

    if ( this.tags ) {
      for(let i=0;i < this.tags.length;i++) {
        for ( let j=0;j< this.tags[i].children.length;j++){
          if ( this.checkedResult.hasOwnProperty(this.tags[i].children[j].id) ) {
            continue;
          }
          this.checkedResult[this.tags[i].children[j].id] = true ;
        }
      }
    }
    
    console.log("this.checkedResult", this.checkedResult)
    let ids:number[] = [];
    const keys = Object.keys(this.checkedResult);
    for ( let i=0 ;i< keys.length;i++){ //string 要转成 number 
      if ( this.checkedResult[keys[i]] ){
          ids.push(+keys[i]);
      }
    }
    this.profileService.addProfileTagRelationship(this.profile.id, ids)
      .subscribe(response =>{
        console.log("response",response);
          if (response["code"] !== 200 ){
            alert("更新档案与系数关联，请联系系统管理员" + response["message"] );
            console.log("更新档案与系数关联，请联系系统管理员" + response["message"] );
            return ; 
          }
          this.getProfile(this.profile.id);
          this.isOkLoading = false;
      })

  }
}
