import { Component, OnInit ,EventEmitter,Output,Input,SimpleChanges} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Tag } from '../../../model/tag';

@Component({
  selector: 'app-tag-editor',
  templateUrl: './tag-editor.component.html',
  styleUrls: ['./tag-editor.component.scss']
})
export class TagEditorComponent implements OnInit {
  name = new FormControl('');
  coefficient = new FormControl('');

  @Output()
  onOk:EventEmitter<Tag>=new EventEmitter();
 
  @Output()
  onCancel:EventEmitter<boolean>=new EventEmitter();
 
  isSubmiting = false;

  isCreateAction = false;
  
  _visible:boolean = false;

  @Input()
  visible:boolean = false; 

  @Input()
  default:Tag ;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void { 
    if ( !changes.default ) {
      this.isCreateAction = true;
      return ;
    }
    
    this.isCreateAction = false;

    this.name.setValue(changes.default.currentValue.name);
    this.coefficient.setValue(changes.default.currentValue.coefficient);

  }
  submitForm():void{
    let tag:Tag = new Tag();
    tag.name = this.name.value;
    tag.coefficient = this.coefficient.value;

    this.onOk.emit(tag);
    
  }

  closeModal():void{  
    this.onCancel.emit(true);
  }
}
