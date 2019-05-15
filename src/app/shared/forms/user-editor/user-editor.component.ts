import { Component, OnInit,Input,Output,EventEmitter,SimpleChanges} from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';
import { UserGroup } from '../../../model/usergroup';
@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent implements OnInit {
  @Input()
  user:User

  @Output()
  onSubmit:EventEmitter<boolean>=new EventEmitter();

  username = new FormControl('');
  id_card = new FormControl('');
  password = new FormControl('000000');

  groups:UserGroup;
  selectedGroup:number[] = [];
  
  isSubmiting = false;
  isCreateAction = true;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void { 
    if ( !changes.user.currentValue ) {
      this.isCreateAction = true;
      this.username.setValue("");
      this.id_card.setValue("");
      this.password.setValue("000000");
      this.selectedGroup =[];
      return ; 
    }

    this.isCreateAction = false;
    this.username.setValue(changes.user.currentValue.username);
    this.id_card.setValue(changes.user.currentValue.id_card);
    this.password.setValue(changes.user.currentValue.jobpassword_number);
    
    if ( changes.user.currentValue.groups  ){
      let g  = changes.user.currentValue.groups[0];
      let levels = g.levels;
      let groups:number[] = []
      for (let v of levels.split(".")){
        if ( v && +v ){
          groups.push(+v);//string to number 
        }
      }
      groups.push(g.id);
      this.selectedGroup = groups;
    }else{
      this.selectedGroup =[]; 
    }

  }

  submitForm():void{
    let u = new User();
    u.username = this.username.value;
    u.id_card = this.id_card.value;
    u.group = this.selectedGroup[this.selectedGroup.length - 1 ]; 

    this.isSubmiting = true;

    if ( this.isCreateAction ){
      u.password = this.password.value;
      this.userService.createUser(u)
      .subscribe(response => { 
        this.isSubmiting = false; 
      });
    }else{
      u.id = this.user.id;
      this.userService.updateUser(u)
      .subscribe(response => { 
        console.log(response);
        this.isSubmiting = false; 
      });
    }

    this.onSubmit.emit(true);
  }

  onSelectGroup(groups:number[]):void{
    //按照层次，选最后一个
    this.selectedGroup = groups;
  }

}
