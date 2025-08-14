import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class SignupComponent {
	signupForm = new FormGroup({
		username: new FormControl('', Validators.required),
		password: new FormControl('', Validators.required),
		password_confirmation: new FormControl('', Validators.required),
	});

  errors: string[] = [];

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  signup() {
    this.errors = [];

 const { password, password_confirmation } = this.signupForm.value;
    if (password !== password_confirmation) {
      this.errors.push('Passwords do not match.');
      return;
    }
    this.authService.signup(this.signupForm.value).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Signup error:', err);

        // ✅ Rails may return different formats
        if (Array.isArray(err.error)) {
          // e.g. ["Username has already been taken", "Password is too short"]
          this.errors = err.error;
        } else if (typeof err.error === 'object') {
          // e.g. { username: ["has already been taken"], password: ["is too short"] }
          this.errors = (Object.values(err.error).flat() as string[]);
        } else if (err.error?.message) {
          this.errors = [err.error.message];
        } else {
          this.errors = ['Signup failed. Please try again.'];
        }
      },
    });
  }
}