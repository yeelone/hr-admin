import { Component, OnInit,Output,EventEmitter, Input, } from '@angular/core';
import { toTreeData } from '../../../util/covertTree';
import { GroupService } from '../../../service/group.service';
import { Group } from '../../../model/group';
@Component({
  selector: 'app-grouptree',
  templateUrl: './grouptree.component.html',
  styleUrls: ['./grouptree.component.css']
})
export class GrouptreeComponent implements OnInit {
  groups:Group[] = [];
  total:number = 0 ;
  tree = null ; 
  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.getGroups()
  }
  
  @Input()
  height:string = "450px";
  
  @Output()
  selectedNode:EventEmitter<Group>=new EventEmitter();

  getGroups():void {
      this.groupService.getGroups()
        .subscribe(response => {
          this.groups = response["data"]["groupList"].slice(0);
          this.total = response["data"]["totalCount"];
          this.tree = toTreeData(response["data"]["groupList"],{
            id: 'id',
            parentId: 'parent',
            name: 'name',
            rootId: 0
          });
        }) 
       
  }

  renderUsers(id:string):void{
    let g:Group ;
    for(let i=0;i<this.groups.length;i++){
      if ( this.groups[i].id == id ){
        g = this.groups[i];
      }
    }
    this.selectedNode.emit(g);
  }
 
}
