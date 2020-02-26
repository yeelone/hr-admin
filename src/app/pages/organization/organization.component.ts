import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../service/group.service';
import { UploadService } from '../../service/upload.service';
import { TagsService } from '../../service/tags.service';
import { Group } from '../../model/group';
import { Tag } from '../../model/tag';
import { NzModalService } from 'ng-zorro-antd';
import { NzMessageService,UploadFile} from 'ng-zorro-antd';
import config from '../../config/config';
import { Profile } from 'src/app/model/profile';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  topGroups: Group[] = [];
  groups: Group[] = [];
  total: number ;
  selectedGroup: Group;
  selectedGroupText: String;
  selectedTags: Tag[] = [];
  selectedTopTag: Tag;
  profiles: Profile[] = [];

  parentTagMap = {} ; // getGroup获取到的关联标签都是子标签，在显示出来时希望能再进一步显示其父标签的名字
  checkedResult: any = {};
  checkedTagTextList: string[] = [];
  defaultChecked: Tag[] = [];

  visible = false;
  profileDrawerVisible = false;
  currentGroupIndex: number ;

  // modal 
  isOkLoading = false;
  modalVisible = false ;
  importModalVisible = false;
  tagModalVisible = false;

  importType = 'employee'; // 判断上传的类型，employee 表示导入人员表，coefficient表示导入系数表

  errFile = '';
  uploading = false;
  fileList: UploadFile[] = [];
  loading = false;

  rules: string[] = [];
  ruleModalVisible = false;
  defaultTemplateFile = '';
  defaultTemplateFile2 = '';
  constructor(private groupService: GroupService,
              private tagService: TagsService,
              private titleService: Title,
              private modalService: NzModalService,
              public msg: NzMessageService,
              private uploadService: UploadService) { }

  ngOnInit() {
    this.getTopGroup();
    this.defaultTemplateFile = config.baseurl + '/api/download/template/组织-导入人员模板.xlsx';
    this.defaultTemplateFile2 = config.baseurl + '/api/download/template/组织与标签关联模板.xlsx';
    this.titleService.setTitle('组织信息管理');
  }

  getTopGroup(): void {
    this.loading = true ;
    this.groupService.getTopGroup()
     .subscribe(response => {
      if (response['code'] !== 200 ) {
        alert('获取列表失败，失败信息:' + response['message']);
        console.log('group.components getGroups failed , 获取列表失败，失败信息:' + response['message'])
        return ;
      } else {
        this.topGroups = response['data']['groupList'].sort(this.compare('code'));
       this.getGroups(0);
       this.total = response['data']['totalCount'];
      }
      this.loading = false ;

     });
 }

  compare(property) {
    return function(obj1,obj2) {
      const value1 = obj1[property];
      const value2 = obj2[property];
      return value1 - value2;     // 升序
    };
  }

  getGroups(index: number): void {
    this.loading = true ;
    this.currentGroupIndex = index;
    const id = this.topGroups[index].id;

     this.groupService.getGroupByParent(id)
      .subscribe(response => {
        if (response['code'] !== 200 ) {
          alert('获取列表失败，失败信息:' + response['message']);
          console.log('group.components getGroups failed , 获取列表失败，失败信息:' + response['message'])
          return ;
        } else {
          this.groups = response['data']['groupList'].sort(this.compare('code'));
          this.total = response['data']['totalCount'];
        }
        this.loading = false ;
      });
  }

  getGroup(id: number): void {
    this.isOkLoading = true ;
    this.rules = [];
    this.groupService.getGroup(id)
      .subscribe(response => {
        if (response['code'] !== 200 ){
          alert('获取指定的组信息失败，失败信息:' + response['message']);
          return ;
        } else {
          this.selectedGroup = response['data']['group'];
          this.rules = response['data']['rules'] || [];
        }
        this.isOkLoading = false ;
      });
  }

  renderChildGroup(i: number): void {
    this.getGroups(i);
  }

  openEditForm(g: Group): void {
    this.selectedGroup = g ;
    this.visible = true;
  }

  closeEditForm(): void {
    this.visible = false ;
    this.getGroups(this.currentGroupIndex);
  }

  closeProfileEditForm(): void {
    this.profileDrawerVisible = false;
  }

  checkProfile(g: Group): void {
    this.profileDrawerVisible = true;
    this.selectedGroup = g ;
  }

  showDeleteConfirm(id: number, name: string): void {
    this.modalService.confirm({
      nzTitle     : '你确定要删除分类群组' + name + '吗?',
      nzContent   : '<b style="color: red;"> 分类群组: ' + name + '</b>',
      nzOkText    : 'Yes',
      nzOkType    : 'danger',
      nzOkLoading  : this.isOkLoading ,
      nzOnOk      : () => new Promise((resolve, reject) => {
        this.isOkLoading = true;
        this.groupService.deleteGroup(id)
            .subscribe(response => {
              this.isOkLoading = false;
              if ( response['code'] !== 200 ) {
                reject();
              }
              this.getGroups(this.currentGroupIndex);
              resolve();
            });
        }).catch(() => console.log('Oops errors!')),
      nzCancelText: 'No',
      nzOnCancel  : () => console.log('Cancel')
    });
  }

  // changeMembers($event:number[]):void{
  //   this.profileService.addProfilesToGroup(this.selectedGroup,$event)
  //     .subscribe(response=>{
  //       this.msg.success(`成功添加!`);
  //       this.profiles = null;
  //     })
  // }

  lock(id, $event) {
    if ($event) {
      this.groupService.lockGroup(id)
        .subscribe(response => {});
    } else {
      this.groupService.unlockGroup(id)
        .subscribe(response => {});
    }
  }

  invalid(id,$event) {
    if ($event) {
      this.groupService.invalidGroup(id)
        .subscribe(response => {});
    } else {
      this.groupService.validGroup(id)
        .subscribe(response => {});
    }
  }

  handleUpload(): void {
    this.errFile = '';
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });

    this.uploading = true;
    if ( this.importType === 'employee') {
      this.uploadService.uploadGroups(formData)
      .subscribe(
        (event: {}) => {
          this.uploading = false;
          if ( event['data']['file'].length ) {
            this.errFile =  config.baseurl + '/api/download/' + event['data']['file'];
          }
          this.msg.success('upload successfully.');
        },
        err => {
          this.uploading = false;
          this.msg.error('upload failed.');
        }
      );
    } else {
       this.uploadService.uploadGroupTags(formData)
        .subscribe(
          (event: {}) => {
            this.uploading = false;
            console.log(event);
            if ( event['data']['file'].length ) {
              this.errFile =  config.baseurl + '/api/download/' + event['data']['file'];
            }
            this.msg.success('upload successfully.');
          },
          err => {
            this.uploading = false;
            this.msg.error('upload failed.');
          }
        );
    }
  }
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList.push(file);
    return false;
  }
  closeImportModal(){
    this.importModalVisible = false ;
  }

  openImportModal(){
    this.importType = 'employee';
    this.importModalVisible = true ;
  }

  openImportTagsModal() {
    this.importType = 'tags';
    this.importModalVisible = true ;
  }

  onSelected(checked: any): void {
    this.checkedResult = checked;
  }

  onSelectedTop(tag: Tag): void{
    this.selectedTopTag = tag ;
    this.defaultChecked = [];
    if ( !this.selectedGroup.tags ) { return ; }
    for (let i = 0; i < this.selectedGroup.tags.length; i++) {
        this.defaultChecked.push(this.selectedGroup.tags[i]);
    }
  }

  openTagModal(group: Group): void {
    this.selectedGroup = group ;
    this.tagService.getTopTags()
      .subscribe(
        response => {
           if (response['code'] !== 200 ){
            console.log('获取系数表失败，请联系系统管理员' + response['message'] );
            return ;
          }
          const tags = response['data']['tagList'];
          for (let i = 0; i < response['data']['tagList'].length; i++) {
            this.parentTagMap[tags[i].id] = tags[i].name;
          }
        }
      );

    this.getGroup(+this.selectedGroup.id);
    this.tagModalVisible = true ;
  }

  closeTagModal(): void {
    this.tagModalVisible = false;
  }

  submitTags(): void {
    this.isOkLoading = true;
    const tags = this.selectedGroup.tags;
    if ( tags ) {
      for (let i = 0; i < tags.length; i++) {
        if ( this.checkedResult.hasOwnProperty( tags[i].id) ) {
          continue;
        }
        this.checkedResult[tags[i].id] = true ;
      }
    }
    let ids: number[] = [];
    const keys =  Object.keys(this.checkedResult);
    for ( let i = 0 ; i < keys.length; i++) { // string 要转成 number 
      if ( this.checkedResult[keys[i]] ) {
          ids.push(+keys[i]);
      }
    }
    this.groupService.addGroupTagRelationship(+this.selectedGroup.id, ids,this.rules)
      .subscribe(response =>{
          if (response['code'] !== 200 ){
            alert('更新档案与系数关联，请联系系统管理员' + response['message'] );
            console.log('更新档案与系数关联，请联系系统管理员' + response['message'] );
            return ;
          }
          this.getGroup(+this.selectedGroup.id);
          this.isOkLoading = false;
      });
  }

  removeRule(index: number) {
    var _temp = this.rules.slice();
    _temp.splice(index, 1);
    this.rules =  _temp;
  }

  openRuleModal(): void {
    this.ruleModalVisible = true ;
  }

  closeRuleModal(): void {
    this.ruleModalVisible = false ;
  }

  submitRules(): void {
    let r: string[] = [];
    if (this.rules.length > 0 ) {
      r = this.rules.concat();
    }

    let parentGroup = '';
    for (let i = 0; i < this.topGroups.length; i++) {
      if ( +this.topGroups[i].id === this.selectedGroup.parent) {
        parentGroup = this.topGroups[i].name;
      }
    }
    for ( let i = 0 ; i < this.checkedTagTextList.length; i++) {
      const text = parentGroup + '.' + this.selectedGroup.name + ', ' + this.selectedGroupText + ',' + this.checkedTagTextList[i] ;
      r.push(text);
    }

    this.rules = r ;
  }

  onTagSelected(checkedText: string[]): void {
    this.checkedTagTextList = checkedText;
  }

  // onTagSelectedTop(tag:Tag):void{
  //   this.selectedTopTag = tag ;
  // }

  onGroupSelected(event: string): void {
    this.selectedGroupText = event ;
  }

  onTagClose(index: number): void {

    this.isOkLoading = true;
    let tags = this.selectedGroup.tags.concat();
    tags.splice(index, 1);

    let ids: number[] = [];
    for ( let i = 0 ; i < tags.length; i++) { // string 要转成 number 
        ids.push(+tags[i].id);
    }
    this.groupService.addGroupTagRelationship(+this.selectedGroup.id, ids, this.rules)
      .subscribe(response =>{
          if (response['code'] !== 200 ){
            alert('更新档案与系数关联，请联系系统管理员' + response['message'] );
            console.log('更新档案与系数关联，请联系系统管理员' + response['message'] );
            return ;
          }

          this.getGroup(+this.selectedGroup.id);
          this.isOkLoading = false;
          alert('已移除该标签');
      });
  }

}
