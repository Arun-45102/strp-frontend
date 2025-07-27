import { Component, inject, signal, effect } from '@angular/core';
import { Rest } from '../../services/rest';
import { Auth, DecodedToken } from '../../services/auth';
import { forkJoin, map, timer } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  user = signal<DecodedToken | null>(null);
  guildData = signal<any>(null);
  events = signal<any[]>([]);
  onlineMembers = signal<number>(0);
  membersCount = signal<number>(0);
  serverRoles = signal<number>(0);
  userRoles = signal<number>(0);
  private restService = inject(Rest);
  private authService = inject(Auth);
  serverCurrentCount = signal<number>(0);
  serverMaxCount = signal<number>(0);
  serverRole = signal<string>('Civilian');
  isCommunity = signal<boolean>(false);

  constructor() {
    effect(() => {
      const user = this.authService.user();
      this.user.set(user);
      this.setUserRole(user);
      this.fetchGuildData();
      const sub = timer(0, 60000).subscribe(() => {
        this.fetchOnlineMembers();
        this.fetchFivemData();
      });
      if (user?.discordID) {
        this.fetchUserData(user.discordID);
        this.fetchUserRoles(user.discordID);
      }
      return () => sub.unsubscribe();
    });
  }

  fetchGuildData() {
    this.restService.getGuildData().subscribe((data) => {
      this.guildData.set(data);
      this.membersCount.set(this.guildData()?.guild?.members?.length);
      this.serverRoles.set(this.guildData()?.guild?.roles?.length);
      this.fetchScheduledEvents(data);
    });
  }

  fetchUserData(id: any) {
    this.restService.getUserGuildData(id).subscribe((data) => {
      console.log(data);
    });
  }

  fetchUserRoles(id: any) {
    this.restService.getUserGuildRoles(id).subscribe((data: any) => {
      this.userRoles.set(data['roles'].length);
    });
  }

  fetchOnlineMembers() {
    this.restService.getOnlineMembers().subscribe((data: any) => {
      this.onlineMembers.set(data['onlineMemberCount']);
    });
  }

  fetchFivemData() {
    this.restService.getFivemData().subscribe((data: any) => {
      this.serverCurrentCount.set(data['serverData']['Data']['clients']);
      this.serverMaxCount.set(data['serverData']['Data']['sv_maxclients']);
    });
  }

  setUserRole(user: DecodedToken | null) {
    const userRoles = user?.roles;
    if (userRoles['isDiscAdmin']) {
      this.serverRole.set('Discord Admin');
    } else if (userRoles['isUK']) {
      this.serverRole.set('Udhavum Karangal');
    } else if (userRoles['isMod']) {
      this.serverRole.set('Server Admin');
    } else if (userRoles['isCivilian']) {
      this.serverRole.set('Civilian');
    } else if (userRoles['isCommunity']) {
      this.isCommunity.set(true);
      this.serverRole.set('Discord Member');
    }
  }

  fetchScheduledEvents(data: any) {
    const listEvents = data?.guild?.scheduledEvents;
    const events: any = [];
    if (Array.isArray(listEvents)) {
      listEvents.forEach((event: any) => {
        const requestObservable = this.restService
          .getScheduledEvents(event)
          .pipe(map((sEvents: any) => Object.assign({}, sEvents)));
        events.push(requestObservable);
      });
      forkJoin(events).subscribe({
        next: (results: any) => {
          this.events.set(results.flatMap((r: any) => r.events));
        },
        error: (err: any) => console.error(err),
      });
    }
  }
}
