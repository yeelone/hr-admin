import { Component, OnInit } from '@angular/core';
import { Profile } from '../../model/profile';
import { AuditStateMap } from '../../model/audit';
import { ProfileService } from '../../service/profile.service';
import { UploadService } from '../../service/upload.service';
import { NzModalService, NzMessageService, UploadFile } from 'ng-zorro-antd';
import { Group } from '../../model/group';
import config from 'src/app/config/config';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  profiles: Profile[] = [] ;
  selectedProfile: Profile;
  targetGroup: Group = new Group() ;
  topParentGroup = '0';
  moveGroupParent = '' ; // 记录调动的父类，如部门，岗位，学历
  moveTopGroup = '0'; // 在调动弹窗里选择的调动类型
  moveToNewGroupID: number ;
  remark = ''; // 创建、更新、删除时必须加入备注
  total: number ;
  queryFreezed = 'false'; // 请求冻结的，或者是激活的

  defaultLimit = 10;
  // editor drawer
  visible = false ;

  // modal
  isOkLoading = false;
  modalVisible = false ;
  importModalVisible = false;
  moveModalVisible = false;
  deleteModalVisible = false;
  freezeModalVisible = false;
  // upload
  uploading = false;
  fileList: UploadFile[] = [];

  // table config
  pageIndex = 1;
  limit = this.defaultLimit ;
  offset = 0;
  pagination = true;
  loading = false ;
  moveLoading = false;
  allChecked = false;
  disabledButton = true;

  checkedMap = {};

  searchValue = '';

  stateMap = AuditStateMap;

  description = '';

  targetProfile: Profile = new Profile();

  freezeButtonDisable = true ;  // 冻结按钮显示
  freezeLoading = false;
  isFreeze = true ;  // 冻结或者解冻

  clearProfileTags = false ; // 员工调动时是否清除员工相应的标签
  defaultTemplateFile = '';
  importErrorFile = '';
  importErrorMsg = '';

  current = 0;
  constructor(private profileService: ProfileService,
              private uploadService: UploadService,
              private modalService: NzModalService,
              private titleService: Title ,
              private msg: NzMessageService) {
               }

  ngOnInit() {
    this.targetGroup = new Group();
    this.targetGroup.id = '0' ;
    this.defaultTemplateFile = config.baseurl + '/api/download/template/人员导入模板.xlsx';
    this.getProfiles();
    this.titleService.setTitle('员工信息管理');
  }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

  changeSubmitStatus(result: boolean, id: number) {
    // this.getData();
    this.selectedProfile.id = id;
  }

  showFreezedProfiles() {
    this.queryFreezed = 'true';
    this.ngOnInit();
  }

  getProfiles(): void {
    this.loading = true ;
    this.profileService.getProfiles(this.offset, this.limit, this.queryFreezed)
      .subscribe(response => {
        if ( response['code'] === 200 ) {
           this.profiles = response['data']['profileList'];
           this.total = response['data']['totalCount'];
        } else {
          this.msg.error(response['message']);
        }

        this.loading = false ;
      });
  }

  getSelectedNode(event: Group): void {
    this.checkedMap = {}; // 重置checkedMap

    this.targetGroup = event;
    if (this.targetGroup) {
      if ( this.targetGroup.parent === 0 ) {
        this.topParentGroup = this.targetGroup.id ;
      } else {
        const level = this.targetGroup.levels.split('.');
        this.topParentGroup = level[1];
      }
    }
    this.limit = this.defaultLimit;
    this.offset = 0 ;
    this.queryFreezed = 'false';
    this.profiles.splice(0,this.profiles.length) ;
    this.getProfilesByGroup();
  }

  getProfilesByGroup(): void {
    this.loading = true ;
    this.profileService.getProfilesByGroup(+this.targetGroup.id, this.offset , this.limit, this.queryFreezed)
      .subscribe(response => {
        this.profiles = response['data']['profileList'];
        this.total = response['data']['totalCount'];
        this.loading = false ;
      });
  }

  updateProfile(profile: Profile): void {
      this.loading = true ;
      this.profileService.updateProfile(profile, this.remark)
        .subscribe(response => {
          this.profiles = response['data']['profileList'];
          this.total = response['data']['totalCount'];
          this.loading = false ;
          this.getData();
        });
  }

  nzPageSizeChange(event: number): void {
    this.limit = event;
    this.offset = 0 ;
    this.profiles.splice(0, this.profiles.length) ;
    if ( this.targetGroup.id ) {
      this.getProfilesByGroup();
    } else {
      this.getProfiles();
    }
  }

  getData(): void {
    this.offset = ( this.pageIndex - 1 ) * this.limit ;
    if ( this.targetGroup.id ){
      this.getProfilesByGroup();
    } else {
      this.getProfiles();
    }
  }

  checkAll(value: boolean): void {
    this.allChecked = value;
    this.profiles.forEach(data => {
      this.checkedMap[data.id] = value;
    });
  }

  checkItem(value: boolean): void {
    let checked = [];
     for (const key in this.checkedMap ) {
      if ( this.checkedMap[key] ) {
        checked.push(+key);
      }
    }

    if ( checked.length > 1 ){
      // 冻结与解冻只能同时处理一个，因为还要添加说明，细粒度更好控制 
      this.freezeButtonDisable = true;
    } else {
      this.freezeButtonDisable = false;
    }
  }

  refreshMap(id: number): void {
    if (this.checkedMap[id]) {
      this.checkedMap[id] = !this.checkedMap[id];
      return ;
    }
    this.checkedMap[id] = true ;
  }

  openEditForm(profile: Profile): void {
    if (profile) {
      this.selectedProfile = profile;
    } else {
      this.selectedProfile = null;
    }

    this.visible = true;
    this.current = 0;
  }

  closeEditForm(): void {
    this.visible = false ;
  }

  showDeleteModal(profile: Profile): void {
    this.deleteModalVisible = true;
    this.targetProfile = profile;
  }

  closeDeleteModal(): void {
    this.deleteModalVisible = false;
    this.targetProfile = new Profile();
  }

  openFreezeModal(freeze: boolean): void {
    this.isFreeze = freeze;
    this.freezeModalVisible = true;
  }

  closeFreezeModal(): void {
    this.freezeModalVisible = false;
  }

  onFreeze(): void {
    this.freezeLoading = true;
    let idList = [];

    for( const key in this.checkedMap ){
      if ( this.checkedMap[key] ) {
        idList.push(+key);
      }
    }

    if ( this.isFreeze ) {
      this.profileService.freezeProfile(idList, this.remark)
        .subscribe(response => {
          this.freezeLoading = false;
          if ( response['code'] !== 200 ) {
            alert('冻结失败');
          } 
          this.getData();
          alert('冻结成功');
      });
    } else {
      this.profileService.unFreezeProfile(idList, this.remark)
        .subscribe(response => {
          this.freezeLoading = false;
          if ( response['code'] !== 200 ) {
            alert('解冻失败');
          }
          this.getData();
          alert('解冻成功');
    });
    }

  }

  onDelete(): void {
    this.isOkLoading = true;
    this.profileService.deleteProfile(this.targetProfile.id, this.remark)
        .subscribe(response => {
          this.isOkLoading = false;
          if ( response['code'] !== 200 ) {
            alert('删除失败');
          }
          this.getData();
          alert('删除成功');
    });
  }

  showDeleteConfirm(id: number,name: string): void {
    this.modalService.confirm({
      nzTitle     : '你确定要删除员工' + name + '吗?',
      nzContent   : '<b style="color: red;"> 员工姓名: ' + name + '</b>',
      nzOkText    : 'Yes',
      nzOkType    : 'danger',
      nzOkLoading  : this.isOkLoading ,
      nzOnOk      : () => new Promise((resolve, reject) => {
        this.isOkLoading = true;
        this.profileService.deleteProfile(id, this.remark)
            .subscribe(response => {
              this.isOkLoading = false;
              if ( response['code'] !== 200 ) {
                reject();
              }
              this.getData();
              resolve();
            });
        }).catch(() => console.log('Oops errors!')),
      nzCancelText: 'No',
      nzOnCancel  : () => console.log('Cancel')
    });
  }

  import() {
    this.importModalVisible = true ;
  }

  closeImportModal() {
    this.importModalVisible = false ;
  }

  openImportModal() {
    this.importModalVisible = true ;
  }

  closeMoveModal() {
    this.moveModalVisible = false ;
  }

  openMoveModal() {
    let idList = [];
    this.targetGroup = new Group();
    // if ( this.targetGroup.id == "0"){
    //   alert("请先于左侧选择分类");
    //   return ;
    // }

    for ( const key in this.checkedMap ) {
      if ( this.checkedMap[key] ) {
        idList.push(+key);
      }
    }

    if (idList.length > 1 ) {
      alert('一次只能调动一个员工');
      return ;
    }

    this.moveModalVisible = true ;
    this.profileService.getProfile(+idList[0])
      .subscribe(
        response => {
          if ( response['code'] === 200 ) {
            this.selectedProfile = response['data']['profile'];
          }
        }
    );

  }

  getSelectedGroup(event: Group[]): void {
    this.moveToNewGroupID = +event[event.length - 1 ].id;
  }

  // 获取用户选择调动的类型，比如岗位，部门，学历 ，职称
  getGroupType(event: Group[]): void {
    const typeID = +event[0].id ;
    if (this.selectedProfile.groups) {
      for ( let i = 0 ; i < this.selectedProfile.groups.length ; i++) {
      if ( this.selectedProfile.groups[i].parent === typeID ) {
        this.targetGroup = this.selectedProfile.groups[i];
      }
    }
    }
    this.moveTopGroup = event[0].id;
  }

  moveProfile() {
    let oldG = 0 ;
    if (this.selectedProfile.groups) {
        for (let i = 0; i < this.selectedProfile.groups.length; i++ ) {
          let g = this.selectedProfile.groups[i];
          if ( this.targetGroup.id === g.id || this.targetGroup.id === String(g.parent) ) {
            oldG = +g.id ;
          }
        }
    }

    this.moveLoading = true;
    this.profileService.moveProfile(+this.selectedProfile.id, oldG, this.moveToNewGroupID , this.description , this.remark)
      .subscribe(
        response => {
          if ( response['code'] === 200 ){
            this.msg.success('upload successfully.');
            if ( this.targetGroup.name === '部门') {
              alert('部门有调动，请确认是否需要调整岗位');
            }
            this.closeMoveModal();
          } else {
            this.msg.error('upload failed.');
          }
          this.moveLoading = false;

        }
      );

  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList.push(file);
    this.importErrorFile = '';
    this.importErrorMsg = '';
    return false;
  }

  handleUpload(): void {
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });

    this.uploading = true;
    this.uploadService.upload(formData)
    .subscribe(
      response => {
        if (response['code'] !== 200 ) {
            this.importErrorFile = config.baseurl + '/api/download/' +  response['data']['file'];
            this.importErrorMsg = response['data']['error'];
        }
        this.uploading = false;
        this.msg.success('upload successfully.');
      },
      err => {
        console.log(err);
        this.uploading = false;
        this.msg.error('upload failed.');
      }
    );
  }

  search(key: string): void {
    this.loading = true ;
    this.offset = 0 ;
    this.pageIndex = 1 ;
    this.checkedMap = {};
    this.profileService.searchProfiles(key, this.searchValue,this.offset,this.limit)
        .subscribe(
          (response: {}) => {
            this.msg.success('搜索成功，正为您更新列表');
            this.profiles = response['data']['profileList'];
            this.total = response['data']['totalCount'];
            this.loading = false;
          },
          err => {
            this.msg.error('搜索失败，' + err);
            this.loading = false;
          }
        );
  }
}
