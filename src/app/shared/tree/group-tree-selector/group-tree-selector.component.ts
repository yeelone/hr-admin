import { Component, OnInit,EventEmitter,Input, Output } from '@angular/core';
import { GroupService } from '../../../service/group.service';
import { NzTreeNode } from 'ng-zorro-antd';
import { toTreeSelectorData } from '../../../util/covertTreeSelector';
import { Group } from '../../../model/group';
@Component({
  selector: 'app-group-tree-selector',
  templateUrl: './group-tree-selector.component.html',
  styleUrls: ['./group-tree-selector.component.css']
})
export class GroupTreeSelectorComponent implements OnInit {
  isCheckable:boolean = false;

  allGroups:Group[] = [];
  groupTree = [];
  groups = [];

  @Input()
  set checkable(check:boolean){
    this.isCheckable = check ;
  }

  @Output()
  onSelectedNode:EventEmitter<string>=new EventEmitter();

  @Output()
  onSelectedText:EventEmitter<string>=new EventEmitter();

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.getGroups();
  }

  getGroups():void {

    this.groupService.getGroups()
     .subscribe(response => {
       this.allGroups = response["data"]["groupList"];
       this.groupTree = [new NzTreeNode({
         key: '0',
         title: "揭东农商银行",
         children: toTreeSelectorData( this.allGroups )
       })];
     }) 
  }

  onGroupChange(id: string): void {
    let nodes = []; //记录群组的levels 
    for ( let i=0 ;i< this.allGroups.length;i++){
      if ( id == this.allGroups[i].id ){
        nodes = (this.allGroups[i].levels +id).split(".") ;
      }
    }
    // levels 格式如下： 0.118.289 , 0表示该组是父类，在转化的时候要去掉。
    let text:string[] = new Array(nodes.length-1);//将levels的id翻译成name 
    
    for ( let i=0 ;i< this.allGroups.length;i++){
      for ( let j=1;j< nodes.length ;j++){
        if ( this.allGroups[i].id == nodes[j]){
          text[j-1] = this.allGroups[i].name ;
        }
      }
    }

    this.onSelectedNode.emit(id);
    this.onSelectedText.emit(text.join("."));
  }

}
