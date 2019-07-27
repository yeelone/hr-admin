import { Component, OnInit ,EventEmitter,Output,Input,SimpleChanges, AfterViewInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Tag } from '../../../model/tag';
import { GroupService } from 'src/app/service/group.service';
import { Group } from 'src/app/model/group';
@Component({
  selector: 'app-tag-editor',
  templateUrl: './tag-editor.component.html',
  styleUrls: ['./tag-editor.component.scss']
})
export class TagEditorComponent implements AfterViewInit  {
  loading:boolean = false;
  groupIdMap = {};
  groups: Group[] = [];
  name = new FormControl('');
  coefficient = new FormControl('');
  checkOptions = [];
  @Output()
  onOk:EventEmitter<Tag>=new EventEmitter();
 
  @Output()
  onCancel:EventEmitter<boolean>=new EventEmitter();
 
  isSubmiting = false;

  isCreateAction = false;
  
  _visible:boolean = false;

  @Input()
  visible:boolean = false; 

  @Input()
  default:Tag ;

   constructor(private groupService: GroupService) { }

  ngAfterViewInit() {
    this.loading = true; 
    this.checkOptions = [];

    this.groupService.getTopGroup()
      .subscribe(resp => {
        if ( resp['code'] == 200 ){
          this.groups = resp['data']['groupList'];
          
          for( let i=0;i< this.groups.length;i++){
            this.checkOptions.push({label:this.groups[i].name,value:this.groups[i].id, checked:false})
          }

          this.loading = false;
        }
        this.loading = false;
      });
  }

  ngOnChanges(changes: SimpleChanges): void { 

    if ( !changes.default ) {
      this.isCreateAction = true;
      return ;
    }

    for( let i=0;i< this.checkOptions.length;i++){
        this.checkOptions[i].checked = false;
    }
    
    this.isCreateAction = false;

    this.name.setValue(changes.default.currentValue.name);
    this.coefficient.setValue(changes.default.currentValue.coefficient);

    let idMap = {};
    
    if ( this.default.commensalism_group_ids ){
      for ( let i=0;i< this.default.commensalism_group_ids.length;i++ ){
        idMap[this.default.commensalism_group_ids[i]] = true ;  
      }

      for( let i=0;i< this.checkOptions.length;i++){
        this.checkOptions[i].checked = idMap[this.checkOptions[i].value];
      }
    }

  }
  submitForm():void{
    let tag:Tag = new Tag();
    tag.name = this.name.value;
    tag.coefficient = this.coefficient.value;
    tag.commensalism_group_ids = [];
    for ( let i=0;i< this.checkOptions.length;i++){
      if ( this.checkOptions[i].checked ) {
        tag.commensalism_group_ids.push(this.checkOptions[i].value);
      }
    }
    this.onOk.emit(tag);
    
  }

  closeModal():void{  
    this.onCancel.emit(true);
  }
}
