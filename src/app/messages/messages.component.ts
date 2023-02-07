import { Component } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  // המאפיין חייב להיות ציבורי מכיוון שאני הולך להיקשר אליו בטמפלט
constructor(public messageService: MessageService) { }


}
