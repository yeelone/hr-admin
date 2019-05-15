import { Component, OnInit,Output,EventEmitter, } from '@angular/core';
import { toTreeData } from '../../../util/covertTree';
import { UserGroupService } from '../../../service/usergroup.service';
import { UserGroup } from '../../../model/usergroup';
@Component({
  selector: 'app-usergroup-tree',
  templateUrl: './usergroup-tree.component.html',
  styleUrls: ['./usergroup-tree.component.css']
})
export class UsergroupTreeComponent implements OnInit {

 groups:UserGroup[]
  total:number 
  tree = null ; 
  constructor(private groupService: UserGroupService) { }

  ngOnInit() {
    this.getGroups()
  }

  @Output()
  selectedNode:EventEmitter<number>=new EventEmitter();

  getGroups():void {
      this.groupService.getUserGroups(0,1000)
        .subscribe(response => {
          this.groups = response["data"]["groupList"];
          this.total = response["data"]["totalCount"];

          this.tree = toTreeData(this.groups,{
            id: 'id',
            parentId: 'parent',
            name: 'name',
            rootId: 0
          });
        }) 
  }

  renderUsers(id:number):void{
    this.selectedNode.emit(id);
  }

}
