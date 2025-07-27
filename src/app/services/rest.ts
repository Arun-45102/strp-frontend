import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Rest {
  private http = inject(HttpClient);

  apiDiscordUrl = `${environment.apiUrl}/strp-api/discord`;
  apiFiveMUrl = `${environment.apiUrl}/strp-api/fivem`;

  getAuthDetails() {
    const url = 'http://localhost:5000/auth/discord';
    return this.http.get(url).pipe(catchError(this.HandleError));
  }

  getGuildData() {
    const url = `${this.apiDiscordUrl}/guild/getGuildData`;
    return this.http.get(url);
  }

  getScheduledEvents(id: any) {
    const url = `${this.apiDiscordUrl}/guild/getScheduledEvents/${id}`;
    return this.http.get(url);
  }

  getUserGuildData(id: any) {
    const url = `${this.apiDiscordUrl}/users/getUserData/${id}`;
    return this.http.get(url);
  }

  getUserGuildRoles(id: any) {
    const url = `${this.apiDiscordUrl}/users/getUserRoles/${id}`;
    return this.http.get(url);
  }

  getOnlineMembers() {
    const url = `${this.apiDiscordUrl}/users/getOnlineMembers`;
    return this.http.get(url);
  }

  getFivemData() {
    const url = `${this.apiFiveMUrl}/getFivemData`;
    return this.http.get(url);
  }

  private HandleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code ${error.status}, message was: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
