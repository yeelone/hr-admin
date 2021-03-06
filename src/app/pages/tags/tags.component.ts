import { Component, OnInit } from '@angular/core';
import { TagsService } from '../../service/tags.service';
import { UploadService } from '../../service/upload.service';
import { Tag } from '../../model/tag';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import config from '../../config/config';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  parentTags: Tag[] = [];
  childrenTags = {0: []};

  selectedTag: Tag;
  total = 0;
  visible = false;
  showTag = false ;
  profileDrawerVisible = false;

  // upload
  uploading = false;
  fileList: UploadFile[] = [];

  // 当前tag
  currentParentTagIndex = -1;
  topTag: Tag = new Tag();
  currentTag: Tag = new Tag();

  // modal 
  isOkLoading = false;
  modalVisible = false ; 
  importModalVisible = false; 
  // update or create 
  isCreateAction = true;

  errFile = '';

  isSpinning = false ;
  defaultTemplateFile = '';
  constructor(private msg: NzMessageService,
            private uploadService: UploadService,
            private titleService: Title,
            private tagService: TagsService) { }

  ngOnInit() {
    this.getTags();
    this.titleService.setTitle('标签信息管理');
    this.defaultTemplateFile = config.baseurl + '/api/download/template/批量标签关联模板.xlsx';
  }

  getTags(): void {
    this.isSpinning = true ; 
     this.tagService.getTags()
      .subscribe(response => {
        if ( response['code'] !== 200 ){
          alert('出错:' + response['message']);
          console.log('getTags failed, 错误信息:' + response['message']);
          return ;
        }
        this.isSpinning = false ; 
        this.parentTags= [];
        this.childrenTags = {0:[]};
        let _tags: Tag[] = [];
        _tags = response['data']['tagList'];
        for (let i = 0; i < _tags.length;i++) {
          if ( _tags[i].parent === 0){
            this.parentTags.push(_tags[i]);
          } else {
            const parent = _tags[i].parent;
            if ( !this.childrenTags[parent]) {
              this.childrenTags[parent] = [];
            }
            this.childrenTags[parent].push(_tags[i]);
            this.childrenTags[parent].sort(this.compare('coefficient'));
          }

        }
        this.total = response['data']['totalCount'];
      });
  }

   compare(property){
    return function(obj1, obj2) {
      const value1 = obj1[property];
      const value2 = obj2[property];
      return value1 - value2;     // 升序
    };
  }


  openEditForm(i: number): void {
    this.isCreateAction = true ;
    this.currentParentTagIndex = i ;
    this.visible = true;
  }

  updateEditForm(tag: Tag): void {
    this.isCreateAction = false;
    this.visible = true;
    this.currentTag = tag;
  }

  closeEditForm(event): void {
    this.visible = false ;
  }

  deleteTag(id: number): void {
     this.tagService.deleteTag(id)
            .subscribe(response => {
              this.isOkLoading = false;
              if ( response['code'] !== 200 ) {
              }
              this.getTags();
            });
  }

  createTag(tag: Tag): void{
    this.tagService.createTag(tag)
      .subscribe(
        (event: {}) => {
           this.getTags();
           this.visible = false;
        } ,
        err => {

        });
  }

  onChange(tag: Tag): void{
    if ( this.isCreateAction ) {
      if ( this.currentParentTagIndex > -1  ) {
        // 创建子标签
        tag.parent = +this.parentTags[this.currentParentTagIndex].id;
      } else {
        // 创建父标签
        tag.parent = 0 ;
      }
      this.createTag(tag);
    } else {
      this.currentTag.name = tag.name ;
      this.currentTag.coefficient = tag.coefficient;
      this.currentTag.commensalismGroupIds = tag.commensalismGroupIds;
      this.tagService.updateTag(+this.currentTag.id, this.currentTag)
            .subscribe(response => {
              this.isOkLoading = false;
              if ( response['code'] !== 200 ) {
              }
              this.getTags();
            });
    }

  }
  handleUpload(): void {
    this.errFile = '';
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });

    this.uploading = true;
    this.uploadService.uploadTags(formData)
    .subscribe(
      (event: {}) => {
        this.uploading = false;
        this.errFile =  config.baseurl + '/api/download/' + event['data']['file'];
        this.msg.success('upload successfully.');
      },
      err => {
        this.uploading = false;
        this.msg.error('upload failed.');
      }
    );
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList.push(file);
    return false;
  }

  closeProfileSelectorForm(): void {
    this.profileDrawerVisible = false;
  }

  openProfileSelectorForm(t: Tag): void {
    this.currentTag = t ;
    this.profileDrawerVisible = true;
  }

  closeImportModal(){
    this.importModalVisible = false ;
  }

  openImportModal(){
    this.importModalVisible = true ;
  }

  trackByIndex(index) {
    return index;
}
}
