import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { TagsService } from '../../service/tags.service';
import {  Tag } from '../../model/tag';

@Component({
  selector: 'app-tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.css']
})
export class TagSelectorComponent implements OnInit {
  tags:Tag[] = [];
  children:Tag[] = [];
  selectedTag:Tag ;
  defaultChecked = {};
  radioValue = "";

  @Input()
  set default(tags:Tag[]){
    this.defaultChecked = {};
    for(let i=0;i<tags.length;i++){
      this.defaultChecked[tags[i].id] = true ;
    }
  }

  @Output()
  onCheckedTags:EventEmitter<any>=new EventEmitter();
  
  @Output()
  onSelectedTag:EventEmitter<Tag>=new EventEmitter();

  @Output()
  onSelectedText:EventEmitter<string[]>=new EventEmitter();

  constructor(private tagsService:TagsService) { }

  ngOnInit() {
    this.getAllTags();
  }

  getAllTags():void{
    this.tagsService.getTopTags()
      .subscribe(
        response => {
           if (response["code"] !== 200 ){
            alert("获取系数表失败，请联系系统管理员" + response["message"] );
            console.log("获取系数表失败，请联系系统管理员" + response["message"] );
            return ; 
          }
          this.tags = response["data"]["tagList"];
        }
      )
  }
  
  selectedChange(tag:Tag):void{
    this.selectedTag = tag;
    this.tagsService.getChildTags(+tag.id)
      .subscribe(
        response => {
          if (response["code"] !== 200 ){
            alert("获取系数表失败，请联系系统管理员" + response["message"] );
            console.log("获取系数表失败，请联系系统管理员" + response["message"] );
            return ; 
        }
        
        this.children = response["data"]["tagList"];
        this.onSelectedTag.emit(tag);
        }
      )
  }

  onChecked(checked:string[]):void{
    if ( checked.length > 1 ) {
      alert("只能选择一个标签,请重新选择,否则操作无效");
      return;
    }

    let checkedTags:Tag[] =  [];
    for(let i=0;i<checked.length;i++){
      for ( let j=0; j< this.children.length ;j++){
        if (this.children[j].id == checked[i]){
            checkedTags.push(this.children[j]);
        }
      }
    }
    //将之转化为字符串形式，比如说 父标签名.子标签名
    let text:string[] = [];
    for ( let i=0;i< this.tags.length;i++){
      for ( let j=0;j< checkedTags.length;j++){
          if (checkedTags[j].parent == +this.tags[i].id){
              text.push(this.tags[i].name + "."+ checkedTags[j].name);
          }
      }
    }

    this.onCheckedTags.emit(this.defaultChecked);
    this.onSelectedText.emit(text);
  }
  

}
