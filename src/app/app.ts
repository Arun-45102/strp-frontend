import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar";
import { Loading } from "./components/loading/loading";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Loading],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('strp-frontend');
}
