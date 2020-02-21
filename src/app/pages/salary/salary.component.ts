import { Component, OnInit,TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { SalaryService } from '../../service/salary.service';
import { BaseSalary,TaxConf } from '../../model/salary';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent implements OnInit {
  tplModal: NzModalRef;
  taxModal: NzModalRef;
  tplModalButtonLoading = false;
  taxModalButtonLoading = false;

  inputValue = 0.00;
  taxInputValue = 0.00;

  taxConf: TaxConf = new TaxConf();
  preDeductionRate: TaxConf = new TaxConf();

  constructor(private modalService: NzModalService, private titleService: Title, private salaryService: SalaryService) { }

  ngOnInit() {
    this.salaryService.getBase()
      .subscribe(response => {
        this.inputValue = response['data']['Base'];
      });

    this.getTaxConf();
    this.titleService.setTitle('工资计算配置');
  }

  handleInputValue(value: number): void {
    this.inputValue = value;
  }

  handleTaxInputValue(value: number): void {
    this.taxInputValue = value;
  }

  createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.tplModal = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: true,
    });
  }


  destroyTplModal(): void {
    this.tplModalButtonLoading = true;
    const base = new BaseSalary();
    base.base = +this.inputValue;
    base.tax_threshold = +this.taxInputValue;

    this.salaryService.saveBase(base).
      subscribe(response => {
        this.tplModalButtonLoading = false;
        this.tplModal.destroy();
      });
  }

  getTaxConf() {
    this.salaryService.getTaxConf()
    .subscribe(
      (event: {}) => {
          this.taxConf = event['data']['conf'];
      },
      err => { console.log(err);}
    );

    this.salaryService.getPreDeductionRateConf()
    .subscribe(
      (event: {}) => {
          this.preDeductionRate = event['data']['conf'];
      },
      err => { console.log(err); }
    )

  }

  createTaxModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.taxModal = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: true,
    });
  }

  destroyTaxModal(): void {
      this.taxModalButtonLoading = true;
      this.tplModalButtonLoading = true;

      this.salaryService.setTaxConf(this.taxConf).
        subscribe(response => {
          this.taxModalButtonLoading = false;
          this.taxModal.destroy();
      });
  }

  destroyPreDeductionRateModal(): void {
      this.taxModalButtonLoading = true;
      this.tplModalButtonLoading = true;

      this.salaryService.setPreDeductionRateConf(this.preDeductionRate).
        subscribe(response => {
          this.taxModalButtonLoading = false;
          this.taxModal.destroy();
      });
  }

}
