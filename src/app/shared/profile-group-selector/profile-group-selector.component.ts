import { Component, OnInit, Input } from '@angular/core';
import { GroupService } from '../../service/group.service';
import { Group } from '../../model/group';
import { ProfileService } from 'src/app/service/profile.service';
import { Profile } from '../../model/profile';

@Component({
  selector: 'app-profile-group-selector',
  templateUrl: './profile-group-selector.component.html',
  styleUrls: ['./profile-group-selector.component.scss']
})
export class ProfileGroupSelectorComponent implements OnInit {
  parentGroups: Group[];
  groups: Group[];
  total: number;
  loading = false;

  parentGroupMap: Map<number, string> = new Map< number, string >(); // 记录父组ID与name的映射

  defaultGroupIds: number[] = [];
  defaultValueMap: Map<number, number[]> = new Map<number, number[]>();

  selectedMap: Map<number, number> = new Map<number, number>();

  parent = 0 ;
  profileId = 0;
  profile: Profile;

  @Input()
  set targetProfile(id: number) {
    this.profileId = id;
    this.getProfile(this.profileId);
  }

  constructor(private groupService: GroupService, private profileService: ProfileService) { }

  ngOnInit() {
    this.defaultGroupIds = [];
    this.getGroups();
  }

  getProfile(id: number): void {
    this.loading = true ;
    this.profileService.getProfileDetail(id)
      .subscribe(
        response => {
          if (response['code'] !== 200 ) {
            alert('获取用户详细信息失败，请联系系统管理员' + response['message'] );
            return ;
          }

          this.profile = response['data']['profile'];

          this.profile.groups.forEach((item) => {
            this.defaultValueMap.set(item.parent, [+item.id]);
          });

          this.loading = false;
        }
      );
  }

  getGroups(): void {
    this.groupService.getGroupByParent(String(this.parent))
      .subscribe(response => {
        if ( response['code'] !== 200 ) {
          alert('获取组织信息错误，错误信息请参考:' + response['message']);
          return ;
        }
        this.parentGroups = response['data']['groupList'];

      });
  }

  getSelectedGroup(g: Group[]): void {
    if ( g.length > 0 ) {
      this.selectedMap.set(g[0].parent, +g[0].id);
    }
  }

  submit(): void {
    console.log(this.selectedMap);

    let gids = [];

    this.selectedMap.forEach(item => {
      gids.push(item);
    });

    this.profileService.addProfileGroupRelationship(this.profileId, gids)
      .subscribe(
        response => {
          console.log(response);
        }
      );
  }

}
