import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { UserGroupService } from '../../service/usergroup.service';
import { UserGroup } from '../../model/usergroup';
import { toTreeData } from '../../util/covertTree';
@Component({
  selector: 'app-usergroup-selector',
  templateUrl: './usergroup-selector.component.html',
  styleUrls: ['./usergroup-selector.component.css']
})
export class UserGroupSelectorComponent implements OnInit {
  groups:UserGroup[];
  total:number;
  public nzOptions = null;
  public values: number[] = null;

  @Input()
  set defaultValues(groups: number[]) {
    this.values = groups;
  }

  @Output()
  selectedValue:EventEmitter<number>=new EventEmitter();
 
  constructor(private groupService: UserGroupService) { }

  ngOnInit() {
    this.getGroups();
  }

  getGroups():void {
     this.groupService.getUserGroups(0,1000)
      .subscribe(response => {
        this.groups = response["data"]["groupList"];
        this.total = response["data"]["totalCount"];
        // 属性配置信息
        let attributes = {
          id: 'id',
          parentId: 'parent',
          name: 'name',
          rootId: 0
        };
        this.nzOptions = toTreeData(this.groups, attributes);
      }) 
  }

  public onChanges(values: any): void {
    this.selectedValue.emit(values);
  }

}