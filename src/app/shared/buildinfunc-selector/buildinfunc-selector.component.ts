import { Component, OnInit,EventEmitter,Output,Input } from '@angular/core';
import { ToolService } from '../../service/tool.service';
import { BuildinFunc, Template } from '../../model/template';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-buildinfunc-selector',
  templateUrl: './buildinfunc-selector.component.html',
  styleUrls: ['./buildinfunc-selector.component.css'],
   styles: [
      `
      [nz-form] {
        max-width: 600px;
      }
    `
  ]

})
export class BuildinfuncSelectorComponent implements OnInit {
  visible:boolean = false;

  validateForm: FormGroup;
  controlArray: Array<{ id: number, controlInstance: string }> = [];

  currentChooseFunc:BuildinFunc;
  needRequired:boolean = false;
  paramCount:number = 1;

  allFunctions: BuildinFunc[] = [];
  checkedMap = {};

  @Input()
  fields: Template[] = [];

  @Output()
  selectedFunc:EventEmitter<BuildinFunc>=new EventEmitter();

  @Output()
  onClose:EventEmitter<boolean>=new EventEmitter();

  constructor(private toolService: ToolService,private fb: FormBuilder) { }

  onChange():void{}

  ngOnInit() {
    this.validateForm = this.fb.group({});
    this.toolService.getListFunc().subscribe(response => {
      this.allFunctions = response['data']['List'];
    });
  }

  chooseFunc(event:any , t:BuildinFunc):void{
    this.controlArray = [];
    this.checkedMap = {};
    this.currentChooseFunc = new BuildinFunc();
    if ( t.NeedParams && event ){
      this.visible = true ; 
    }
    this.currentChooseFunc = t ;

    if ( this.currentChooseFunc.NeedRequired ){
      this.needRequired = true;
    }else{
      this.needRequired = false;
    }

    this.paramCount = this.currentChooseFunc.Params.length;
    for ( let i=0;i< this.currentChooseFunc.Params.length ;i++){
      this.addField();
    }
  }
  
  onCheckTag(key:string,name:string):void{
    let arr = [];
    this.checkedMap[key] = !this.checkedMap[key] ;

    for(let i in this.checkedMap ){
      if ( this.checkedMap[i]) {
        arr.push(i);
      }
    }
    this.currentChooseFunc.Required = arr ;
  }

  closeModal():void{
    this.visible = false; 
  }

  close():void{
    this.onClose.emit(true);
  }

  submit():void{
    this.selectedFunc.emit(this.currentChooseFunc);
  }

  removeField(i: { id: number, controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.controlArray.length > 1) {
      const index = this.controlArray.indexOf(i);
      this.controlArray.splice(index, 1);
      this.validateForm.removeControl(i.controlInstance);
    }
  }

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = (this.controlArray.length > 0) ? this.controlArray[ this.controlArray.length - 1 ].id + 1 : 0;

    const control = {
      id,
      controlInstance: `params${id}`
    };
    const index = this.controlArray.push(control);
    this.validateForm.addControl(this.controlArray[ index - 1 ].controlInstance, new FormControl(null, Validators.required));
  }

  getFormControl(name: string): AbstractControl {
    return this.validateForm.controls[ name ];
  }

  submitForm():void{
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    this.closeModal();
    let values:string[] = []; 
    for ( const key in this.validateForm.value){
      values.push(this.validateForm.value[key]);
    }

    this.currentChooseFunc.Params = values ; 
  }
}
