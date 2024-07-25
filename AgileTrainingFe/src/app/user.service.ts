import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userId: string = '';

  constructor() {}

  setUserId(id: string) {
    this.userId = id;
  }

  getUserId(): string {
    return this.userId;
  }

  clearUserId() {
    this.userId = '';
  }
}
