import { Component, OnInit,SimpleChanges,Input,Output,EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Profile } from '../../../model/profile';
import { ProfileService } from '../../../service/profile.service';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss']
})
export class ProfileEditorComponent implements OnInit {
  @Input()
  profile: Profile;

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onSubmit: EventEmitter<number> = new EventEmitter();

  name = new FormControl('');
  job_number = new FormControl('');
  id_card = new FormControl('');
  bank_card = new FormControl('');
  on_board_date = new FormControl('');
  type_card = new FormControl('身份证');
  phone = new FormControl('');
  gender = new FormControl('男');
  birth_day = new FormControl('');
  status = new FormControl('在职');
  source = new FormControl('校招');
  school = new FormControl('');
  graduation_date = new FormControl('');
  specialty = new FormControl('');
  last_company = new FormControl('');
  first_job_date = new FormControl('');
  workage = new FormControl('');
  nation = new FormControl('汉族');
  marital_status = new FormControl('未婚');
  account_location = new FormControl('');
  address = new FormControl('');
  remark = new FormControl('');

  isSubmiting = false;

  isCreateAction = true;

  card_options = [{
    value: '身份证',
    label: '身份证'
  }];

  constructor(private profileService: ProfileService, private msg: NzMessageService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if ( !changes.profile.currentValue ) {
      this.isCreateAction = true;
      this.name.setValue('');
      this.job_number.setValue('');
      this.id_card.setValue('');
      this.bank_card.setValue('');
      this.on_board_date.setValue('');
      this.type_card.setValue('');
      this.phone.setValue('');
      this.gender.setValue('');
      this.birth_day.setValue('');
      this.status.setValue('');
      this.source.setValue('');
      this.school.setValue('');
      this.birth_day.setValue('');
      this.specialty.setValue('');
      this.last_company.setValue('');
      this.birth_day.setValue('');
      this.workage.setValue('');
      this.nation.setValue('');
      this.marital_status.setValue('');
      this.account_location.setValue('');
      this.address.setValue('');
      return ;
    }

    this.isCreateAction = false;


    this.name.setValue(changes.profile.currentValue.name);
    this.job_number.setValue(changes.profile.currentValue.job_number);
    this.id_card.setValue(changes.profile.currentValue.id_card);
    this.bank_card.setValue(changes.profile.currentValue.bank_card);
    if ( changes.profile.currentValue.on_board_date !== 'Invalid date') {
        this.on_board_date.setValue(changes.profile.currentValue.on_board_date);
    }

    this.type_card.setValue(changes.profile.currentValue.type_card);
    this.phone.setValue(changes.profile.currentValue.phone);
    this.gender.setValue(changes.profile.currentValue.gender);

    if ( changes.profile.currentValue.birth_day !== 'Invalid date') {
        this.birth_day.setValue(changes.profile.currentValue.birth_day);
    }

    this.status.setValue(changes.profile.currentValue.status);
    this.source.setValue(changes.profile.currentValue.source);
    this.school.setValue(changes.profile.currentValue.school);
    if ( changes.profile.currentValue.graduation_date !== 'Invalid date') {
        this.birth_day.setValue(changes.profile.currentValue.graduation_date);
    }

    this.specialty.setValue(changes.profile.currentValue.specialty);
    this.last_company.setValue(changes.profile.currentValue.last_company);
    if ( changes.profile.currentValue.first_job_date !== 'Invalid date') {
        this.birth_day.setValue(changes.profile.currentValue.first_job_date);
    }

    this.workage.setValue(changes.profile.currentValue.workage);
    this.nation.setValue(changes.profile.currentValue.nation);
    this.marital_status.setValue(changes.profile.currentValue.marital_status);
    this.account_location.setValue(changes.profile.currentValue.account_location);
    this.address.setValue(changes.profile.currentValue.address);
  }

  submitForm(): void {
    let p = new Profile();
    p.name = this.name.value;
    p.job_number = this.job_number.value;
    p.id_card = this.id_card.value;
    p.bank_card = this.bank_card.value;
    p.on_board_date = moment(this.on_board_date.value).format('YYYY-MM-DD') ;
    p.address = this.address.value;
    p.type_card = this.type_card.value;
    p.phone = this.phone.value;
    p.gender = this.gender.value;
    p.birth_day = moment(this.birth_day.value).format('YYYY-MM-DD');
    p.status = this.status.value;
    p.source = this.source.value;
    p.school = this.school.value;
    p.graduation_date = moment(this.graduation_date.value).format('YYYY-MM-DD');
    p.specialty = this.specialty.value;
    p.last_company = this.last_company.value;
    p.first_job_date = moment(this.first_job_date.value).format('YYYY-MM-DD');
    p.workage = +this.workage.value;
    p.nation = this.nation.value;
    p.marital_status = this.marital_status.value;
    p.account_location = this.account_location.value;
    p.address = this.address.value;

    this.isSubmiting = true;

    if ( this.isCreateAction ) {
      this.profileService.createProfile(p, this.remark.value)
      .subscribe(response => {
        this.isSubmiting = false;
        this.onSubmit.emit(response['data']['profile']['id']);
        this.msg.success('创建成功，已提交审核，请关注审核结果');
      });
    } else {
      p.id = this.profile.id;
      this.onSubmit.emit(p.id);
      this.profileService.updateProfile(p, this.remark.value)
      .subscribe(response => {
        this.isSubmiting = false;
        this.msg.success('更新成功，已提交审核，请关注审核结果');
      });
    }
  }

}
