import { Component, OnInit, Input } from '@angular/core';
import { Profile } from '../../model/profile';
import { SalaryService } from '../../service/salary.service';
import { Template } from 'src/app/model/template';
import * as moment from 'moment';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-profile-salary-query',
  templateUrl: './profile-salary-query.component.html',
  styleUrls: ['./profile-salary-query.component.scss']
})
export class ProfileSalaryQueryComponent implements OnInit {
  selectedMonth: any ;
  selectorModalVisible = false ;
  templates: Template[] = [];

  changeValueMap: Map<string, number> ;
  inputBtnDisable = {};
  currentUser: User;
  showPorfileSelector = true;

  profileInfoMap = {};
  department = '';
  post = '';
  groupMap = {};

  loading = false;
  constructor(private salaryService: SalaryService) { }

  @Input()
  profile: Profile;

  ngOnInit() {
  }

  closeModal(): void {
    this.selectorModalVisible = false ;
  }

  showProfileSalary(): void {
    const month =  moment(this.selectedMonth).format('MM');
    const year =  moment(this.selectedMonth).format('YYYY');
    this.salaryService.getProfileSalaryByYearAndMonth(this.profile.id, year, month)
      .subscribe(response => {
        if ( response['code'] !== 200 ) {
          alert(response['message'] + response['data']);
          return ;
        }
        // 处理一下模板
        const list = response['data']['template_list'] ;
        for ( let i = 0 ; i < list.length ; i++) {
           const template = list[i];
           const key = Object.keys(template)[0];
           let valid = 0 ;
           let fields = template[key] ;
           for (let j = 0 ; j < fields.length; j++) {
             const field = fields[j];
             if (field['type'] !== 'Base' && field['type'] !== 'Related' && field['value'] !== 0) {
               valid++ ;
             }
           }
           if ( valid > 0 ){
            this.templates.push(template);
           }
        }
        this.department = response['data']['department'];
        this.post = response['data']['post'];
        this.disableAllInput();
      });
  }

  // 将所有的数值项都disable掉，用户
  disableAllInput() {
    for ( let i = 0; i < this.templates.length; i++ ) {
      const fields = Object.values(this.templates[i])[0] ;
      for ( let j = 0; j < fields.length; j++) {
        const field = fields[j];
        this.inputBtnDisable[field['key']] = true;
      }
    }
  }

  enableInput(key: string): void {
    this.inputBtnDisable[key] = false;
  }

  keys(): Array<string> {
    return Object.keys(this.templates);
  }

  getKey(obj): string {
    return Object.keys(obj)[0];
  }

}
