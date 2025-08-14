import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class MessageService {
	private pusher: any;
	private channel: any;

  // For this demo, we are hardcoding the Pusher key and cluster directly in the Angular service to keep things simple and easy to follow.
  // In real-world applications, you should always store API keys and secrets in your environment files (such as environment.ts or environment variables) to keep them secure and make configuration changes easier.
	constructor(private http: HttpClient) {
		this.pusher = new Pusher('e92390fb1e5f7527daae', {
			cluster: 'us2',
		});
		this.channel = this.pusher.subscribe('chat');
	}

	getMessages(): Observable<any> {
		return this.http.get('http://localhost:3000/messages');
	}

	sendMessage(message: string): Observable<any> {
		return this.http.post('http://localhost:3000/messages', { content: message });
	}

	subscribeToNewMessages(callback: (message: any) => void): void {
		this.channel.bind('new_message', callback);
	}

	unsubscribeFromNewMessages(): void {
		this.channel.unbind('new_message');
	}
}
