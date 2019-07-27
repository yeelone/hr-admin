import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { GroupService } from '../../../../service/group.service';
import { TagsService } from '../../../../service/tags.service';
import { Coefficient } from '../../../../model/coe';

@Component({
  selector: 'app-coefficient-selector',
  templateUrl: './coefficient-selector.component.html',
  styleUrls: ['./coefficient-selector.component.css']
})
export class CoefficientSelectorComponent implements OnInit {

  currentChooseCoe:Coefficient;
  allCoes: Coefficient[] = [];

  @Output()
  selectedCoe:EventEmitter<Coefficient>=new EventEmitter();

  @Output()
  onClose:EventEmitter<boolean>=new EventEmitter();

  constructor(private groupService: GroupService,private tagsService:TagsService) { 
  }

  ngOnInit() {
    
    this.groupService.getTopGroup().subscribe(response => {
      let coes:Coefficient[] = this.allCoes.slice();
      let groups = response['data']['groupList'];
      for(let i = 0 ;i< groups.length;i++){
        let c = new Coefficient();
        c.name = groups[i].name;
        c.type = 'group';
        coes.push(c);
        this.allCoes = coes;
      }
    });

    this.tagsService.getTopTags().subscribe(response => {
      let coes:Coefficient[] = this.allCoes.slice();
      let tags = response['data']['tagList'];
      for(let i = 0 ;i< tags.length;i++){
        let c = new Coefficient();
        c.name = tags[i].name;
        c.type = 'tag';
        coes.push(c);
        this.allCoes = coes;
      }
    });
  }

  chooseCoe(c:Coefficient):void{
    this.currentChooseCoe = c ;
  }
  
  close():void{
    this.onClose.emit(true);
  }

  submit():void{
    this.selectedCoe.emit(this.currentChooseCoe);
  }
}
