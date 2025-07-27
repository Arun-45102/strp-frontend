import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Loadingservice {
  private requestCount = 0;
  private _loading = signal(false);
  loading = this._loading;

  show() {
    this.requestCount++;
    if (this.requestCount === 1) {
      this._loading.set(true);
    }
  }

  hide() {
    if (this.requestCount > 0) {
      this.requestCount--;
    }
    if (this.requestCount === 0) {
      this._loading.set(false);
    }
  }
}
