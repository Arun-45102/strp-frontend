import { Component, inject } from '@angular/core';
import { debounceTime } from 'rxjs';
import { Loadingservice } from '../../services/loadingservice';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.html',
  styleUrl: './loading.css',
})
export class Loading {
  private loading = inject(Loadingservice);

  isLoading = false;

  constructor() {
    this.loading.loading$
      .pipe(debounceTime(200))
      .subscribe((status) => (this.isLoading = status));
  }
}
