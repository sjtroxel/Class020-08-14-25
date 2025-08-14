import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [RouterLink],
	templateUrl: './navbar.html',
	styleUrl: './navbar.scss',
})
export class NavbarComponent {
	constructor(public authService: AuthenticationService) {}

	logout() {
		this.authService.logout();
	}
}
