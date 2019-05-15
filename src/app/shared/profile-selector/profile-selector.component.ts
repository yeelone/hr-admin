import { Component, OnInit, Input,SimpleChanges, Output,EventEmitter } from '@angular/core';
import { Profile } from '../../model/profile';
import { ProfileService } from '../../service/profile.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Group } from '../../model/group';

@Component({
  selector: 'app-profile-selector',
  templateUrl: './profile-selector.component.html',
  styleUrls: ['./profile-selector.component.scss']
})
export class ProfileSelectorComponent implements OnInit {
  @Input()
  visible:boolean = true;
  
  list:any[] = [];
  profiles: Profile[] = [];
  defaultProfiles:Profile[] = [];
  targetGroup:Group ; 

  checkedProfiles: Profile[] = []; //已选择的Profile

  members:Map<number,string> = new Map<number,string>();

  total:number;
  defaultLimit = 10;
  
  selectedMap = {};
  searchValue = "";

  //table configs
  pageIndex = 1;
  limit = this.defaultLimit ; 
  offset = 0;
  pagination = true;
  loading = false ; 

  @Output()
  onSelect:EventEmitter<Profile[]>=new EventEmitter();

  @Output()
  onCancel:EventEmitter<boolean>=new EventEmitter();

  constructor(private profileService: ProfileService,public msg: NzMessageService) { }

  ngOnInit() {
    // this.targetGroup = new Group();
    // this.targetGroup.id = "0" ;
    // this.getData();
  }

  ngOnChanges(changes: SimpleChanges): void { 
  }

  getData():void{
    this.offset = ( this.pageIndex - 1 ) * this.limit ;
    this.getProfilesByGroup();
  }

  onPageIndexChange(index:number){
    this.pageIndex = index;
    this.getData();
  }

  onPageSizeChange(size:number){
    this.limit = size;
    this.pageIndex= 1;
    this.getData();
  }

  onSubmit():void{
    this.onSelect.emit(this.checkedProfiles);
  }

  getSelectedNode(event:Group):void{
    this.targetGroup = event;
    this.limit = this.defaultLimit;
    this.offset = 0 ;
    this.profiles.splice(0,this.profiles.length) ;
    this.getProfilesByGroup();
  }

  getProfilesByGroup():void{
    this.loading = true ;
    this.profileService.getProfilesByGroup(+this.targetGroup.id,this.offset,this.limit,"false")
      .subscribe(response => {
        if (response["code"] !== 200 ){
          this.msg.error("无法获取档案");
        }else{
          this.profiles = response["data"]["profileList"];
          this.total = response["data"]["totalCount"];
        }
        this.loading = false ; 
      })
  }

  checkAllProfiles():void{
    this.loading = true ; 
    this.profileService.getProfilesByGroup(+this.targetGroup.id,0,100000,"false")
      .subscribe(response => {
        this.checkedProfiles = response["data"]["profileList"];
        this.total = response["data"]["totalCount"];
        this.loading = false ; 
      })
  }


  checkProfile(p:Profile){
    this.selectedMap[p.id] = !this.selectedMap[p.id] ; 
    let _temp :Profile[] = this.checkedProfiles.slice();
    if ( this.selectedMap[p.id]) {
      _temp.push(p);
      this.checkedProfiles = _temp;
    }else{
      for ( let i=0; i< this.checkedProfiles.length; i++){
        if ( this.checkedProfiles[i].id === p.id ) {
          _temp.splice(i,1);
          this.checkedProfiles = _temp;
        }
      }
    }
    
  }
  openModal(){
    this.visible = true ; 
  }

  closeModal(){
    this.visible = false ; 
    this.onCancel.emit(true);
  }

  searchProfile():void{
    this.loading = true ; 
    this.profileService.searchProfiles("name", this.searchValue, 0, 10)
      .subscribe(
        response =>{
          if (response["code"] !== 200 ){
            alert("搜索失败" + response["message"])
            return ;
          }
          this.profiles = response["data"]["profileList"];
          this.total = response["data"]["totalCount"];
          this.loading = false ;   
        }

      )
  }
}
