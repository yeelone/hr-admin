import { Component, OnInit } from '@angular/core';
import { BackupService } from '../../../service/backup.service';
import config from '../../../config/config';
import { Title } from '@angular/platform-browser';
import { CustomFile } from 'src/app/model/fileResponse';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss']
})
export class BackupComponent implements OnInit {

  backupFiles: CustomFile[] = [];

  constructor(private backService: BackupService, private titleService: Title) { }

  ngOnInit() {
    this.list();
    this.titleService.setTitle('备份管理');
  }

  backup(): void {
    this.backService.backup()
    .subscribe(
      ( response ) => {
        alert('备份成功.');
        this.list();
       },
      ( error ) => {console.log(error); }
    );
  }

  list(): void {
     this.backService.list()
    .subscribe(
      ( response ) => {
        this.backupFiles = response['data']['Files'];
        console.log(this.backupFiles);
        for ( let i = 0; i < this.backupFiles.length; i++ ) {
          this.backupFiles[i].path = config.api  + this.backupFiles[i].path;
        }
      },
      ( error ) => {console.log(error); }
    );
  }

  getName(fileapth: string): string {
     const name = fileapth.split('/').pop();
     return name;
  }
}
