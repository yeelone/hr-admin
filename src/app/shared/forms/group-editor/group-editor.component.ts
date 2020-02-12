import { Component, OnInit, Input,SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GroupService } from '../../../service/group.service';
import { Group } from '../../../model/group';

@Component({
  selector: 'app-group-editor',
  templateUrl: './group-editor.component.html',
  styleUrls: ['./group-editor.component.css']
})
export class GroupEditorComponent implements OnInit {

  name = new FormControl('未命名分类');
  code = new FormControl('0');
  parent = new FormControl('');
  coefficient = new FormControl('0');
  selectedGroup: number[];
  isSubmiting = false;

  isCreateAction = false;
  group: Group ;
  // @Input()
  // group:Group
  @Input()
  set defaultGroup(group: Group) {
    if ( !group ) {
      this.isCreateAction = true;
      this.name.setValue('');
      this.code.setValue('');
      this.parent.setValue('');
      this.coefficient.setValue('');
      return ;
    }
    this.group = group;
    this.isCreateAction = false;

    this.name.setValue(group.name);
    this.code.setValue(group.code);
    this.parent.setValue(group.parent);
    this.coefficient.setValue(group.coefficient);

    const levels = group.levels;
    const groups: number[] = [];
    for (const v of levels.split('.')) {
      if ( v ) {
        groups.push(+v); // string to number
      }
    }
    this.selectedGroup = groups;
  }
  constructor(private groupService: GroupService) { }

  ngOnInit() {
  }
  getSelectedValue(groups: Group[]) {
    this.selectedGroup = [];
    for (const g of groups) {
        this.selectedGroup.push(+g.id); // string to number 
    }
  }

  // ngOnChanges(changes: SimpleChanges): void { 
  //   if ( !changes.group.currentValue ) {
  //     this.isCreateAction = true;
  //     this.name.setValue("");
  //     this.code.setValue("");
  //     this.parent.setValue("");
  //     this.coefficient.setValue("");
  //     return ;
  //   }
    
  //   this.isCreateAction = false;

  //   this.name.setValue(changes.group.currentValue.name);
  //   this.code.setValue(changes.group.currentValue.code);
  //   this.parent.setValue(changes.group.currentValue.parent);
  //   this.coefficient.setValue(changes.group.currentValue.coefficient);

  //   let levels = changes.group.currentValue.levels;
  //   let groups:number[] = []
  //   for (let v of levels.split(".")){
  //     if ( v ){
  //       groups.push(+v);//string to number 
  //     }
  //   }
  //   this.selectedGroup = groups;
   
  // }

  submitForm(): void {
    const g = new Group();
    g.name = this.name.value;
    g.code = +this.code.value;
    g.coefficient = +this.coefficient.value;
    if (this.selectedGroup) {
      g.parent = this.selectedGroup[this.selectedGroup.length - 1];
    } else {
      g.parent = 0 ;
    }
    this.isSubmiting = true;

    if ( this.isCreateAction ) {
      this.groupService.createGroup(g)
      .subscribe(response => {
         if (response['code'] !== 200 ){
          alert('创建发生错误，错误信息请参考:' + response['message'] +  ',' +  response['data']);
        }
        this.isSubmiting = false;
      });
    } else {
      g.id = this.group.id;
      this.groupService.updateGroup(g)
      .subscribe(response => {
        if (response['code'] !== 200 ) {
          alert('更新发生错误，错误信息请参考:' + response['message'] +  ',' +  response['data']);
          return ;
        }
        this.isSubmiting = false;
      });
    }
  }
}
