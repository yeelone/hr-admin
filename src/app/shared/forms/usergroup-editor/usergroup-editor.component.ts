import { Component, OnInit, Input,Output,SimpleChanges,EventEmitter } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { UserGroupService } from '../../../service/usergroup.service';
import { UserGroup } from '../../../model/usergroup';
@Component({
  selector: 'app-usergroup-editor',
  templateUrl: './usergroup-editor.component.html',
  styleUrls: ['./usergroup-editor.component.css']
})
export class UserGroupEditorComponent implements OnInit {
  updateGroup:UserGroup;
  validateForm: FormGroup;

  isSubmiting = false;

  isCreateAction = true;

  @Input()
  visible:boolean = false; 

  @Output()
  onOk:EventEmitter<boolean>=new EventEmitter();
 
  @Output()
  onCancel:EventEmitter<boolean>=new EventEmitter();

  @Input()
  set group(group:UserGroup){
    if ( group ){
      if ( this.validateForm) {
        this.validateForm.controls['name'].setValue(group.name);
      }
      this.updateGroup = group;

      this.isCreateAction = false ; 
    }else{
      if ( this.validateForm) {
        this.validateForm.controls['name'].setValue("");
      }
      this.isCreateAction = true;
    }

    console.log(" this.isCreateAction22 ",  group, this.isCreateAction  );
  }
  // group:UserGroup
  
  constructor(private groupService: UserGroupService,private fb: FormBuilder) { }

  ngOnInit() {
     this.validateForm = this.fb.group({
      name            : [ null, [ Validators.required  ] ],
    });
  }

  submitForm():void{
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    let g = new UserGroup();
    g.parent = 0 ;
    g.name = this.validateForm.controls.name.value;
    this.isSubmiting = true;
  console.log( " this.isCreateAction",this.isCreateAction )
    if ( this.isCreateAction ){
      this.groupService.createUserGroup(g)
      .subscribe(response => { 
        this.isSubmiting = false; 
        this.onOk.emit(true);
      });
    }else{
      g.id = this.updateGroup.id;
      this.groupService.updateUserGroup(g)
      .subscribe(response => { 
        this.isSubmiting = false; 
        this.onOk.emit(true);
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  closeModal():void{  
    this.onCancel.emit(true);
  }
}
