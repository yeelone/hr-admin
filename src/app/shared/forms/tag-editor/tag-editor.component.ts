import { Component, EventEmitter, Output, Input, SimpleChanges, AfterViewInit} from '@angular/core';
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
  loading = false;
  groupIdMap = {};
  groups: Group[] = [];
  name = new FormControl('');
  coefficient = new FormControl('');
  checkOptions = [];

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onOk: EventEmitter<Tag> = new EventEmitter();

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onCancel: EventEmitter<boolean> = new EventEmitter();

  isSubmiting = false;

  isCreateAction = false;

  _visible = false;

  @Input()
  visible = false;

  @Input()
  default: Tag ;

   constructor(private groupService: GroupService) { }

  ngAfterViewInit() {
    this.loading = true; 
    this.checkOptions = [];

    this.groupService.getTopGroup()
      .subscribe(resp => {
        if ( resp['code'] === 200 ) {
          this.groups = resp['data']['groupList'];

          for ( let i = 0; i < this.groups.length; i++) {
            this.checkOptions.push({label: this.groups[i].name, value: this.groups[i].id, checked: false});
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

    for ( let i = 0; i < this.checkOptions.length; i++) {
        this.checkOptions[i].checked = false;
    }

    this.isCreateAction = false;

    this.name.setValue(changes.default.currentValue.name);
    this.coefficient.setValue(changes.default.currentValue.coefficient);

    let idMap = {};

    if ( this.default.commensalismGroupIds ){
      for ( let i = 0; i < this.default.commensalismGroupIds.length; i++ ) {
        idMap[this.default.commensalismGroupIds[i]] = true ;
      }

      for( let i = 0; i < this.checkOptions.length; i++) {
        this.checkOptions[i].checked = idMap[this.checkOptions[i].value];
      }
    }

  }
  submitForm(): void {
    let tag: Tag = new Tag();
    tag.name = this.name.value;
    tag.coefficient = this.coefficient.value;
    tag.commensalismGroupIds = [];
    for ( let i = 0; i < this.checkOptions.length; i++) {
      if ( this.checkOptions[i].checked ) {
        tag.commensalismGroupIds.push(this.checkOptions[i].value);
      }
    }
    this.onOk.emit(tag);
  }

  closeModal(): void {
    this.onCancel.emit(true);
  }
}
