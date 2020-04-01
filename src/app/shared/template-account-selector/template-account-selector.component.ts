import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { TemplateaccountService } from '../../service/templateaccount.service';
import { SalaryTemplateAccount } from '../../model/salary';

@Component({
  selector: 'app-template-account-selector',
  templateUrl: './template-account-selector.component.html',
  styleUrls: ['./template-account-selector.component.css']
})
export class TemplateAccountSelectorComponent implements OnInit {
  selectedTemplateAccount:number;
  selectedTemplateAccountIndex:number;
  list: SalaryTemplateAccount[] = [];

  @Output()
  onSelected:EventEmitter<SalaryTemplateAccount>=new EventEmitter();

  constructor(private templateAccountService: TemplateaccountService) { }

  ngOnInit() {
    this.get();
  }

  get() {
    this.templateAccountService.list()
    .subscribe(response => {
      this.list = response['data']['List'];
    });
  }

  onChange(): void {
    this.onSelected.emit(this.list[this.selectedTemplateAccountIndex]);
  }
}
