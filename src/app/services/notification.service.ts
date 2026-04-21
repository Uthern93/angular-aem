import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private messageSource = new BehaviorSubject<string | null>(null);
  private typeSource = new BehaviorSubject<'success' | 'error' | ''>('');

  message$ = this.messageSource.asObservable();
  type$ = this.typeSource.asObservable();

  show(type: 'success' | 'error', message: string) {
    this.typeSource.next(type);
    this.messageSource.next(message);

    setTimeout(() => {
      this.clear();
    }, 3000);
  }

  clear() {
    this.messageSource.next(null);
    this.typeSource.next('');
  }
}