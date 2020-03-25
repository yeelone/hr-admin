import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';
import { User } from 'src/app/model/user';
import { Message, MessageCount } from 'src/app/model/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  currentUser: User ;
  offset = 0;
  limit = 20;
  status = '0'; // 0 表示未读，1 表示已读
  messages: Message[] = [];
  notify: MessageCount;

  check: Map<number, boolean> = new Map<number, boolean>();
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || new User();

    this.getMsgCount();
    this.getData();

  }

  getMsgCount(): void {
    this.messageService.getCount(this.currentUser.id)
      .subscribe(
        response => {
          this.notify = response['data'];
        },
      );
  }

  getData(): void {
    // for debug
    const uid = this.currentUser.id ;
    this.messageService.getMessages(uid, this.offset, this.limit, this.status)
      .subscribe(
        response => {
          this.messages = response['data']['list'];
          console.log(this.messages);
        },
        err => {
        }
      );
  }

  setStatus(id: number, mType: string): void {

    this.check[id] = true;
    this.messageService.setStatus(id)
      .subscribe(
        response => {
          if ( mType === 'Public' ) {
            this.notify.public -= 1;
          }
          if ( mType === 'Global' ) {
            this.notify.global -= 1;
          }
          if ( mType === 'Private' ) {
            this.notify.private -= 1;
          }
        },
        err => {
        }
      );
  }
}
