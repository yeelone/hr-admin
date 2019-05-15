import { Component, OnInit,Output ,EventEmitter} from '@angular/core';
import { Tag } from '../../../model/tag';
import { Group } from '../../../model/group';

// 这个组名具体不知道怎么命名，比较复杂。为实现的功能点是这样的：
// 组与标签会关联一个系数 ，但有一个特殊情况，比如说A员工属于总行营业部，岗位任高级会计主管。但却是派驻白塔支行。
// 根据单位的车补规则，总行营业部应该是200， 白塔支行应该是300。此时A员工虽然身份属于总行营业部高级会计主管，但实际领的是白塔支行的车补400。
// 所以这个时候不能再根据岗位来关联车补的标签。而是需要根据多个群组来判断关联哪个标签。
// 这个规则表会保存在服务器上的配置文件中。
@Component({
  selector: 'app-group-tag-rule-editor',
  templateUrl: './group-tag-rule-editor.component.html',
  styleUrls: ['./group-tag-rule-editor.component.css']
})
export class GroupTagRuleEditorComponent implements OnInit {
  checkedResult:any = {};
  defaultChecked:Tag[] = [];
  selectedGroup:Group;
  selectedTags:Tag[] = [];
  selectedTopTag:Tag;

  @Output()
  onRuleSubmit:EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  getSelectedGroup(event):void{
    console.log(event)
  }

  onTagSelected(checked:any):void{
    this.checkedResult = checked;
  }

  onTagSelectedTop(tag:Tag):void{
    this.selectedTopTag = tag ;
  }

  onGroupSelected(event):void{
    this.selectedGroup = event ; 
  }

  onSubmit():void{
    //tag只有选一个
    let tagString = "";
    const keys =  Object.keys(this.checkedResult);
    for ( let i=0 ;i< keys.length;i++){ //string 要转成 number 
      if ( this.checkedResult[keys[i]] ){
          tagString = keys[i] ;
          break;
      }
    }
    this.onRuleSubmit.emit(String(this.selectedGroup) +","+ tagString );
  }
}
