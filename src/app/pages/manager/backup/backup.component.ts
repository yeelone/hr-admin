import { Component, OnInit } from '@angular/core';
import { BackupService } from '../../../service/backup.service';
import config from '../../../config/config';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.scss']
})
export class BackupComponent implements OnInit {

  backupFiles:string[] =[];

  constructor(private backService:BackupService) { }

  ngOnInit() {
    this.list();
  }
  
  backup():void{
    this.backService.backup()
    .subscribe(
      ( response ) => { 
        alert("备份成功.");
        this.list();
       },
      ( error ) => {console.log(error); }
    )
  }

  list():void{
     this.backService.list()
    .subscribe(
      ( response ) => { 
        let files:string[] = response['data']['Files'];  
        
        for( let i=0;i<files.length;i++ ) {
            this.backupFiles.push( config.api  + files[i]);
        }
      },
      ( error ) => {console.log(error); }
    )
  }

  getName(fileapth:string):string{
     let name = fileapth.split("/").pop();
     return name;
  }
}
