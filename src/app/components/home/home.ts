import { Component, inject } from '@angular/core';
import { Rest } from '../../services/rest';
import { Auth, DecodedToken } from '../../services/auth';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  message: string = 'Welcome to your dashboard!';
  user: DecodedToken | null = null;
  guildData: any;
  events: any = [];

  private restService = inject(Rest);
  private authService = inject(Auth);

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
    this.fetchUserData(this.user?.discordID);
    this.fetchUserRoles(this.user?.discordID);
    this.fetchGuildData();
  }

  fetchGuildData() {
    this.restService.getGuildData().subscribe((data) => {
      this.guildData = data;
      this.fetchScheduledEvents(this.guildData);
    });
  }

  fetchUserData(id: any) {
    this.restService.getUserGuildData(id).subscribe((data) => {
      console.log(data);
    });
  }

  fetchUserRoles(id: any) {
    this.restService.getUserGuildRoles(id).subscribe((data) => {
      console.log(data);
    });
  }

  fetchScheduledEvents(data: any) {
    const listEvents = data?.guild?.scheduledEvents;
    listEvents.forEach((event: any) => {
      this.restService.getScheduledEvents(event).subscribe((data) => {
        this.events.push(data?.events);
      });
    });
  }
}
