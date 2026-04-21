import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private notify: NotificationService
  ) {}

  message: string = '';
  messageType: 'success' | 'error' | '' = '';

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (token) => {
          console.log(token);

          localStorage.setItem('token', token);

          this.notify.show('success', 'Login successful!');

          this.router.navigate(['/dashboard']);
        },

        error: (err) => {
          console.error(err);
          let msg = 'Login failed. Please try again.';

          if (err.status === 401) {
            msg = 'Invalid username or password.';
          } else if (err.status === 0) {
            msg = 'Server unreachable. Please check your connection.';
          }

          this.notify.show('error', msg);
        },
      });
    } else {
      this.notify.show(
        'error',
        'Please fill in all required fields correctly.',
      );
    }
  }
}
