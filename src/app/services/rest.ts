import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Rest {
  private http = inject(HttpClient);

  apiUrl = `${environment.apiUrl}/strp-api/discord`;

  getAuthDetails(): Observable<any> {
    const url = 'http://localhost:5000/auth/discord';
    return this.http.get(url).pipe(catchError(this.HandleError));
  }

  getGuildData(): Observable<any> {
    const url = `${this.apiUrl}/guild/getGuildData`;
    return this.http.get(url);
  }

  getScheduledEvents(id: any): Observable<any> {
    const url = `${this.apiUrl}/guild/getScheduledEvents/${id}`;
    return this.http.get(url);
  }

  getUserGuildData(id: any): Observable<any> {
    const url = `${this.apiUrl}/users/getUserData/${id}`;
    return this.http.get(url);
  }

  getUserGuildRoles(id: any): Observable<any> {
    const url = `${this.apiUrl}/users/getUserRoles/${id}`;
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
