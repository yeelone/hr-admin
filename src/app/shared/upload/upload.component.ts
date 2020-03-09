import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UploadService } from '../../service/upload.service';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  // 处理上传事项
  isSpinning = false ;
  // 处理上传
  shouldUpload = [];
  uploadModalVisible = false;
  uploading = false;
  uploadFinish = false;
  fileList: UploadFile[] = [];
  uploadedFile = '';

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onSuccess: EventEmitter<string> = new EventEmitter();

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onError: EventEmitter<boolean> = new EventEmitter();

  constructor(private uploadService: UploadService,
    private msg: NzMessageService) { }

  ngOnInit() {
  }

  closeUploadModal() {
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
        this.msg.success('上传成功');
        this.onSuccess.emit(this.uploadedFile);
      },
      err => {
        this.uploading = false;
        this.uploadFinish = false;
        this.msg.error('上传失败，请仔细检查上传文件是否符合格式要求');
        this.onError.emit(true);
      }
    );
  }

}
