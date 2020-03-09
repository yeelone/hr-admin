import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../service/statistics.service';
import config from '../../config/config';
import { RelatedSalary , SalaryTemplateAccount} from '../../model/salary';
import { StatisticsQuery, StatisticsTemplate } from '../../model/statistics';
import * as moment from 'moment';
import { TemplateaccountService } from '../../service/templateaccount.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  annualYear = '';

  isSpinning = false;
  fieldSpinning = false;
  isLoading = false;
  isTransferLoading = false;
  showAnnualFile = false;
  showDetailFile = false ;
  showDepartmentIncomeFile = false;
  showTransferRecordFile = false;
  showAnnualBtn = false;
  annualFile = '';
  detailFile = '';
  departmentIncomeFile = '';
  transferRecordFile = '';

  isInOutSpinning = false ;
  showInExBtn = false;
  showInExFile = '';
  inExFile = '';

  selectedGroupID: number ;

  selectedFieldMap: Map<string, RelatedSalary> = new Map();
  selectedTemplates: string[] = [];
  selectedAccount: number ;

  year = '';

  fields = {};

  tabs: string[] = [ '01', '02', '03',  '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  constructor(private statisticsService: StatisticsService,
      private titleService: Title,
      private accountService: TemplateaccountService) { }

  ngOnInit() {
    this.titleService.setTitle('报表管理');
  }

  getAnnual(): void {
    this.showAnnualFile = false;
    this.isSpinning = true ;
    this.statisticsService.getAnnual(moment(this.annualYear).format('YYYY'), null ,null)
      .subscribe((responses) => {
        if ( responses['code'] === 200 ) {
          this.annualFile = config.baseurl + '/api/download/' + responses['data']['file'];
          this.showAnnualFile = true ;
        } else {
          this.showAnnualFile = false;
          alert(responses['message']);
        }
        this.isSpinning = false;
      })
  }

  onAnnualChange(event): void {
    this.showAnnualBtn = true ;
  }

  onInExChange(event): void {
    this.showInExBtn = true ;
  }

  getIncomeExpenditure(): void {

  }

  onSelectedTemplateAccount(tc: SalaryTemplateAccount): void {
    this.fieldSpinning = true ;
    this.selectedAccount = tc.id ;
    const year = moment(this.year).format('YYYY')  ;
    this.accountService.getAllFieldByYear(tc.id, year)
      .subscribe(response => {
        if ( response['code'] === 200 ){
          this.fields = response['data']['fields'];
          console.log(this.fields);
        } else {
        }
        this.fieldSpinning = false;
      }
      );
  }

  onFieldChecked(fields: string[] , template: string ): void {
    let m = new RelatedSalary();
    m.template = template;
    m.fields = fields ;
    if ( fields.length === 0 ) {
        this.selectedFieldMap.delete(template);
    } else {
      this.selectedFieldMap.set(template, m);
    }

    this.selectedTemplates = Array.from(this.selectedFieldMap.keys());
  }

  submitQuery(): void {
    let salary = new StatisticsQuery();
    salary.year =  moment(this.year).format('YYYY')  ;
    if ( salary.year === 'Invalid date' ) {
      alert('未选择年份');
      return ;
    }

    salary.account = this.selectedAccount ;
    if ( !this.selectedAccount ) {
      alert('未选择账套');
      return ;
    }

    salary.templates = [];

    this.selectedFieldMap.forEach((value, key) => {
      let t = new StatisticsTemplate();
      t.template = value.template;
      t.fields = value.fields;
      salary.templates.push(t);
    });

    if ( salary.templates.length < 1 ) {
      alert('未选择模板');
      return ;
    }

    this.isLoading = true;
    this.showDetailFile = false ;
    this.statisticsService.getDetail(salary)
      .subscribe(
        response => {
           if ( response['code'] === 200 ) {
              this.detailFile = config.baseurl + '/api/download/'+ response['data']['file'];
              this.showDetailFile = true ;
            } else {
              this.showDetailFile = false;
              alert(response['message'])
            }
            this.isLoading = false;
        }
      );
  }

  submitDepartmentQuery(): void {
    let salary = new StatisticsQuery();
    salary.year =  moment(this.year).format('YYYY')  ;

    if ( salary.year === 'Invalid date'  ) {
      alert('未选择年份');
      return ;
    }

    salary.account = this.selectedAccount ;
    if ( !this.selectedAccount ) {
      alert('未选择账套');
      return ;
    }

    salary.templates = [];

    this.selectedFieldMap.forEach((value, key) => {
      let t = new StatisticsTemplate();
      t.template = value.template;
      t.fields = value.fields;
      salary.templates.push(t);
    });
    if ( salary.templates.length < 1 ) {
      alert('未选择模板');
      return ;
    }

    this.isLoading = true;
    this.showDepartmentIncomeFile = false ;
    this.departmentIncomeFile = '';
    this.statisticsService.getDepartmentIncome(salary)
      .subscribe(
        response => {
           if ( response['code'] === 200 ) {
              this.departmentIncomeFile = config.baseurl + '/api/download/' + response['data']['file'];
              this.showDepartmentIncomeFile = true ;
            } else {
              this.showDepartmentIncomeFile = false;
              alert(response['message']);
            }
            this.isLoading = false;
        }
      );
  }

  submitTransferQuery(): void {
    this.isTransferLoading = true;
    this.showTransferRecordFile = false ;
    this.transferRecordFile = '';
    this.statisticsService.getTransferRecord()
      .subscribe(
        response => {
           if ( response['code'] === 200 ) {
              this.transferRecordFile = config.baseurl + '/api/download/' + response['data']['file'];
              this.showTransferRecordFile = true ;
            } else {
              this.showTransferRecordFile = false;
              alert(response['message']);
            }
            this.isTransferLoading = false;
        }
      );
  }

}
