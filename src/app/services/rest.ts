import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Rest {
  private http = inject(HttpClient);

  apiUrl = `${environment.apiUrl}/strp-api/discord`;

  getGuildData(): Observable<any> {
    const url = `${this.apiUrl}/guild/getGuildData`;
    return this.http.get(url);
  }

  // getGuildMembers(): Observable<any> {
  //   const url = `${this.apiUrl}/getGuildMembers`;
  //   return this.http.get(url);
  // }

  // getRolesData(): Observable<any> {
  //   const url = `${this.apiUrl}/getRolesData`;
  //   return this.http.get(url);
  // }

  // getRoleData(id: any): Observable<any> {
  //   const url = `${this.apiUrl}/getRoleData/:${id}`;
  //   return this.http.get(url);
  // }

  // getUserData(id: any): Observable<any> {
  //   const url = `${this.apiUrl}/getUserData/:${id}`;
  //   return this.http.get(url);
  // }
}
