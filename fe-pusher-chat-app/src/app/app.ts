import { Component, OnInit, signal } from '@angular/core';
import { MessageService } from './message';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  messages: any[] = [];
	newMessage = signal('');

	constructor(private messageService: MessageService) {}

	ngOnInit(): void {
		this.messageService.getMessages().subscribe((messages: any) => {
			this.messages = messages;
		});

		this.messageService.subscribeToNewMessages((message: any) => {
			this.messages.push(message);
		});
	}

	sendMessage(): void {
    this.messageService.sendMessage(this.newMessage()).subscribe((message: any) => {
      if (!this.messages.find((m: any) => m.id === message.id)) {
        this.messages.push(message);
      }
      this.newMessage.set('');
    });
  }
}
