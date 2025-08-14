import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './login.html',
	styleUrl: './login.scss',
})
export class LoginComponent {
	username: string = '';
	password: string = '';
	isError: boolean = false;

	constructor(private authService: AuthenticationService, private router: Router) {}

	login() {
		this.authService.login(this.username, this.password).subscribe({
			next: (res: any) => {
				console.log('Logged in with token:', res.token);
				this.authService.setToken(res.token);
				this.isError = false;
				this.router.navigate(['/']);
			},
			error: (error: any) => {
				console.error('Login error', error);
				this.isError = true;
			},
		});
	}
}
