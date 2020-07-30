import { Component, OnInit } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-alert-button',
  templateUrl: './alert-button.component.html',
  styleUrls: ['./alert-button.component.scss']
})
export class AlertButtonComponent implements OnInit {

  // content = 'You have been warned!';
  content: Observable<string>;

  hideContent = true;
  severity = 423;

  constructor(private msgService: MessageService) { }

  ngOnInit(): void {
    this.content = this.msgService.getContent();
  }

  toggle(): void {
    this.hideContent = !this.hideContent;
  }

  toggleAsync(): void {
    timer(500)
      .subscribe(() => {
        this.toggle();
      });
  }

}
