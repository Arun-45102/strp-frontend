import { Component, inject, effect } from '@angular/core';
import { Loadingservice } from '../../services/loadingservice';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.html',
  styleUrl: './loading.css',
})
export class Loading {
  public loading = inject(Loadingservice);

  constructor() {
    effect(() => {
      this.loading.loading();
    });
  }
}
