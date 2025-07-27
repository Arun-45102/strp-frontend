import { inject, Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  id: string;
  discordID: string;
  username: string;
  email: string;
  global_name: string;
  discriminator: string;
  avatar: string;
  banner: string;
  tag: string;
  roles: any;
  exp: number; // Expiration timestamp
  iat: number; // Issued at timestamp
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private authTokenKey = 'authToken';
  private _user = signal<DecodedToken | null>(null);
  user = this._user;

  constructor() {
    const initialToken = localStorage.getItem(this.authTokenKey);
    const initialUser = initialToken ? this.decodeToken(initialToken) : null;
    this._user.set(initialUser);
    if (initialUser && this.isTokenExpired(initialUser.exp)) {
      this.logout();
    }
  }

  setAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
    const decodedUser = this.decodeToken(token);
    this._user.set(decodedUser);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    return !!token && !this.isTokenExpired(this._user()?.exp);
  }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    this._user.set(null);
  }

  private decodeToken(token: string): DecodedToken | null {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  private isTokenExpired(expirationTimestamp?: number): boolean {
    if (!expirationTimestamp) return true;
    const currentTime = Date.now() / 1000; // Convert to seconds
    return expirationTimestamp < currentTime;
  }
}
