import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GroupService } from '../../service/group.service';
import { Group } from '../../model/group';
@Component({
  selector: 'app-group-selector',
  templateUrl: './group-selector.component.html',
  styleUrls: ['./group-selector.component.css']
})
export class GroupSelectorComponent implements OnInit {
  groups: Group[];
  total: number;

  groupMap: Map<string, string> = new Map< string, string >();

  defaultGroupIds: number[] = [];
  public nzOptions = null;
  public values: string[] = null;
  private parent = 0 ;

  @Input()
  set target(gid: number) {
    this.parent = gid;
    this.getGroups();
  }
  @Input()
  set defaultValues(groups: number[]) {
    this.defaultGroupIds = groups;
    this.getGroups();
  }

  @Output()
  selectedValue: EventEmitter<Group[]> = new EventEmitter();

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.defaultGroupIds = [];
    this.values = [];
  }

  getGroups(): void {
    this.groupService.getGroupByParent(String(this.parent))
      .subscribe(response => {
        if ( response['code'] !== 200 ) {
          alert('获取组织信息错误，错误信息请参考:' + response['message']);
          return ;
        }
        this.groups = response['data']['groupList'];
        this.total = response['data']['totalCount'];
        // 属性配置信息
        let tree = [];
        function compare(property) {
          return function( obj1, obj2) {
            const value1 = obj1[property];
            const value2 = obj2[property];
            return value1 - value2;     // 升序
          };
        }
        const gs = this.groups.sort(compare('code'));
        for (let i = 0; i < gs.length; i++) {
          this.groupMap.set(gs[i].id.toString(), gs[i].name);
          if (gs[i].invalid ) { continue; }
          const obj = {
            id: gs[i].id,
            value: gs[i],
            label: gs[i].name,
            isLeaf: true,
            children: []
          };
          tree.push(obj);
        }
        for ( let i = 0; i < this.defaultGroupIds.length; i++) {
          const id = this.defaultGroupIds[i];
          if ( id !== 0 ) {
            this.values.push(this.groupMap.get(id.toString()));
          }
        }
        this.nzOptions = tree ;
      });
  }

  public onChanges(values: Group[]): void {
    if ( values.length !== 0 ) {
      this.selectedValue.emit(values);
    }
  }

}