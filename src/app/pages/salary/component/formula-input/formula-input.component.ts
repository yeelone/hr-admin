import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Template } from '../../../../model/template';

@Component({
  selector: 'app-formula-input',
  styles  : [
    `
    [nz-radio] {
      display: block;
    }
  `
  ],
  templateUrl: './formula-input.component.html',
  styleUrls: ['./formula-input.component.css']
})
export class FormulaInputComponent implements OnInit {

  formula = '';
  pos: number;

  radioValue: string;

  @Output()
  value: EventEmitter<string> = new EventEmitter();

  @Output()
  onClose:EventEmitter<boolean> = new EventEmitter();

  @Input()
  fields: Template[] = [];

  constructor() { }

  ngOnInit() {
  }

  insertKey(key: string, name: string) {
    this.formula = [this.formula.slice(0, this.pos), ' [' + key + '] ', this.formula.slice(this.pos)].join('');
  }

  savePos($event): void {
    if ($event.selectionStart || $event.selectionStart === '0') {
      this.pos = $event.selectionStart;
   }
  }

  close(): void {
    this.onClose.emit(true);
  }

  submit(): void {
    this.value.emit(this.formula);
  }

  onSelectChange(): void {
    let income: string[] = [];
    let deduct: string[] = [];
    let tax: string[] = [];
    for ( let i = 0 ; i < this.fields.length; i++) {
      if ( this.fields[i].is_income ) {
        income.push('[' + this.fields[i].key + ']');
      }
      if ( this.fields[i].is_deduct ){
        deduct.push('[' + this.fields[i].key + ']');
      }
      if ( this.fields[i].should_tax ) {
        tax.push('[' + this.fields[i].key + ']');
      }
    }

    let incomeFormula = income.join(' + ');
    let deductFormula = deduct.join(' + ');
    let taxFormula = tax.join(' + ');

    switch (this.radioValue) {
      case '所有输入项':
        this.formula = incomeFormula;
        break;
      case '所有扣除项':
        this.formula = deductFormula;
        break;
      case '所有扣税项':
        this.formula = taxFormula;
        break;
      case '应发金额':
        this.formula = incomeFormula;
        if (deduct.length > 0) {
          this.formula = this.formula + '-' + deductFormula;
        }
        break;
      case '实发金额':
        this.formula = taxFormula;
        if ( deduct.length > 0) {
          this.formula = this.formula + '-' + deductFormula;
        }
        break;
    }
  }

}
