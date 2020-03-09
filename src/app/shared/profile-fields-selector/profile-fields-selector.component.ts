import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Template } from '../../model/template';

@Component({
  selector: 'app-profile-fields-selector',
  templateUrl: './profile-fields-selector.component.html',
  styleUrls: ['./profile-fields-selector.component.css']
})
export class ProfileFieldsSelectorComponent implements OnInit {
  disabled = true;

  keyMap = {
    id : '职员唯一标识符-ID',
    name : '姓名',
    job_number : '工号',
    type_card : '证件类型',
    id_card : '证件号码',
    on_board_date : '入职日期',
    phone : '电话号码',
    gender : '性别',
    birth_day : '生日',
    status : '在职状态',
    source : '招聘来源',
    school : '毕业院校',
    graduation_date : '毕业日期',
    specialty : '专业',
    nation : '民族',
    marital_status : '婚姻状况',
    account_location : '户籍',
    address : '地址',
  };

  current = new Template();

  @Output()
  selectedField: EventEmitter<Template> = new EventEmitter();

  @Output()
  onClose: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onRadioChange(value: any): void {
    this.disabled = false ;
    this.current.key = value ;
    this.current.name = this.keyMap[value];
    this.current.alias = this.keyMap[value];
  }

  submit(): void {
    this.selectedField.emit(this.current);
    this.disabled = true ;
  }

  close(): void {
    this.onClose.emit(true);
  }
}
