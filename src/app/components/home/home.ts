import { Component, inject } from '@angular/core';
import { Rest } from '../../services/rest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  message: string = 'Welcome to your dashboard!';
  private restService = inject(Rest);
  private router = inject(Router);

  ngOnInit(): void {
    this.guildData();
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  guildData() {
    this.restService.getGuildData().subscribe((data) => {
      console.log(data);
    });
  }
}
