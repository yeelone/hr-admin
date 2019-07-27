import { Component, OnInit,ViewChild } from '@angular/core';
import { Template,BuildinFunc } from '../../../../model/template';
import { NzMessageService } from 'ng-zorro-antd';
import { Coefficient } from '../../../../model/coe';
import { SalaryTemplate,RelatedSalary } from '../../../../model/salary';
import { TemplateService } from '../../../../service/template.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { genGuid } from '../../../../util/guid';
import config from '../../../../config/config';

@Component({
  selector: 'app-template-editor',
  templateUrl: './template-editor.component.html',
  styleUrls: ['./template-editor.component.css']
})
export class TemplateEditorComponent implements OnInit {
  isCreateAction:boolean = true;
  templateID = 0;
  templateName = "";
  templateType = "normal";
  inputValue:number = 0 ;

  editable  = true ; 

  //drawer 设置
  baseVisible = false;
  buildinVisible = false;
  inputVisible = false;
  coefficientVisible = false;
  calculateVisible = false;
  relatedVisible = false;
  uploadVisible = false; 
  initUploadVisible = false; 

  config:Template[] = [];
  currentIndex: number = 1 ;
  isConfirmLoading = false; 

  func: BuildinFunc;
  availableFields:Template[] = [];
  require:string ;
  fieldModalVisible:boolean = false; 
  changeMessageModalVisible:boolean = false; 
  is_fixed_data = true; 
  init_data_file:string = "";
  init_file_has_change:boolean = false;
  
  changeMessage:string[] = []; //记录改变之后的提示信息

  @ViewChild("FuncParamsTextarea") funcParamsTextarea;

  constructor(private route:ActivatedRoute, private templateService:TemplateService,private msg: NzMessageService,private location: Location, ) { }
  
  ngOnInit() {
    
    this.location.path().includes("/show/")? this.editable = false : this.editable = true ; 

    let id = this.route.snapshot.paramMap.get('id');
    
    if (id){
      this.isCreateAction = false ; 
      if ( this.editable ){
        this.templateService.get(+id)
        .subscribe(response => {
          let t = response['data']['Template'];
          this.config  = response['data']['Fields']; 
          
          function compare(property){
            return function(obj1,obj2){
              var value1 = obj1[property];
              var value2 = obj2[property];
              return value1 - value2;     // 升序
            }
          }
          this.config = response['data']['Fields'].sort(compare("order"));
          this.templateID = t.id;
          this.templateName =  t.name;
          this.templateType = t.type;
          if ( t.file ) {
             this.init_data_file = config.baseurl +"/api/"+ t.file ; 
          }
        })
      }else{
          this.templateService.getAuditing(id)
            .subscribe(response => {
              let t = response['data']['Template'];
              this.config  = response['data']['Fields']; 
              function compare(property){
                return function(obj1, obj2){
                  var value1 = obj1[property];
                  var value2 = obj2[property];
                  return value1 - value2;     // 升序
                }
              }
              this.config = response['data']['Fields'].sort(compare("order"));

              this.templateID = t.id;
              this.templateName =  t.name;
              this.templateType = t.type;
            })
        }
    }else{
      let one = new Template();
      one.key = "name";
      one.name = "姓名";
      one.type = "Base";
      one.alias = "姓名";
      one.from = "profile";
      one.visible = true ; 
      this.config.push(one);
      one = new Template();
      one.key = "id_card";
      one.name = "身份证号码";
      one.type = "Base";
      one.alias = "身份证号码";
      one.from = "profile";
      one.visible = true ; 
      this.config.push(one);
    }
    
  }

  

  addInput() {
    let one = new Template();
    one.visible = true ;
    this.config.push(one);
  }
 
  removeInput(item) {
    let i = this.config.indexOf(item);
    this.config.splice(i, 1);
  }

  invalidInput(item){
    let i = this.config.indexOf(item);
    this.config[i].invalid = true ;
  }
  onSelectChange(i:number , type:string):void{
    this.currentIndex = i ;
    this.changeDrawerVisibleStatus(type);
  }

  changeDrawerVisibleStatus(type:string):void{
    this.baseVisible = false;
    this.buildinVisible = false;
    this.inputVisible = false;
    this.coefficientVisible = false;
    this.calculateVisible = false;
    this.relatedVisible = false;
    switch(type) { 
      case "Base" : this.baseVisible = true ;break; 
      case "Buildin" : this.buildinVisible = true ; this.resolveAvailableFields(); break; 
      case "Input" : this.inputVisible = true ;break; 
      case "Coefficient" : this.coefficientVisible = true ;break; 
      case "Calculate" : this.calculateVisible = true ;this.resolveAvailableFields();break; 
      case "Related" : this.relatedVisible = true ;break; 
      case "Upload" : this.uploadVisible = true ; break ; 
    }
  }
  
  //公式运算依赖模板先前已经定义好的字段，所以在这里取出公式字段之前所有的可用字段
  resolveAvailableFields():void{
    this.availableFields = [];
      for ( let i = 0 ; i <  this.currentIndex ;i++ ){
        this.availableFields.push(this.config[i]);
      }
  }

  onFieldsSelected(t:Template):void{
    this.config[this.currentIndex].alias = t.alias;
    this.config[this.currentIndex].name = t.name;
    this.config[this.currentIndex].key = t.key;
    this.config[this.currentIndex].from = 'profile';
  }
  
  onFuncSelected(func: BuildinFunc):void{
    this.config[this.currentIndex].call = func.Name;
    this.config[this.currentIndex].alias = func.Alias;
    this.config[this.currentIndex].require = func.Required;
    this.config[this.currentIndex].params = func.Params;
    this.config[this.currentIndex].description = "调用函数 = " + func.Name + "("+func.Required+")" ;
  }

  // 为ngfor 加入trackByIdx，可以解决原先输入即失去焦点的问题。
  trackByIdx(index: number, obj: any): any {
    return index;
  }

  onFuncParamsInput(params:string,index:string):void {
     //公式的格式为： ( [工龄]+[学历]*2+[岗位]*3 )/100 + [基本工资] + [全年总收入]
    //通过正则分析出其中的依赖，即[]里面的内容
    const r = /\[(.*?)\]/g;
    let required:string[] = [];
    let keys: string[];
    let keysMap = {};
    while ( ( keys = r.exec(params) ) !== null) {
      required.push(keys[1]);
      keysMap[keys[1]] = true ; 
    }

    //还要查找其它参数的依赖
    for (let i=0 ;i <this.config[this.currentIndex].params.length; i++ ){
      if ( String(i) !== index ){
        while ( ( keys = r.exec( this.config[this.currentIndex].params[String(i)]) ) !== null) {
          if ( !keysMap[keys[1]] ){
              required.push(keys[1]);
              keysMap[keys[1]] = true ; 
          }
        }
      }
    }

    this.config[this.currentIndex].require = required;
    this.config[this.currentIndex].params[index] = params;

  }

  onCoefficientSelected(coe: Coefficient):void{
    this.config[this.currentIndex].key = coe.name;
    this.config[this.currentIndex].name = coe.name;
    this.config[this.currentIndex].alias = coe.name;
    this.config[this.currentIndex].from = coe.type;
    this.config[this.currentIndex].description = "关联标签  " + coe.name +";来源:" + coe.type ;
  }

  onFormulaInput(formula:string):void{
    //公式的格式为： ( [工龄]+[学历]*2+[岗位]*3 )/100 + [基本工资] + [全年总收入]
    //通过正则分析出其中的依赖，即[]里面的内容
    // const r = /\[(.*?)\]/g;
    // let required:string[] = [];
    // let keys: string[];
    // while ( ( keys = r.exec(formula) ) !== null) {
    //   required.push(keys[1]);
    // }
    let required = this.resovleFormulaRequire(formula);
    this.config[this.currentIndex].formula = formula;
    this.config[this.currentIndex].require = required;
    this.config[this.currentIndex].description = "定义规则：" + formula + " \n ;依赖于 " +  required;
  }

  onRelatedFieldSelected(r:RelatedSalary):void{
    this.config[this.currentIndex].related_template = r.template;
    this.config[this.currentIndex].related_key = r.field;
    this.config[this.currentIndex].related_year = r.year;
    this.config[this.currentIndex].related_month = r.month;
    this.config[this.currentIndex].description = "关联模板=" + r.template + "; 关联字段=" + r.field ;
  }

  onUploadField():void{
  }

  handleInputValue():void{
    this.config[this.currentIndex].value = this.inputValue;
    this.config[this.currentIndex].description = "固定值=" + this.inputValue;
  }

  closeEditForm(){
    this.changeDrawerVisibleStatus("");
  }

  //除了类型为Base之外，其它类型key == name 
  checkName(index:number , item: Template) { 
    this.currentIndex = index;
    let oldFieldName = "";
    if ( item.type !== 'Base'){
      oldFieldName = this.config[index].key;
      this.config[index].key = item.name;
    }

    //遍历所有fields，如果发现有依赖于当前字段的，自动更新依赖
    
    for(let i=0;i< this.config.length;i++){
      if ( item.type === 'Calculate' ){
         if ( this.config[i].formula.includes('['+oldFieldName+']')) {
            this.config[i].formula = this.config[i].formula.replace('['+oldFieldName+']', '['+item.name+']');
            this.config[i].require = this.resovleFormulaRequire(this.config[i].formula);
            this.changeMessage.push("因字段名变动，已自动将[" + this.config[i].name + "]的公式以及相关依赖进行更新，请注意检查");
          }
      }
      if ( item.type === 'Buildin' ){
        if ( this.config[i].params ){
          for(let j=0;j < this.config[i].params.length;j++){
            if ( this.config[i].params[j] == oldFieldName ) {
              this.changeMessage.push("因字段名变动，已自动将 [" + this.config[i].name + "] 的函数参数 ["+this.config[i].params[j]+"] 更新为 ["+ item.name +"] ，请注意检查");
              this.config[i].params[j] = item.name;
            }
          }
        }
        if ( this.config[i].require ){
          for(let j=0;j < this.config[i].require.length;j++){
            if ( this.config[i].require[j] == oldFieldName ) {
              this.changeMessage.push("因字段名变动，已自动将[" + this.config[i].name + "]的函数依赖 ["+this.config[i].require[j]+"] 更新为 ["+ item.name +"] ，请注意检查");
              this.config[i].require[j] = item.name;
            }
            
          }
        }
      }
      
    }
  }

  resovleFormulaRequire(formula:string):string[]{
    const r = /\[(.*?)\]/g;
    let required:string[] = [];
    let keys: string[];
    while ( ( keys = r.exec(formula) ) !== null) {
      required.push(keys[1]);
    }
    return required ;
  }

  switchButton(index:number,key:string):void{
    this.currentIndex = index;
    switch(key){
      case 'is_income':this.config[index].is_deduct = false;break;
      case 'is_deduct':this.config[index].is_income = false;break;
    }
  }

  create():void{
    let t = new SalaryTemplate();
    t.id = this.templateID;
    t.name = this.templateName;
    t.type = this.templateType;
    
    if ( this.init_file_has_change  ){
      t.file = this.init_data_file;
    }
    t.body = new Map<string,Template>();

    if ( !this.templateName.length ){
      this.msg.error("请一定要输入模板名");
      return ;
    }
    for ( let i = 0 ; i < this.config.length;i++){
      if ( this.config[i].id ) {
        if ( this.config[i].id.length != 36 ){
          this.config[i].id = genGuid();
        }
      }else{
        this.config[i].id = genGuid();
      }

      t.body[this.config[i].key] = this.config[i];
      t.body[this.config[i].key].order = i+1;
    }

    this.isConfirmLoading = true ; 

    this.templateService.create(t)
        .subscribe(response => {
          if ( response['code'] == 200 ){
            this.msg.success("模板创建已提交审核。");
          }else{
            this.msg.error("模板创建失败，错误信息:" + response['message'] + response['data']);
          }
          this.isConfirmLoading = false; 
          this.changeMessageModalVisible = false;
        })
  }

  moveUp(index:number){
    let item = this.config[index];
    this.config.splice(index,1);
    this.config.splice(index-1,0,item);
  }

  moveDown(index:number){
    let item = this.config[index];
    this.config.splice(index,1);
    this.config.splice(index+1,0,item);
  }
  
  updateField(){
    let errMsg = "";

    // if ( typeof this.require === 'string') {
    //   this.config[this.currentIndex].require = this.require.split(',');
    // }else{
    //   this.config[this.currentIndex].require = this.require;
    // }
    
    if ( this.config[this.currentIndex].type == 'Calculate'  ){
      let required = this.resovleFormulaRequire(this.config[this.currentIndex].formula);
      let allKeys = {};
      for ( let i=0;i<this.config.length;i++){
        allKeys[this.config[i].key] = true ; 
      }
      
      for (let i=0;i<required.length;i++){
        if ( !allKeys[required[i]] ) {
            errMsg += "[" + required[i] + "] 是否正确 ? \n";
        }else{
          this.config[this.currentIndex].require = required;
        }
      }
    }

    if (this.config[this.currentIndex].type == 'Buildin' ){
      let required = this.config[this.currentIndex].require;
      let allKeys = {};
      for ( let i=0;i<this.config.length;i++){
        allKeys[this.config[i].key] = true ; 
      }
      for (let i=0;i<required.length;i++){
        if ( !allKeys[required[i]] ) {
            errMsg += "[" + required[i] + "] 是否正确 ? \n";
        }else{
          this.config[this.currentIndex].require = required;
        }
      }


    }
    if ( errMsg ) {
      alert("发生问题，请仔细检查:" + errMsg);
    }else{
      this.fieldModalVisible = false;
    }
    
  }

  openUpdateField(index:number){
    this.currentIndex = index;
    if (this.config[this.currentIndex].require){
      this.require = this.config[this.currentIndex].require.join(",");
    }

    this.fieldModalVisible = true ; 
  }

  closeUpdateFieldForm(){
    this.fieldModalVisible = false;
    this.require = "";
  }

  uploadedInitFile(file:string):void{
    this.init_data_file = file ; 
  }

  closeInitUploadModal():void{
    this.initUploadVisible = false; 
  }

  closeUploadModal():void{
    this.uploadVisible = false; 
    this.config[this.currentIndex].fixed_data = this.is_fixed_data;
  }

  onUploadSuccess(event:string):void{
    this.init_file_has_change = true; 
    this.init_data_file = event; 
  }

  onUploadError():void{

  }
  
  openInitDataModal():void{
    this.initUploadVisible = true; 
  }

  removeInitUploadFile():void{
    this.init_data_file = ""; 
    this.msg.info("已为您清除上传文件，请提交模板更新！")
  }
}
