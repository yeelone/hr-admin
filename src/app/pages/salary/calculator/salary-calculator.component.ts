import { Component, OnInit } from '@angular/core';
import { TemplateaccountService } from '../../../service/templateaccount.service';
import { SalaryService } from '../../../service/salary.service';
import { UploadService } from '../../../service/upload.service';
import { SalaryTemplateAccount,QuerySalary } from '../../../model/salary';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import config from '../../../config/config';

import * as moment from 'moment';
@Component({
  selector: 'app-salary-calculator',
  templateUrl: './salary-calculator.component.html',
  styleUrls: ['./salary-calculator.component.css']
})
export class SalaryCalculatorComponent implements OnInit {
  list: SalaryTemplateAccount[];
  selectedMonth:any ;
  selectedTemplateAccount: SalaryTemplateAccount;
  isSpinning = false ;
  isExporting = false ;
  done = false ;
  disabled = true ;
  transferModalVisible = false;
  canStart = false ;  // 是否可以开始计算，在点击开始按钮时，会判断账套中的模板是否存在依赖于操作人员上传的数据 ，如果存在，则弹出对话框请求用户先上传数据 。

  downloadFile: string ;
  templateUploadVisible = false ;
  // 处理上传
  shouldUpload = [];
  uploadModalVisible = false;
  uploading = false;
  uploadFinish = false;
  fileList: UploadFile[] = [];
  uploadedFile = '';
  downloadTemplateFile = '';
  defaultTemplateFile = '';

  previewModalVisible = false;
  previewData = [];

  errFile = '';

  current = 0;

  index = 'First-content';

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  finish(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }


  constructor(private templateAccountService:TemplateaccountService,
    private salaryService:SalaryService,
    private uploadService: UploadService,
    private msg: NzMessageService) { }

  ngOnInit() {
    this.get();
    this.defaultTemplateFile = config.baseurl + '/api/download/template/工资导出模板.xlsx';
  }

  get(){
    this.templateAccountService.list()
    .subscribe(response => {
      this.list = response['data']['List'];
    })
  }

  analysis(){
   //分析账套，如果账套中有模板字段依赖于上传，则提示用户需要先上传数据 。
  
   this.templateAccountService.listAllTemplateFields(+this.selectedTemplateAccount)
   .subscribe(response=>{
     let ts = response['data']['templates'];
     this.shouldUpload = [];
     for (let i = 0 ;i < ts.length ; i++ ){
      let temp = {};
      let fields = ts[i].fields;
      let uploadFields = [];
      for ( let j = 0 ; j < fields.length ;j++ ){
        if ( fields[j].type === 'Upload' && !fields[j].fixed_data) {
          uploadFields.push(fields[j].key);
        }
      }
      if ( uploadFields.length > 0 ){
        temp['name'] = ts[i].name;
        temp['fields'] = uploadFields;
        this.shouldUpload.push(temp);
      }

     }
     if ( this.shouldUpload.length > 0 ) { 
       this.canStart = false; //必须先上传数据 。
       this.uploadModalVisible = true ; 
     }else {
       this.canStart = true ; 
       this.start();
     }
   })

  }

  start(){
    this.done = false ; 
    this.errFile = "";
    var dateObj = new Date();
    // var month = dateObj.getUTCMonth() + 1; //months from 1-12
    // // var day = dateObj.getUTCDate();
    // var year = dateObj.getUTCFullYear();

    let data = {
      template_account_id : +this.selectedTemplateAccount,
      year: moment(this.selectedMonth).format('YYYY'),
      month:moment(this.selectedMonth).format('MM'),
      // year:String(dateObj.getUTCFullYear()),
      // month:String(dateObj.getUTCMonth() + 1),
      file: this.uploadedFile
    };

    this.isSpinning = true ; 
    this.salaryService.calculate(data)
      .subscribe(response => {
        this.isSpinning = false ;
        this.disabled = false ;
        if (response["code"] != 200 ){
          alert("计算期间发生错误，错误信息:" + response["message"]);
          this.errFile = config.baseurl +"/api/download/" + response["data"]["ErrorMessageFile"]; 
          return ;
        }
      });
  }

  //工资核算成功之后 ，可以请求下载工资表
  exportSalary(){
    if ( !this.selectedMonth ) {
      alert("请选择日期")
      return ;
    }
    
    if ( !this.selectedTemplateAccount ) {
      alert("请选择账套")
      return ;
    }

    let data = new QuerySalary();
    data.accountid = +this.selectedTemplateAccount;
    data.year =  moment(this.selectedMonth).format('YYYY');
    data.month = moment(this.selectedMonth).format('MM');
    data.template = this.downloadTemplateFile;
    this.isExporting = true ;
    this.salaryService.export(data)
      .subscribe(response => {
        if ( response["code"] == 200 ) {
           this.done = true ;
          this.isExporting = false; 
          this.downloadFile = config.baseurl + "/api/download/"+response['data']['file'];
          this.downloadTemplateFile = "";
        }else{
          alert("上传失败：" +  response["code"] + response["data"] + response["message"] )
        }
         
      })
  }

  closeUploadModal(){
    this.uploadModalVisible = false;
  }
  
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList.push(file);
    return false;
  }

  handleUpload(): void {
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    this.uploading = true;
    this.uploadService.uploadSalary(formData)
    .subscribe(
      (event: {}) => {
        this.uploadedFile = event['data']['file'];
        this.uploading = false;
        this.uploadFinish = true; 
        this.canStart = true ; 
        this.previewModalVisible = true ;
        this.previewData = event['data']['preview'];
        this.msg.success('上传成功,正在为您处理预览校验数据');
      },
      err => {
        this.uploading = false;
        this.canStart = false ; 
        this.uploadFinish = false;  
        this.msg.error('上传失败，请仔细检查上传文件是否符合格式要求');
      }
    );
  }

  openChangeTableModal():void{
    this.transferModalVisible = true ;
  }

  closeChangeTableModal():void{
    this.transferModalVisible = false ;
  }

  closePreviewModal():void{
    this.previewModalVisible = false;
  }

  openTemplateModal():void{
    this.templateUploadVisible = true;
  }

  closeTemplateUploadModal():void{
    this.templateUploadVisible = false ; 
  }

  onUploadSuccess(event:string):void{
    this.downloadTemplateFile = event; 
  }

  onUploadError():void{

  }

  getKeys(data):string[]{
    let keys = Object.keys(data).filter((key)=>{
      return key != "__name__" && key != "__id_card__"
    })
    return keys;
  }

}
