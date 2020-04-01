import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css']
})
export class PasswordInputComponent implements OnInit {

  password = '';

  @Output()
  change: EventEmitter<string> = new EventEmitter();

  @Input()
  visible = false;

  constructor() { }

  ngOnInit() {
  }

  onChange() {
    this.change.emit(this.password);
  }

  openModal(): void {
    this.visible = true;
  }

  closeModal(): void {
    this.visible = false;
  }
}
