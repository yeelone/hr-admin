import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { GroupService } from '../../service/group.service';
import { Group } from '../../model/group';
import { toTreeData } from '../../util/covertTree';
@Component({
  selector: 'app-group-selector',
  templateUrl: './group-selector.component.html',
  styleUrls: ['./group-selector.component.css']
})
export class GroupSelectorComponent implements OnInit {
  groups:Group[];
  total:number;

  public nzOptions = null;
  public values: number[] = null;
  private parent: number = 0 ;

  @Input()
  set target(gid:number){
    console.log("gid",gid)
    this.parent = gid; 
    this.getGroups();
  }
  
  @Input()
  set defaultValues(groups: number[]) {
    this.values = groups;
  }

  @Output()
  selectedValue:EventEmitter<Group[]>=new EventEmitter();

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.getGroups();
  }

  getGroups():void {
    console.log("this.parent", this.parent)
    this.groupService.getGroupByParent(String(this.parent))
      .subscribe(response => {
        if ( response["code"] != 200 ){
          alert("获取组织信息错误，错误信息请参考:" + response["message"]);
          return ; 
        }
        this.groups = response["data"]["groupList"];
        this.total = response["data"]["totalCount"];
        // 属性配置信息
        let tree = [];
        function compare(property){
          return function(obj1,obj2){
            var value1 = obj1[property];
            var value2 = obj2[property];
            return value1 - value2;     // 升序
          }
        }
        let gs = this.groups.sort(compare("code"));
        for (let i = 0; i < gs.length; i++) {
            if (gs[i].invalid ) continue;
            let obj = {
              id: gs[i].id,
              value: gs[i],
              label: gs[i].name,
              isLeaf: true,
              children: []
              };
            tree.push(obj);
        }
        this.nzOptions = tree ;
      }) 
  }

  public onChanges(values: Group[]): void {
    if ( values.length != 0 ) {
      this.selectedValue.emit(values);
    }
  }

}